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

  // Build task map and dependency graph
  const taskMap = new Map();
  const adj = new Map(); // pred -> successors
  const inDegree = new Map();

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
    adj.set(t.id, []);
  });

  // Validate that all dependsOn task IDs exist
  for (const task of taskMap.values()) {
    for (const predId of task.dependsOn) {
      if (!taskMap.has(predId)) {
        return {
          error: `Task "${task.id}" depends on non-existent task "${predId}"`,
          tasksWithFloat: [],
          criticalPathTaskIds: [],
          totalDurationDays: 0
        };
      }
    }
  }

  // Calculate in-degrees and build adjacency list
  taskMap.forEach(task => {
    inDegree.set(task.id, task.dependsOn.length);
    task.dependsOn.forEach(predId => {
      adj.get(predId).push(task.id);
    });
  });

  // Topological sort via Kahn's algorithm
  const queue = [];
  taskMap.forEach((_, id) => {
    if (inDegree.get(id) === 0) {
      queue.push(id);
    }
  });

  const sortedTasks = [];
  while (queue.length > 0) {
    const currId = queue.shift();
    sortedTasks.push(taskMap.get(currId));

    (adj.get(currId) || []).forEach(succId => {
      const remainingInDegree = inDegree.get(succId) - 1;
      inDegree.set(succId, remainingInDegree);
      if (remainingInDegree === 0) {
        queue.push(succId);
      }
    });
  }

  // Detect circular dependency
  if (sortedTasks.length < taskMap.size) {
    const cycleTaskIds = Array.from(taskMap.keys()).filter(id => inDegree.get(id) > 0);
    return {
      error: `Circular dependency detected involving tasks: ${cycleTaskIds.join(', ')}`,
      tasksWithFloat: [],
      criticalPathTaskIds: [],
      totalDurationDays: 0
    };
  }

  // Forward Pass (Early Start, Early Finish) in topological order
  let maxProjectDuration = 0;
  sortedTasks.forEach(task => {
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

  // Backward Pass (Late Start, Late Finish) in reverse topological order
  sortedTasks.forEach(task => {
    task.lateFinish = maxProjectDuration;
    task.lateStart = task.lateFinish - task.duration;
  });

  const reverseSorted = [...sortedTasks].reverse();
  reverseSorted.forEach(task => {
    const successors = (adj.get(task.id) || []).map(id => taskMap.get(id));
    if (successors.length > 0) {
      const minSuccessorLS = Math.min(...successors.map(s => s.lateStart));
      task.lateFinish = minSuccessorLS;
      task.lateStart = task.lateFinish - task.duration;
    }

    task.totalFloat = Math.max(0, task.lateStart - task.earlyStart);
    task.isCritical = task.totalFloat === 0;
  });

  const tasksWithFloat = sortedTasks;
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
