/**
 * @file capture.js
 * Pure site input normalization for haazri, material delivery, and field observations.
 */

/**
 * Normalizes daily haazri attendance input into structured log records.
 * @param {Array<{ labourId: string, status: 'PRESENT'|'ABSENT'|'HALF_DAY', advancePaid?: number }>} entries 
 * @param {string} projectId 
 * @param {string} [date] - YYYY-MM-DD (defaults to today in Asia/Kolkata)
 * @returns {Array<any>} Normalized attendance records
 */
export function normalizeAttendanceEntries(entries = [], projectId, date = new Date().toISOString().split('T')[0]) {
  if (!projectId) throw new Error('projectId is required to capture attendance');

  return entries.map(entry => ({
    id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    project_id: projectId,
    labour_id: entry.labourId,
    date,
    status: entry.status || 'PRESENT',
    advance_paid: Number(entry.advancePaid || 0)
  }));
}

/**
 * Normalizes material delivery receipt (challan inward).
 * @param {Object} input
 * @param {string} input.projectId
 * @param {string} input.materialId
 * @param {number} input.quantity
 * @param {string} [input.challanNo]
 * @param {string} [input.receiver]
 * @returns {Object} Normalized inward material transaction
 */
export function normalizeInwardMaterial(input) {
  if (!input.projectId || !input.materialId || !input.quantity) {
    throw new Error('projectId, materialId and quantity are required for inward material');
  }

  return {
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    project_id: input.projectId,
    material_id: input.materialId,
    type: 'INWARD',
    quantity: Number(input.quantity),
    challan_no: input.challanNo || 'N/A',
    receiver: input.receiver || 'Site Supervisor',
    date: input.date || new Date().toISOString().split('T')[0]
  };
}
