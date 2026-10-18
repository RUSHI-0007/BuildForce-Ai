import { describe, it, expect, vi } from 'vitest';
import { createEventBus, createEventLedger } from './bus.js';

describe('EventLedger & EventBus (packages/core/src/agents/bus.js)', () => {
  describe('Append-Only Event Ledger', () => {
    it('exposes only append and read operations', () => {
      const ledger = createEventLedger();

      expect(typeof ledger.append).toBe('function');
      expect(typeof ledger.read).toBe('function');
      expect(typeof ledger.getById).toBe('function');
      expect(typeof ledger.getByType).toBe('function');
      expect(typeof ledger.getByCorrelationId).toBe('function');
      expect(typeof ledger.count).toBe('function');

      // Crucial requirement: verify update, delete, remove, clear, modify DO NOT exist
      expect(ledger.update).toBeUndefined();
      expect(ledger.delete).toBeUndefined();
      expect(ledger.remove).toBeUndefined();
      expect(ledger.clear).toBeUndefined();
      expect(ledger.modify).toBeUndefined();
      expect(ledger.pop).toBeUndefined();
    });

    it('enforces deep immutability on stored and returned events', () => {
      const ledger = createEventLedger();
      const event = ledger.append({
        type: 'MATERIAL_PURCHASED',
        payload: { item: 'Cement', qty: 100, nested: { vendor: 'Ultratech' } }
      });

      expect(Object.isFrozen(event)).toBe(true);
      expect(Object.isFrozen(event.payload)).toBe(true);
      expect(Object.isFrozen(event.payload.nested)).toBe(true);

      // Attempting mutation in strict mode throws TypeError
      expect(() => {
        event.payload.qty = 999;
      }).toThrow(TypeError);

      const history = ledger.read();
      expect(history.length).toBe(1);
      expect(() => {
        history[0].payload.item = 'Steel';
      }).toThrow(TypeError);
    });
  });

  describe('Event Bus - Chain Depth, Idempotency & Error Isolation', () => {
    it('enforces max chain depth to prevent infinite recursive cascade', () => {
      const bus = createEventBus({ maxChainDepth: 3 });

      // Circular cascade: A -> B -> C -> D (exceeds depth 3)
      bus.subscribe('EVENT_A', () => bus.publish('EVENT_B'));
      bus.subscribe('EVENT_B', () => bus.publish('EVENT_C'));
      bus.subscribe('EVENT_C', () => bus.publish('EVENT_D'));

      expect(() => {
        bus.publish('EVENT_A');
      }).toThrow(/Max event chain depth of 3 exceeded/);
    });

    it('handles once-per-correlation_id idempotent subscriber processing', () => {
      const bus = createEventBus();
      const invoiceHandler = vi.fn();

      bus.subscribe('INVOICE_SUBMITTED', invoiceHandler, { oncePerCorrelationId: true });

      // First publication with correlation_id
      bus.publish('INVOICE_SUBMITTED', { invoiceId: 'inv_101', amount: 50000 }, { correlation_id: 'corr_batch_99' });
      expect(invoiceHandler).toHaveBeenCalledTimes(1);

      // Duplicate publication with identical correlation_id should be skipped
      bus.publish('INVOICE_SUBMITTED', { invoiceId: 'inv_101', amount: 50000 }, { correlation_id: 'corr_batch_99' });
      expect(invoiceHandler).toHaveBeenCalledTimes(1);

      // Distinct correlation_id should be processed
      bus.publish('INVOICE_SUBMITTED', { invoiceId: 'inv_102', amount: 30000 }, { correlation_id: 'corr_batch_100' });
      expect(invoiceHandler).toHaveBeenCalledTimes(2);
    });

    it('isolates subscriber errors so one failure does not halt subsequent subscribers', () => {
      const bus = createEventBus();
      const failingSubscriber = vi.fn(() => {
        throw new Error('Database connection failed in analytics subscriber');
      });
      const succeedingSubscriber = vi.fn();
      const wildcardSubscriber = vi.fn();

      bus.subscribe('SITE_HAZRI_LOGGED', failingSubscriber);
      bus.subscribe('SITE_HAZRI_LOGGED', succeedingSubscriber);
      bus.subscribe('*', wildcardSubscriber);

      // Publishing should not throw uncaught error to caller
      expect(() => {
        bus.publish('SITE_HAZRI_LOGGED', { workersCount: 15 });
      }).not.toThrow();

      // All subscribers were invoked despite the first one throwing
      expect(failingSubscriber).toHaveBeenCalledTimes(1);
      expect(succeedingSubscriber).toHaveBeenCalledTimes(1);
      expect(wildcardSubscriber).toHaveBeenCalledTimes(1);
    });

    it('unsubscribes cleanly without side effects', () => {
      const bus = createEventBus();
      const handler = vi.fn();

      const unsubscribe = bus.subscribe('TEST_EVT', handler);
      bus.publish('TEST_EVT', { x: 1 });
      expect(handler).toHaveBeenCalledTimes(1);

      unsubscribe();
      bus.publish('TEST_EVT', { x: 2 });
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
