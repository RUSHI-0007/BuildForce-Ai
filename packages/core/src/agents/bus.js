/**
 * @file bus.js
 * In-memory append-only event ledger and hardened synchronous event bus for BuildForce agents.
 * Connects site events (HAZRI_LOGGED, MATERIAL_INWARD, INVOICE_RECEIVED) to agents.
 * Enforces:
 * - Append-only ledger (only append and read, no update or delete).
 * - Max chain depth protection against recursive cascade loops.
 * - Once-per-correlation_id idempotent processing.
 * - Complete error isolation across subscribers.
 */

import { BUS_CONFIG, DEFAULT_MAX_CHAIN_DEPTH } from '../config.js';

export { BUS_CONFIG, DEFAULT_MAX_CHAIN_DEPTH };

/**
 * Custom error thrown when event publishing exceeds allowable nested chain depth.
 */
export class MaxChainDepthError extends Error {
  constructor(depth, type) {
    super(`Max event chain depth of ${depth} exceeded while dispatching event "${type}"`);
    this.name = 'MaxChainDepthError';
    this.depth = depth;
    this.eventType = type;
  }
}

/**
 * Deeply freezes an object to ensure complete immutability.
 * @param {any} obj 
 * @returns {any}
 */
function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null && typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
}

/**
 * Creates an append-only event ledger.
 * Exposes ONLY append and read operations.
 * Explicitly does not expose update, delete, remove, clear, or modify.
 * @returns {EventLedger}
 */
export function createEventLedger(initialEntries = []) {
  /** @type {Array<Object>} */
  const entries = [];
  if (Array.isArray(initialEntries)) {
    for (const item of initialEntries) {
      if (item && typeof item === 'object' && item.type) {
        entries.push(deepFreeze({ ...item }));
      }
    }
  }

  const ledger = {
    /**
     * Appends an event to the ledger.
     * @param {Object} event
     * @returns {Object} Deeply frozen stored event
     */
    append(event) {
      if (!event || typeof event !== 'object') {
        throw new TypeError('Ledger event must be a non-null object');
      }
      if (!event.type || typeof event.type !== 'string') {
        throw new TypeError('Ledger event must have a string type');
      }

      const stored = deepFreeze({
        ...event,
        id: event.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: event.timestamp || new Date().toISOString()
      });

      entries.push(stored);
      return stored;
    },

    /**
     * Reads all events in append order.
     * @returns {Array<Object>} Copy of stored frozen events
     */
    read() {
      return [...entries];
    },

    /**
     * Finds an event by its ID.
     * @param {string} id 
     * @returns {Object|null}
     */
    getById(id) {
      return entries.find(e => e.id === id) || null;
    },

    /**
     * Reads events matching a specific event type.
     * @param {string} type 
     * @returns {Array<Object>}
     */
    getByType(type) {
      return entries.filter(e => e.type === type);
    },

    /**
     * Reads events matching a specific correlation ID.
     * @param {string} correlationId 
     * @returns {Array<Object>}
     */
    getByCorrelationId(correlationId) {
      if (!correlationId) return [];
      return entries.filter(e => (e.correlation_id === correlationId || e.correlationId === correlationId));
    },

    /**
     * Returns total count of appended events.
     * @returns {number}
     */
    count() {
      return entries.length;
    }
  };

  // Seal ledger to forbid adding update or delete methods
  return Object.freeze(ledger);
}

function extractItemId(payload, meta) {
  const p = (payload && typeof payload === 'object') ? payload : {};
  const m = (meta && typeof meta === 'object') ? meta : {};
  return (
    m.itemId ||
    m.item_id ||
    p.itemId ||
    p.item_id ||
    p.materialId ||
    p.material_id ||
    p.taskId ||
    p.task_id ||
    p.invoiceId ||
    p.invoice_id ||
    p.poId ||
    p.po_id ||
    p.dealerId ||
    p.dealer_id ||
    null
  );
}

/**
 * Creates a hardened event bus with chain depth limits, correlation idempotency, and error isolation.
 * @param {Object} [options]
 * @param {number} [options.maxChainDepth] - Max allowable nested event dispatch depth (defaults to BUS_CONFIG.MAX_CHAIN_DEPTH)
 * @param {number} [options.maxDepth] - Alias for maxChainDepth
 * @param {EventLedger} [options.ledger] - Custom append-only ledger instance
 * @returns {EventBus}
 */
export function createEventBus(options = {}) {
  const maxChainDepth = options.maxChainDepth ?? options.maxDepth ?? options.config?.maxChainDepth ?? BUS_CONFIG.MAX_CHAIN_DEPTH;
  const ledger = options.ledger || createEventLedger();

  /** @type {Map<string, Set<{ handler: Function, oncePerCorrelationId: boolean }>>} */
  const listeners = new Map();

  /** @type {Set<string>} Tracks processed "handler_id:correlation_id" pairs */
  const processedCorrelations = new Set();

  let currentChainDepth = 0;

  return {
    ledger,

    /**
     * Subscribes a callback to an event type.
     * @param {string} eventType 
     * @param {Function} handler 
     * @param {Object} [subOptions]
     * @param {boolean} [subOptions.oncePerCorrelationId=false]
     * @returns {() => void} Unsubscribe function
     */
    subscribe(eventType, handler, subOptions = {}) {
      if (typeof handler !== 'function') {
        throw new TypeError('EventBus subscriber handler must be a function');
      }

      if (!listeners.has(eventType)) {
        listeners.set(eventType, new Set());
      }

      const agentId = subOptions.agentId || subOptions.agent || handler.agentId || handler.name || 'default_agent';

      const subscriberRecord = {
        handler,
        agentId,
        oncePerCorrelationId: Boolean(subOptions.oncePerCorrelationId)
      };

      listeners.get(eventType).add(subscriberRecord);

      return () => {
        const set = listeners.get(eventType);
        if (set) {
          set.delete(subscriberRecord);
          if (set.size === 0) listeners.delete(eventType);
        }
      };
    },

    /**
     * Publishes an event synchronously to all registered listeners.
     * Enforces:
     * 1. Max chain depth guard (propagates MaxChainDepthError to halt cascades).
     * 2. Subscriber error isolation for standard exceptions.
     * 3. Once-per-correlation_id handling: key replays on event id, and item signals on type + item id.
     * @param {string} type 
     * @param {any} [payload={}]
     * @param {Object} [meta={}]
     * @param {string} [meta.id]
     * @param {string} [meta.correlation_id]
     * @param {string} [meta.correlationId]
     * @returns {Object} Stored frozen event
     */
    publish(type, payload = {}, meta = {}) {
      if (currentChainDepth >= maxChainDepth) {
        throw new MaxChainDepthError(maxChainDepth, type);
      }

      const correlation_id = meta.correlation_id || meta.correlationId || payload.correlation_id || payload.correlationId;

      const rawEvent = {
        ...(meta.id || payload.id ? { id: meta.id || payload.id } : {}),
        type,
        payload,
        correlation_id: correlation_id || null,
        timestamp: meta.timestamp || payload.timestamp || new Date().toISOString()
      };

      const storedEvent = ledger.append(rawEvent);

      currentChainDepth++;
      try {
        const targetListeners = listeners.get(type);
        const wildcardListeners = listeners.get('*');

        const allSubscribers = [
          ...(targetListeners ? Array.from(targetListeners) : []),
          ...(wildcardListeners ? Array.from(wildcardListeners) : [])
        ];

        for (const sub of allSubscribers) {
          if (sub.oncePerCorrelationId) {
            // 1. Key replays on the event id
            if (storedEvent.id) {
              const replayKey = `${sub.agentId}:evt:${storedEvent.id}`;
              if (processedCorrelations.has(replayKey)) {
                continue; // Replay of the same event id is dropped
              }
            }

            // 2. Where one signal per item is intended, key on type plus the item id (per correlation_id)
            if (correlation_id) {
              const itemId = extractItemId(payload, meta);
              const signalKey = itemId
                ? `${sub.agentId}:${type}:${itemId}:${correlation_id}`
                : `${sub.agentId}:${type}:${correlation_id}`;

              if (processedCorrelations.has(signalKey)) {
                continue; // Duplicate signal for this item under this correlation_id
              }
              processedCorrelations.add(signalKey);
            }

            if (storedEvent.id) {
              processedCorrelations.add(`${sub.agentId}:evt:${storedEvent.id}`);
            }
          }

          try {
            sub.handler(storedEvent);
          } catch (handlerErr) {
            // If the error is MaxChainDepthError, do NOT swallow it: rethrow to break the runaway cascade
            if (handlerErr instanceof MaxChainDepthError || handlerErr.name === 'MaxChainDepthError') {
              throw handlerErr;
            }
            // Standard error isolation: log error but do not disrupt other subscribers or the bus
            console.error(`[EventBus] Isolated error in subscriber for "${type}":`, handlerErr);
          }
        }
      } finally {
        currentChainDepth--;
      }

      return storedEvent;
    },

    /**
     * Read the full event history from the append-only ledger.
     * @returns {Array<Object>}
     */
    getHistory() {
      return ledger.read();
    }
  };
}

// Global default singleton event bus for convenience
export const defaultBus = createEventBus();
