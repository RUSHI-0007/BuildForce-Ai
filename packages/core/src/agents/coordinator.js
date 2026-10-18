/**
 * @file coordinator.js
 * Multi-agent coordinator: correlates site signals across cash, procurement, schedule, and client.
 * Produces structured, explainable proposals for contractor decision making.
 */

import { calculateCashRunway } from './cashPlan.js';
import { calculateStockCover } from './procurement.js';
import { calculateCPM } from './scheduler.js';

/**
 * @typedef {Object} AgentProposal
 * @property {string} id
 * @property {string} agentId - 'cash' | 'procurement' | 'scheduler' | 'client'
 * @property {string} title
 * @property {string} why - Clear rationale grounded in real project numbers
 * @property {'CRITICAL'|'HIGH'|'MEDIUM'|'LOW'} priority
 * @property {string} actionType - 'APPROVE_PAYMENT' | 'SEND_RFQ' | 'REPLAN_SCHEDULE' | 'BILL_CLIENT'
 * @property {any} payload
 * @property {'PENDING'|'APPROVED'|'REJECTED'} status
 * @property {string} createdAt
 */

/**
 * Runs the coordinator evaluation cycle against a project snapshot and produces pending proposals.
 * @param {import('./snapshot').ProjectSnapshot} snapshot 
 * @returns {Array<AgentProposal>}
 */
export function runCoordinatorCycle(snapshot) {
  const proposals = [];

  // 1. Scheduler Check: Find delayed critical path tasks
  const cpm = calculateCPM(snapshot.tasks);
  const criticalDelayedTasks = cpm.tasksWithFloat.filter(t => t.isCritical && t.status !== 'Completed');

  if (criticalDelayedTasks.length > 0) {
    const primaryDelayed = criticalDelayedTasks[0];
    proposals.push({
      id: `prop_sched_${Date.now()}_${primaryDelayed.id}`,
      agentId: 'scheduler',
      title: `Critical Path Roadblock on ${primaryDelayed.name}`,
      why: `Task has zero float. Any delay will push overall project finish (${cpm.totalDurationDays} days) by equivalent days.`,
      priority: 'HIGH',
      actionType: 'REPLAN_SCHEDULE',
      payload: { taskId: primaryDelayed.id, taskName: primaryDelayed.name, totalDurationDays: cpm.totalDurationDays },
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });
  }

  // 2. Procurement Check: Find imminent stock runout
  const stockMetrics = calculateStockCover(snapshot.materials, snapshot.materialTransactions);
  const criticalShortages = stockMetrics.filter(m => m.isShortage);

  criticalShortages.forEach(shortage => {
    proposals.push({
      id: `prop_proc_${Date.now()}_${shortage.materialId}`,
      agentId: 'procurement',
      title: `Low Stock: ${shortage.name} (${shortage.daysRemaining} days remaining)`,
      why: `Current stock of ${shortage.inStock} ${shortage.unit} is at or below safety threshold of ${shortage.minThreshold}.`,
      priority: shortage.daysRemaining <= 2 ? 'CRITICAL' : 'HIGH',
      actionType: 'SEND_RFQ',
      payload: {
        materialId: shortage.materialId,
        materialName: shortage.name,
        recommendedQty: shortage.recommendedOrderQty,
        unit: shortage.unit
      },
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });
  });

  // 3. Cash Check: Ensure Saturday wage reserve is protected
  const cashRunway = calculateCashRunway(snapshot);
  if (cashRunway.currentCash < cashRunway.wageSafetyReserve) {
    const deficit = cashRunway.wageSafetyReserve - cashRunway.currentCash;
    proposals.push({
      id: `prop_cash_${Date.now()}_wage_deficit`,
      agentId: 'cash',
      title: `Wage Reserve Warning: ₹${deficit.toLocaleString('en-IN')} Deficit`,
      why: `Available cash of ₹${cashRunway.currentCash.toLocaleString('en-IN')} is below required ${snapshot.cashSettings?.wageReserveWeeks || 2}-week wage reserve of ₹${cashRunway.wageSafetyReserve.toLocaleString('en-IN')}. Hold non-essential material payouts.`,
      priority: 'CRITICAL',
      actionType: 'HOLD_PAYMENTS',
      payload: { deficit, currentCash: cashRunway.currentCash, wageSafetyReserve: cashRunway.wageSafetyReserve },
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });
  }

  return proposals;
}
