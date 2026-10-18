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

/**
 * Creates a hardened event bus with chain depth limits, correlation idempotency, and error isolation.
 * @param {Object} [options]
 * @param {number} [options.maxChainDepth=10] - Max allowable nested event dispatch depth
 * @param {EventLedger} [options.ledger] - Custom append-only ledger instance
 * @returns {EventBus}
 */
export function createEventBus(options = {}) {
  const maxChainDepth = options.maxChainDepth ?? 10;
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
     * 3. Once-per-correlation_id handling for idempotent subscribers (once per agent and signal per correlation_id).
     * @param {string} type 
     * @param {any} [payload={}]
     * @param {Object} [meta={}]
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
        type,
        payload,
        correlation_id: correlation_id || null,
        timestamp: new Date().toISOString()
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
          // If oncePerCorrelationId is enabled and correlation_id exists, enforce deduplication
          // Keyed strictly per agent and signal per correlation_id: "${agent}:${signal}:${correlation_id}"
          if (sub.oncePerCorrelationId && correlation_id) {
            const key = `${sub.agentId}:${type}:${correlation_id}`;
            if (processedCorrelations.has(key)) {
              continue; // Skip duplicate correlation event for this agent and signal
            }
            processedCorrelations.add(key);
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
