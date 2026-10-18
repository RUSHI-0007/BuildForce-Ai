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

  describe('ISSUE-003 Regression: Topological Sort & Circular Dependencies in calculateCPM', () => {
    it('returns a clear error when tasks contain a circular dependency', () => {
      const circularTasks = [
        { id: 't1', name: 'Task 1', duration_days: 5, depends_on: ['t3'] },
        { id: 't2', name: 'Task 2', duration_days: 3, depends_on: ['t1'] },
        { id: 't3', name: 'Task 3', duration_days: 4, depends_on: ['t2'] }
      ];

      const result = calculateCPM(circularTasks);
      expect(result.error).toBeDefined();
      expect(result.error).toMatch(/circular dependency/i);
      expect(result.criticalPathTaskIds).toEqual([]);
      expect(result.totalDurationDays).toBe(0);
    });

    it('topologically sorts tasks regardless of input order and produces correct schedule metrics', () => {
      // Reverse order of sampleTasks: t4, t3, t2, t1
      const reversedTasks = [
        { id: 't4', name: 'Slab Casting', duration_days: 6, depends_on: ['t2'] },
        { id: 't3', name: 'Plumbing Non-Critical', duration_days: 3, depends_on: ['t1'] },
        { id: 't2', name: 'Columns', duration_days: 8, depends_on: ['t1'] },
        { id: 't1', name: 'Foundation', duration_days: 10, depends_on: [] }
      ];

      const cpm = calculateCPM(reversedTasks);
      expect(cpm.error).toBeUndefined();
      expect(cpm.totalDurationDays).toBe(24);
      expect(cpm.criticalPathTaskIds).toEqual(['t1', 't2', 't4']);

      const t4 = cpm.tasksWithFloat.find(t => t.id === 't4');
      expect(t4.earlyStart).toBe(18); // 10 + 8
      expect(t4.earlyFinish).toBe(24);
    });

    it('returns a clear error when a task depends on a non-existent task id', () => {
      const invalidDependencyTasks = [
        { id: 't1', name: 'Foundation', duration_days: 5, depends_on: [] },
        { id: 't2', name: 'Walls', duration_days: 8, depends_on: ['non_existent_id'] }
      ];

      const result = calculateCPM(invalidDependencyTasks);
      expect(result.error).toBeDefined();
      expect(result.error).toMatch(/non-existent|unknown|missing/i);
      expect(result.error).toContain('non_existent_id');
      expect(result.criticalPathTaskIds).toEqual([]);
      expect(result.totalDurationDays).toBe(0);
    });
  });
});
