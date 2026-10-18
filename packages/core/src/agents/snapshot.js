/**
 * @file snapshot.js
 * Creates an immutable, deeply frozen, normalized snapshot of project state for BuildForce AI agents.
 * Free of React, DOM, HTTP or database dependencies.
 */

/**
 * Recursively freezes an object and all nested properties.
 * @param {any} obj 
 * @returns {any}
 */
export function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null && typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
}

/**
 * @typedef {Object} ProjectSnapshot
 * @property {string} snapshotId
 * @property {string} schemaVersion
 * @property {string} timezone
 * @property {string} projectId
 * @property {string} projectName
 * @property {number} projectBudget
 * @property {string} timestamp
 * @property {Array<any>} tasks
 * @property {Array<any>} issues
 * @property {Array<any>} materials
 * @property {Array<any>} materialTransactions
 * @property {Array<any>} labour
 * @property {Array<any>} attendance
 * @property {Array<any>} payments
 * @property {Array<any>} dealers
 * @property {Array<any>} invoices
 * @property {Array<any>} purchaseOrders
 * @property {Array<any>} deliveries
 * @property {Array<any>} proposals
 * @property {Object} cashSettings
 */

/**
 * Builds a normalized, deeply frozen snapshot of site state.
 * @param {Object} [state={}] - Current AppContext state or database payload
 * @param {string} [activeProjectId=null] - ID of site being focused
 * @returns {ProjectSnapshot}
 */
export function buildProjectSnapshot(state = {}, activeProjectId = null) {
  const safeState = (state && typeof state === 'object') ? state : {};
  const projects = Array.isArray(safeState.projects) ? safeState.projects : [];

  const currentProjectId = activeProjectId ||
    safeState.activeProjectId ||
    (projects.length > 0 ? projects[0].id : 'default_site');

  const project = projects.find(p => p.id === currentProjectId) || {
    id: currentProjectId,
    name: 'Active Project',
    budget: 0
  };

  const snapshot = {
    snapshotId: `snap_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    schemaVersion: '1.0.0',
    timezone: 'Asia/Kolkata',
    timestamp: new Date().toISOString(),
    projectId: currentProjectId,
    projectName: project.name || 'Active Project',
    projectBudget: Number(project.budget) || 0,
    tasks: (Array.isArray(safeState.tasks) ? safeState.tasks : [])
      .filter(t => !t.project_id || t.project_id === currentProjectId)
      .map(t => ({ ...t })),
    issues: (Array.isArray(safeState.issues) ? safeState.issues : [])
      .filter(i => !i.project_id || i.project_id === currentProjectId)
      .map(i => ({ ...i })),
    materials: (Array.isArray(safeState.materials) ? safeState.materials : [])
      .map(m => ({ ...m })),
    materialTransactions: (Array.isArray(safeState.materialTransactions) ? safeState.materialTransactions : [])
      .filter(tx => !tx.project_id || tx.project_id === currentProjectId)
      .map(tx => ({ ...tx })),
    labour: (Array.isArray(safeState.labour) ? safeState.labour : [])
      .map(l => ({ ...l })),
    attendance: (Array.isArray(safeState.attendance) ? safeState.attendance : [])
      .filter(a => !a.project_id || a.project_id === currentProjectId)
      .map(a => ({ ...a })),
    payments: (Array.isArray(safeState.payments) ? safeState.payments : [])
      .filter(p => !p.project_id || p.project_id === currentProjectId)
      .map(p => ({ ...p })),
    dealers: (Array.isArray(safeState.dealers) ? safeState.dealers : [])
      .map(d => ({ ...d })),
    invoices: (Array.isArray(safeState.invoices) ? safeState.invoices : [])
      .map(inv => ({ ...inv })),
    purchaseOrders: (Array.isArray(safeState.purchaseOrders) ? safeState.purchaseOrders : [])
      .map(po => ({ ...po })),
    deliveries: (Array.isArray(safeState.deliveries) ? safeState.deliveries : [])
      .map(d => ({ ...d })),
    proposals: (Array.isArray(safeState.proposals) ? safeState.proposals : [])
      .filter(prop => !prop.project_id || prop.project_id === currentProjectId)
      .map(prop => ({ ...prop })),
    cashSettings: {
      openingBalance: Number(safeState.cashSettings?.opening_balance ?? safeState.cashSettings?.openingBalance ?? 0),
      wagePayWeekday: Number(safeState.cashSettings?.wage_pay_weekday ?? safeState.cashSettings?.wagePayWeekday ?? 6), // 6 = Saturday
      overheadPerWeek: Number(safeState.cashSettings?.overhead_per_week ?? safeState.cashSettings?.overheadPerWeek ?? 15000),
      wageReserveWeeks: Number(safeState.cashSettings?.wage_reserve_weeks ?? safeState.cashSettings?.wageReserveWeeks ?? 2)
    }
  };

  return deepFreeze(snapshot);
}
