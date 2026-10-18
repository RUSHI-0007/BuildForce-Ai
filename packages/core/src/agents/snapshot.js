/**
 * @file snapshot.js
 * Creates an immutable, normalized snapshot of project state for BuildForce AI agents.
 */

/**
 * @typedef {Object} ProjectSnapshot
 * @property {string} projectId
 * @property {string} projectName
 * @property {string} timestamp
 * @property {Array<any>} tasks
 * @property {Array<any>} materials
 * @property {Array<any>} materialTransactions
 * @property {Array<any>} labour
 * @property {Array<any>} attendance
 * @property {Array<any>} payments
 * @property {Array<any>} invoices
 * @property {Array<any>} purchaseOrders
 * @property {Array<any>} deliveries
 * @property {Object} cashSettings
 */

/**
 * Builds a normalized, deeply frozen snapshot of site state.
 * @param {Object} state - Current AppContext state
 * @param {string} [activeProjectId] - ID of site being focused
 * @returns {ProjectSnapshot}
 */
export function buildProjectSnapshot(state = {}, activeProjectId = null) {
  const currentProjectId = activeProjectId || state.activeProjectId || (state.projects && state.projects[0]?.id) || 'default_site';
  const project = (state.projects || []).find(p => p.id === currentProjectId) || { id: currentProjectId, name: 'Active Project' };

  const snapshot = {
    projectId: currentProjectId,
    projectName: project.name || 'Active Project',
    projectBudget: Number(project.budget) || 0,
    timestamp: new Date().toISOString(),
    tasks: (state.tasks || []).filter(t => !t.project_id || t.project_id === currentProjectId).map(t => ({ ...t })),
    materials: (state.materials || []).map(m => ({ ...m })),
    materialTransactions: (state.materialTransactions || []).map(tx => ({ ...tx })),
    labour: (state.labour || []).map(l => ({ ...l })),
    attendance: (state.attendance || []).filter(a => !a.project_id || a.project_id === currentProjectId).map(a => ({ ...a })),
    payments: (state.payments || []).filter(p => !p.project_id || p.project_id === currentProjectId).map(p => ({ ...p })),
    invoices: (state.invoices || []).map(inv => ({ ...inv })),
    purchaseOrders: (state.purchaseOrders || []).map(po => ({ ...po })),
    deliveries: (state.deliveries || []).map(d => ({ ...d })),
    cashSettings: {
      openingBalance: Number(state.cashSettings?.opening_balance || 0),
      wagePayWeekday: Number(state.cashSettings?.wage_pay_weekday ?? 6), // 6 = Saturday
      overheadPerWeek: Number(state.cashSettings?.overhead_per_week || 15000),
      wageReserveWeeks: Number(state.cashSettings?.wage_reserve_weeks || 2),
      ...state.cashSettings
    }
  };

  return Object.freeze(snapshot);
}
