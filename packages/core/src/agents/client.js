/**
 * @file client.js
 * Pure client room milestone billing, payment certificate verification, and variation tracking.
 * Free of React, DOM, HTTP or database dependencies.
 */

/**
 * Calculates client billing stage readiness based on physical site completion.
 * @param {Array<Object>} payments - Project payments records
 * @param {Array<Object>} tasks - Project tasks
 * @returns {Object} Client billing readiness overview
 */
export function calculateClientBillingReadiness(payments = [], tasks = []) {
  const clientMilestones = payments.filter(p => p.type === 'INCOME');

  const totalContract = clientMilestones.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const totalBilledOrReceived = clientMilestones
    .filter(p => p.status === 'Received' || p.status === 'RECEIVED' || p.status === 'Paid')
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const pendingMilestones = clientMilestones.filter(p => p.status !== 'Received' && p.status !== 'RECEIVED' && p.status !== 'Paid');
  const outstandingAmount = pendingMilestones.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // Completed percentage of site tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed' || t.status === 'COMPLETED').length;
  const physicalCompletionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const financialCompletionPct = totalContract > 0 ? Math.round((totalBilledOrReceived / totalContract) * 100) : 0;

  return {
    totalContract,
    totalBilledOrReceived,
    outstandingAmount,
    physicalCompletionPct,
    financialCompletionPct,
    isOverBilled: financialCompletionPct > physicalCompletionPct + 15,
    isUnderBilled: physicalCompletionPct > financialCompletionPct + 15,
    pendingMilestones
  };
}
