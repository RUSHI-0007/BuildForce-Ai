/**
 * @file bus.js
 * In-memory lightweight synchronous event bus for BuildForce agents.
 * Connects site events (HAZRI_LOGGED, MATERIAL_INWARD, INVOICE_RECEIVED) to agents.
 */

/**
 * Creates an event bus instance.
 * @returns {EventBus}
 */
export function createEventBus() {
  /** @type {Map<string, Set<Function>>} */
  const listeners = new Map();
  /** @type {Array<{ id: string, type: string, payload: any, timestamp: string }>} */
  const eventLog = [];

  return {
    /**
     * Subscribe a callback to an event type.
     * @param {string} eventType 
     * @param {Function} handler 
     * @returns {() => void} Unsubscribe function
     */
    subscribe(eventType, handler) {
      if (!listeners.has(eventType)) {
        listeners.set(eventType, new Set());
      }
      listeners.get(eventType).add(handler);

      return () => {
        const set = listeners.get(eventType);
        if (set) {
          set.delete(handler);
          if (set.size === 0) listeners.delete(eventType);
        }
      };
    },

    /**
     * Publish an event synchronously to all registered listeners.
     * @param {string} type 
     * @param {any} payload 
     * @returns {{ id: string, type: string, payload: any, timestamp: string }}
     */
    publish(type, payload = {}) {
      const event = {
        id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type,
        payload,
        timestamp: new Date().toISOString()
      };

      eventLog.push(event);

      const handlers = listeners.get(type);
      if (handlers) {
        handlers.forEach(handler => {
          try {
            handler(event);
          } catch (err) {
            console.error(`[EventBus] Error in handler for ${type}:`, err);
          }
        });
      }

      // Also notify wildcard listeners if any
      const wildcardHandlers = listeners.get('*');
      if (wildcardHandlers) {
        wildcardHandlers.forEach(handler => {
          try {
            handler(event);
          } catch (err) {
            console.error(`[EventBus] Error in wildcard handler:`, err);
          }
        });
      }

      return event;
    },

    /**
     * Get immutable copy of full trace/event log.
     * @returns {Array<any>}
     */
    getHistory() {
      return [...eventLog];
    },

    /**
     * Clear all listeners and history.
     */
    clear() {
      listeners.clear();
      eventLog.length = 0;
    }
  };
}

// Global default singleton event bus for convenience
export const defaultBus = createEventBus();
