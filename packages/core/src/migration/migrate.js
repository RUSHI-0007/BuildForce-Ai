/**
 * @file migrate.js
 * Storage migration engine for BuildForce AI.
 * Normalizes legacy browser localStorage and pre-v1 schema states to canonical v1 data models.
 * Completely free of DOM/UI dependencies; operates on any Storage-like interface or plain JS object.
 */

import {
  validateProject,
  validateTask,
  validateMaterial,
  validateMaterialTransaction,
  validateLabour,
  validateAttendance,
  validatePayment
} from '../schema/schemas.js';

export const MIGRATION_FLAG_KEY = 'buildforce_migrated_v1';
export const SCHEMA_VERSION = '1.0.0';

export const LEGACY_STORAGE_KEYS = {
  PROJECTS: 'buildsite_projects',
  ACTIVE_PROJECT_ID: 'buildsite_active_project_id',
  TASKS: 'buildsite_tasks',
  ISSUES: 'buildsite_issues',
  MATERIALS: 'buildsite_materials',
  MATERIAL_TX: 'buildsite_material_tx',
  LABOUR: 'buildsite_labour',
  ATTENDANCE: 'buildsite_attendance',
  PAYMENTS: 'buildsite_payments',
  USER: 'buildsite_user'
};

/**
 * Safely parses a JSON string or returns the value if already an object/array.
 * @param {string|any} val
 * @param {any} fallback
 * @returns {any}
 */
export function safeParseJson(val, fallback = null) {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'object') return val;
  if (typeof val !== 'string') return fallback;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

/**
 * Migrates legacy project entities to canonical v1 format.
 * @param {Array<Object>|string} raw
 * @returns {{ data: Object[], errors: Array<{ item: any, errors: string[] }> }}
 */
export function migrateProjects(raw) {
  const parsed = safeParseJson(raw, []);
  const list = Array.isArray(parsed) ? parsed : [];
  const data = [];
  const errors = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const rawBudget = Number(item.budget ?? 0);
    const budget = (!isNaN(rawBudget) && rawBudget >= 0) ? rawBudget : 0;
    const rawProgress = Number(item.progress ?? 0);
    const progress = !isNaN(rawProgress) ? Math.min(100, Math.max(0, rawProgress)) : 0;
    const transformed = {
      ...item,
      budget,
      progress,
      status: ['Planning', 'In Progress', 'On Hold', 'Completed'].includes(item.status) ? item.status : 'In Progress'
    };
    const validation = validateProject(transformed);
    if (validation.valid) {
      data.push(validation.value);
    } else {
      errors.push({ item, errors: validation.errors });
    }
  }

  return { data, errors };
}

/**
 * Migrates legacy task entities to canonical v1 format.
 * @param {Array<Object>|string} raw
 * @returns {{ data: Object[], errors: Array<{ item: any, errors: string[] }> }}
 */
export function migrateTasks(raw) {
  const parsed = safeParseJson(raw, []);
  const list = Array.isArray(parsed) ? parsed : [];
  const data = [];
  const errors = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const durationDays = Number(item.duration_days ?? item.duration ?? 1);
    const transformed = {
      ...item,
      duration_days: durationDays > 0 ? durationDays : 1,
      progress_pct: Number(item.progress_pct ?? item.progress ?? 0),
      depends_on: Array.isArray(item.depends_on) ? item.depends_on : []
    };
    const validation = validateTask(transformed);
    if (validation.valid) {
      data.push(validation.value);
    } else {
      errors.push({ item, errors: validation.errors });
    }
  }

  return { data, errors };
}

/**
 * Migrates legacy materials to canonical v1 format.
 * @param {Array<Object>|string} raw
 * @returns {{ data: Object[], errors: Array<{ item: any, errors: string[] }> }}
 */
export function migrateMaterials(raw) {
  const parsed = safeParseJson(raw, []);
  const list = Array.isArray(parsed) ? parsed : [];
  const data = [];
  const errors = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const rawStock = Number(item.in_stock ?? 0);
    const rawPrice = Number(item.unit_price ?? 0);
    const rawThreshold = Number(item.min_threshold ?? 0);
    const transformed = {
      ...item,
      in_stock: (!isNaN(rawStock) && rawStock >= 0) ? rawStock : 0,
      unit_price: (!isNaN(rawPrice) && rawPrice >= 0) ? rawPrice : 0,
      min_threshold: (!isNaN(rawThreshold) && rawThreshold >= 0) ? rawThreshold : 0
    };
    const validation = validateMaterial(transformed);
    if (validation.valid) {
      data.push(validation.value);
    } else {
      errors.push({ item, errors: validation.errors });
    }
  }

  return { data, errors };
}

/**
 * Migrates legacy material transactions to canonical v1 format.
 * Maps legacy `item_id` to canonical `material_id`.
 * @param {Array<Object>|string} raw
 * @returns {{ data: Object[], errors: Array<{ item: any, errors: string[] }> }}
 */
export function migrateMaterialTransactions(raw) {
  const parsed = safeParseJson(raw, []);
  const list = Array.isArray(parsed) ? parsed : [];
  const data = [];
  const errors = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const material_id = item.material_id || item.item_id;
    const transformed = {
      ...item,
      material_id,
      type: String(item.type || 'INWARD').toUpperCase(),
      quantity: Number(item.quantity ?? 0)
    };
    const validation = validateMaterialTransaction(transformed);
    if (validation.valid) {
      data.push(validation.value);
    } else {
      errors.push({ item, errors: validation.errors });
    }
  }

  return { data, errors };
}

/**
 * Migrates legacy labour workers to canonical v1 format.
 * Coerces string daily_wage (e.g. "850") to positive numbers.
 * @param {Array<Object>|string} raw
 * @returns {{ data: Object[], errors: Array<{ item: any, errors: string[] }> }}
 */
export function migrateLabour(raw) {
  const parsed = safeParseJson(raw, []);
  const list = Array.isArray(parsed) ? parsed : [];
  const data = [];
  const errors = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const wage = Number(item.daily_wage ?? 0);
    const transformed = {
      ...item,
      daily_wage: (!isNaN(wage) && wage > 0) ? wage : 500,
      status: item.status === 'Inactive' ? 'Inactive' : 'Active'
    };
    const validation = validateLabour(transformed);
    if (validation.valid) {
      data.push(validation.value);
    } else {
      errors.push({ item, errors: validation.errors });
    }
  }

  return { data, errors };
}

/**
 * Migrates legacy attendance to canonical v1 format.
 * Coerces advance_paid and uppercases attendance status.
 * @param {Array<Object>|string} raw
 * @returns {{ data: Object[], errors: Array<{ item: any, errors: string[] }> }}
 */
export function migrateAttendance(raw) {
  const parsed = safeParseJson(raw, []);
  const list = Array.isArray(parsed) ? parsed : [];
  const data = [];
  const errors = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    const normalizedStatus = String(item.status || 'PRESENT').toUpperCase();
    const rawAdv = Number(item.advance_paid ?? 0);
    const transformed = {
      ...item,
      status: ['PRESENT', 'ABSENT', 'HALF_DAY'].includes(normalizedStatus) ? normalizedStatus : 'PRESENT',
      advance_paid: (!isNaN(rawAdv) && rawAdv >= 0) ? rawAdv : 0
    };
    const validation = validateAttendance(transformed);
    if (validation.valid) {
      data.push(validation.value);
    } else {
      errors.push({ item, errors: validation.errors });
    }
  }

  return { data, errors };
}

/**
 * Migrates legacy payments to canonical v1 format.
 * Normalizes legacy statuses like 'Due Soon' -> 'Pending'.
 * @param {Array<Object>|string} raw
 * @returns {{ data: Object[], errors: Array<{ item: any, errors: string[] }> }}
 */
export function migratePayments(raw) {
  const parsed = safeParseJson(raw, []);
  const list = Array.isArray(parsed) ? parsed : [];
  const data = [];
  const errors = [];

  for (const item of list) {
    if (!item || typeof item !== 'object') continue;
    let status = item.status || 'Received';
    if (status === 'Due Soon') status = 'Pending';
    if (!['Received', 'Paid', 'Pending'].includes(status)) {
      status = item.type === 'EXPENSE' ? 'Paid' : 'Received';
    }

    const rawAmount = Number(item.amount ?? 0);
    const transformed = {
      ...item,
      amount: (!isNaN(rawAmount) && rawAmount > 0) ? rawAmount : 1,
      type: String(item.type || 'INCOME').toUpperCase(),
      status
    };
    const validation = validatePayment(transformed);
    if (validation.valid) {
      data.push(validation.value);
    } else {
      errors.push({ item, errors: validation.errors });
    }
  }

  return { data, errors };
}

/**
 * Migrates a complete legacy state dictionary to canonical v1 state.
 * @param {Record<string, any>} legacyMap
 * @returns {{
 *   state: Object,
 *   report: { success: boolean, counts: Record<string, number>, errors: Array<any> }
 * }}
 */
export function migrateLegacyState(legacyMap = {}) {
  const allErrors = [];

  const projectsRes = migrateProjects(legacyMap[LEGACY_STORAGE_KEYS.PROJECTS]);
  if (projectsRes.errors.length) allErrors.push(...projectsRes.errors);

  const tasksRes = migrateTasks(legacyMap[LEGACY_STORAGE_KEYS.TASKS]);
  if (tasksRes.errors.length) allErrors.push(...tasksRes.errors);

  const materialsRes = migrateMaterials(legacyMap[LEGACY_STORAGE_KEYS.MATERIALS]);
  if (materialsRes.errors.length) allErrors.push(...materialsRes.errors);

  const txRes = migrateMaterialTransactions(legacyMap[LEGACY_STORAGE_KEYS.MATERIAL_TX]);
  if (txRes.errors.length) allErrors.push(...txRes.errors);

  const labourRes = migrateLabour(legacyMap[LEGACY_STORAGE_KEYS.LABOUR]);
  if (labourRes.errors.length) allErrors.push(...labourRes.errors);

  const attendanceRes = migrateAttendance(legacyMap[LEGACY_STORAGE_KEYS.ATTENDANCE]);
  if (attendanceRes.errors.length) allErrors.push(...attendanceRes.errors);

  const paymentsRes = migratePayments(legacyMap[LEGACY_STORAGE_KEYS.PAYMENTS]);
  if (paymentsRes.errors.length) allErrors.push(...paymentsRes.errors);

  const issues = safeParseJson(legacyMap[LEGACY_STORAGE_KEYS.ISSUES], []);
  const activeProjectId = legacyMap[LEGACY_STORAGE_KEYS.ACTIVE_PROJECT_ID] || (projectsRes.data[0]?.id ?? null);
  const user = safeParseJson(legacyMap[LEGACY_STORAGE_KEYS.USER], null);

  const state = {
    schemaVersion: SCHEMA_VERSION,
    projects: projectsRes.data,
    activeProjectId,
    tasks: tasksRes.data,
    issues: Array.isArray(issues) ? issues : [],
    materials: materialsRes.data,
    materialTransactions: txRes.data,
    labour: labourRes.data,
    attendance: attendanceRes.data,
    payments: paymentsRes.data,
    user
  };

  const counts = {
    projects: projectsRes.data.length,
    tasks: tasksRes.data.length,
    materials: materialsRes.data.length,
    materialTransactions: txRes.data.length,
    labour: labourRes.data.length,
    attendance: attendanceRes.data.length,
    payments: paymentsRes.data.length,
    issues: state.issues.length
  };

  return {
    state,
    report: {
      success: allErrors.length === 0,
      counts,
      errors: allErrors
    }
  };
}

/**
 * Runs migration on any browser localStorage or Storage-like interface.
 * Strictly idempotent: sets a migration flag so repeated calls are no-ops unless force = true.
 * Writes normalized data to both legacy keys and versioned v1 keys for zero-breakage backwards compatibility.
 * 
 * @param {Storage|Object} storage
 * @param {{ force?: boolean }} options
 * @returns {{ success: boolean, alreadyMigrated?: boolean, counts?: Record<string, number>, errors?: any[] }}
 */
export function migrateLocalStorage(storage, options = {}) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    return { success: false, errors: ['Invalid storage object provided'] };
  }

  // Idempotency check: if already migrated and force is not set, exit safely
  if (!options.force && storage.getItem(MIGRATION_FLAG_KEY) === 'true') {
    return {
      success: true,
      alreadyMigrated: true,
      schemaVersion: SCHEMA_VERSION
    };
  }

  // Extract all legacy items from storage
  const legacyMap = {};
  for (const storageKey of Object.values(LEGACY_STORAGE_KEYS)) {
    const raw = storage.getItem(storageKey);
    if (raw !== null && raw !== undefined) {
      legacyMap[storageKey] = raw;
    }
  }

  // Execute migration
  const { state, report } = migrateLegacyState(legacyMap);

  // Write migrated entities back to storage
  try {
    storage.setItem(LEGACY_STORAGE_KEYS.PROJECTS, JSON.stringify(state.projects));
    storage.setItem(`${LEGACY_STORAGE_KEYS.PROJECTS}_v1`, JSON.stringify(state.projects));

    storage.setItem(LEGACY_STORAGE_KEYS.TASKS, JSON.stringify(state.tasks));
    storage.setItem(`${LEGACY_STORAGE_KEYS.TASKS}_v1`, JSON.stringify(state.tasks));

    storage.setItem(LEGACY_STORAGE_KEYS.MATERIALS, JSON.stringify(state.materials));
    storage.setItem(`${LEGACY_STORAGE_KEYS.MATERIALS}_v1`, JSON.stringify(state.materials));

    storage.setItem(LEGACY_STORAGE_KEYS.MATERIAL_TX, JSON.stringify(state.materialTransactions));
    storage.setItem(`${LEGACY_STORAGE_KEYS.MATERIAL_TX}_v1`, JSON.stringify(state.materialTransactions));

    storage.setItem(LEGACY_STORAGE_KEYS.LABOUR, JSON.stringify(state.labour));
    storage.setItem(`${LEGACY_STORAGE_KEYS.LABOUR}_v1`, JSON.stringify(state.labour));

    storage.setItem(LEGACY_STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));
    storage.setItem(`${LEGACY_STORAGE_KEYS.ATTENDANCE}_v1`, JSON.stringify(state.attendance));

    storage.setItem(LEGACY_STORAGE_KEYS.PAYMENTS, JSON.stringify(state.payments));
    storage.setItem(`${LEGACY_STORAGE_KEYS.PAYMENTS}_v1`, JSON.stringify(state.payments));

    if (state.activeProjectId) {
      storage.setItem(LEGACY_STORAGE_KEYS.ACTIVE_PROJECT_ID, state.activeProjectId);
      storage.setItem(`${LEGACY_STORAGE_KEYS.ACTIVE_PROJECT_ID}_v1`, state.activeProjectId);
    }

    if (state.user) {
      storage.setItem(LEGACY_STORAGE_KEYS.USER, JSON.stringify(state.user));
      storage.setItem(`${LEGACY_STORAGE_KEYS.USER}_v1`, JSON.stringify(state.user));
    }

    // Set idempotency migration flag
    storage.setItem(MIGRATION_FLAG_KEY, 'true');
    storage.setItem('buildforce_schema_version', SCHEMA_VERSION);

    return {
      success: report.success,
      alreadyMigrated: false,
      schemaVersion: SCHEMA_VERSION,
      counts: report.counts,
      errors: report.errors
    };
  } catch (err) {
    return {
      success: false,
      errors: [err.message || String(err)]
    };
  }
}
