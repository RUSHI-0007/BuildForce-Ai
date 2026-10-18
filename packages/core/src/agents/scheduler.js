/**
 * @file scheduler.js
 * Pure Critical Path Method (CPM), float calculations, and recovery plan engine.
 * Free of React, DOM, HTTP or database dependencies.
 */

/**
 * Calculates Critical Path Method (CPM) metrics for a list of dependency-linked tasks.
 * @param {Array<Object>} tasks 
 * @returns {Object} CPM analysis with critical path, total floats, and project duration
 */
export function calculateCPM(tasks = []) {
  if (!tasks || tasks.length === 0) {
    return { tasksWithFloat: [], criticalPathTaskIds: [], totalDurationDays: 0 };
  }

  // Build task map
  const taskMap = new Map();
  tasks.forEach(t => {
    taskMap.set(t.id, {
      ...t,
      duration: Math.max(1, Number(t.duration_days || t.duration || 1)),
      dependsOn: Array.isArray(t.depends_on) ? t.depends_on : (t.depends_on ? [t.depends_on] : []),
      earlyStart: 0,
      earlyFinish: 0,
      lateStart: 0,
      lateFinish: 0,
      totalFloat: 0,
      isCritical: false
    });
  });

  // Forward Pass (Early Start, Early Finish)
  let maxProjectDuration = 0;
  taskMap.forEach(task => {
    let maxPredecessorEF = 0;
    task.dependsOn.forEach(predId => {
      const pred = taskMap.get(predId);
      if (pred && pred.earlyFinish > maxPredecessorEF) {
        maxPredecessorEF = pred.earlyFinish;
      }
    });

    task.earlyStart = maxPredecessorEF;
    task.earlyFinish = task.earlyStart + task.duration;
    if (task.earlyFinish > maxProjectDuration) {
      maxProjectDuration = task.earlyFinish;
    }
  });

  // Backward Pass (Late Start, Late Finish)
  taskMap.forEach(task => {
    task.lateFinish = maxProjectDuration;
    task.lateStart = task.lateFinish - task.duration;
  });

  const reversedTasks = Array.from(taskMap.values()).reverse();
  reversedTasks.forEach(task => {
    // Find tasks that depend on this task (successors)
    const successors = Array.from(taskMap.values()).filter(t => t.dependsOn.includes(task.id));
    if (successors.length > 0) {
      const minSuccessorLS = Math.min(...successors.map(s => s.lateStart));
      task.lateFinish = minSuccessorLS;
      task.lateStart = task.lateFinish - task.duration;
    }

    task.totalFloat = Math.max(0, task.lateStart - task.earlyStart);
    task.isCritical = task.totalFloat === 0;
  });

  const tasksWithFloat = Array.from(taskMap.values());
  const criticalPathTaskIds = tasksWithFloat.filter(t => t.isCritical).map(t => t.id);

  return {
    tasksWithFloat,
    criticalPathTaskIds,
    totalDurationDays: maxProjectDuration
  };
}

/**
 * Calculates Planned vs Actual progress (S-Curve & Schedule Performance Index SPI).
 * @param {Array<Object>} tasks 
 * @returns {Object} S-curve metrics
 */
export function calculateSCurve(tasks = []) {
  if (tasks.length === 0) {
    return { plannedProgress: 0, actualProgress: 0, spi: 1.0, status: 'ON_TRACK' };
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed' || t.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'IN_PROGRESS');

  const inProgressProgress = inProgressTasks.reduce((sum, t) => sum + (Number(t.progress_pct || 50) / 100), 0);
  const actualProgress = Math.round(((completedTasks + inProgressProgress) / totalTasks) * 100);

  // Planned baseline progress (derived from due date vs today)
  const now = new Date();
  const tasksDueByNow = tasks.filter(t => t.due_date && new Date(t.due_date) <= now).length;
  const plannedProgress = Math.min(100, Math.round((tasksDueByNow / totalTasks) * 100));

  const spi = plannedProgress > 0 ? Number((actualProgress / plannedProgress).toFixed(2)) : 1.0;

  return {
    plannedProgress,
    actualProgress,
    spi,
    status: spi >= 1.0 ? 'AHEAD' : (spi >= 0.85 ? 'SLIGHT_DELAY' : 'CRITICAL_LAG')
  };
}
