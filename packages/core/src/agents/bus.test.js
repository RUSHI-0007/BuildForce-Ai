import { describe, it, expect, vi } from 'vitest';
import { createEventBus } from './bus.js';

describe('EventBus (packages/core/src/agents/bus.js)', () => {
  it('delivers published events to subscribers', () => {
    const bus = createEventBus();
    const handler = vi.fn();

    bus.subscribe('SITE_TASK_COMPLETED', handler);
    const event = bus.publish('SITE_TASK_COMPLETED', { taskId: 'tsk_101', progress: 100 });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(event);
    expect(event.payload.taskId).toBe('tsk_101');
  });

  it('unsubscribes listeners cleanly', () => {
    const bus = createEventBus();
    const handler = vi.fn();

    const unsubscribe = bus.subscribe('HAZRI_LOGGED', handler);
    bus.publish('HAZRI_LOGGED', { count: 12 });
    expect(handler).toHaveBeenCalledTimes(1);

    unsubscribe();
    bus.publish('HAZRI_LOGGED', { count: 14 });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('keeps an append-only event trace log', () => {
    const bus = createEventBus();
    bus.publish('EVT_1', { a: 1 });
    bus.publish('EVT_2', { b: 2 });

    const history = bus.getHistory();
    expect(history.length).toBe(2);
    expect(history[0].type).toBe('EVT_1');
    expect(history[1].type).toBe('EVT_2');
  });
});
