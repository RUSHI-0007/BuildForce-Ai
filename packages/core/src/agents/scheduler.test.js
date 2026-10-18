import { describe, it, expect } from 'vitest';
import { calculateCPM, calculateSCurve } from './scheduler.js';

describe('Scheduler Agent Logic (packages/core/src/agents/scheduler.js)', () => {
  const sampleTasks = [
    { id: 't1', name: 'Foundation', duration_days: 10, depends_on: [] },
    { id: 't2', name: 'Columns', duration_days: 8, depends_on: ['t1'] },
    { id: 't3', name: 'Plumbing Non-Critical', duration_days: 3, depends_on: ['t1'] },
    { id: 't4', name: 'Slab Casting', duration_days: 6, depends_on: ['t2'] }
  ];

  it('computes Critical Path and floats correctly via forward and backward pass', () => {
    const cpm = calculateCPM(sampleTasks);

    // Foundation (10) -> Columns (8) -> Slab (6) = 24 days total duration
    expect(cpm.totalDurationDays).toBe(24);
    expect(cpm.criticalPathTaskIds).toContain('t1');
    expect(cpm.criticalPathTaskIds).toContain('t2');
    expect(cpm.criticalPathTaskIds).toContain('t4');

    // Plumbing has float because it takes 3 days while Columns takes 8
    const plumbingTask = cpm.tasksWithFloat.find(t => t.id === 't3');
    expect(plumbingTask.totalFloat).toBeGreaterThan(0);
    expect(plumbingTask.isCritical).toBe(false);
  });

  it('calculates S-Curve progress and SPI correctly', () => {
    const tasks = [
      { id: 't1', status: 'Completed', due_date: '2026-01-01' },
      { id: 't2', status: 'In Progress', progress_pct: 50, due_date: '2026-01-05' },
      { id: 't3', status: 'Pending', due_date: '2026-12-31' }
    ];

    const scurve = calculateSCurve(tasks);
    expect(scurve.actualProgress).toBe(50); // (1 + 0.5) / 3 = 50%
    expect(typeof scurve.spi).toBe('number');
  });
});
