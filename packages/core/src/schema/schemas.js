/**
 * @file schemas.js
 * Canonical entity definitions, validation functions, and type constraints
 * for BuildForce AI core data models.
 * Free of React, DOM, HTTP or database dependencies.
 */

/**
 * Validates a Project entity.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateProject(input = {}, options = {}) {
  const errors = [];
  const warnings = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Project must be a non-null object'], warnings: [], value: null };
  }

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (!name) errors.push('Project name is required');

  const rawBudget = Number(input.budget ?? 0);
  let budget;
  if (isNaN(rawBudget) || rawBudget < 0) {
    if (options.preserveOriginal) {
      warnings.push(`Project budget is invalid or negative: ${input.budget}`);
      budget = input.budget;
    } else {
      errors.push('Project budget must be a non-negative number');
      budget = rawBudget;
    }
  } else {
    budget = rawBudget;
  }

  const progress = Number(input.progress ?? 0);
  if (isNaN(progress) || progress < 0 || progress > 100) {
    errors.push('Project progress must be a number between 0 and 100');
  }

  const validStatuses = ['Planning', 'In Progress', 'On Hold', 'Completed'];
  const status = input.status || 'In Progress';
  if (!validStatuses.includes(status)) {
    errors.push(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    value: errors.length === 0 ? {
      id: input.id || `prj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      org_id: input.org_id || 'org_primary_01',
      name,
      location: input.location ? String(input.location).trim() : '',
      client_name: input.client_name ? String(input.client_name).trim() : '',
      budget,
      status,
      progress,
      start_date: input.start_date || null,
      end_date: input.end_date || null,
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a Task entity.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateTask(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Task must be a non-null object'], value: null };
  }

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (!name) errors.push('Task name is required');

  const duration_days = Number(input.duration_days ?? input.duration ?? 1);
  if (isNaN(duration_days) || duration_days <= 0) {
    errors.push('Task duration_days must be a positive number');
  }

  const weight = Number(input.weight ?? 1);
  if (isNaN(weight) || weight <= 0) {
    errors.push('Task weight must be a positive number');
  }

  const rawProgress = Number(input.progress_pct ?? input.progress ?? 0);
  if (isNaN(rawProgress) || rawProgress < 0 || rawProgress > 100) {
    errors.push('Task progress_pct must be a number between 0 and 100');
  }
  const progress_pct = (!isNaN(rawProgress) && rawProgress >= 0 && rawProgress <= 100)
    ? rawProgress
    : Math.min(100, Math.max(0, isNaN(rawProgress) ? 0 : rawProgress));

  const validStatuses = ['Pending', 'In Progress', 'Completed'];
  const status = input.status || 'Pending';
  if (!validStatuses.includes(status)) {
    errors.push(`Invalid task status. Must be one of: ${validStatuses.join(', ')}`);
  }

  const depends_on = Array.isArray(input.depends_on)
    ? input.depends_on.filter(id => typeof id === 'string' && id.trim())
    : (input.depends_on ? [String(input.depends_on)] : []);

  const material_needs = Array.isArray(input.material_needs)
    ? input.material_needs.filter(m => m && typeof m === 'object')
    : [];

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `tsk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      project_id: input.project_id || null,
      name,
      stage: input.stage ? String(input.stage).trim() : 'General',
      status,
      start_date: input.start_date || null,
      due_date: input.due_date || null,
      duration_days,
      depends_on,
      weight: (isNaN(weight) || weight <= 0) ? 1 : weight,
      progress_pct,
      material_needs,
      assigned_to: input.assigned_to ? String(input.assigned_to).trim() : 'Unassigned',
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a Material inventory item.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateMaterial(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Material must be a non-null object'], value: null };
  }

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (!name) errors.push('Material name is required');

  const unit = typeof input.unit === 'string' ? input.unit.trim() : '';
  if (!unit) errors.push('Material unit is required (e.g. Bags, Tons, Brass)');

  const in_stock = Number(input.in_stock ?? 0);
  if (isNaN(in_stock) || in_stock < 0) errors.push('Material in_stock must be a non-negative number');

  const unit_price = Number(input.unit_price ?? 0);
  if (isNaN(unit_price) || unit_price < 0) errors.push('Material unit_price must be a non-negative number');

  const min_threshold = Number(input.min_threshold ?? 0);
  if (isNaN(min_threshold) || min_threshold < 0) errors.push('Material min_threshold must be a non-negative number');

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `mat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      org_id: input.org_id || 'org_primary_01',
      name,
      unit,
      in_stock,
      unit_price,
      min_threshold,
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a MaterialTransaction record.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateMaterialTransaction(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Transaction must be a non-null object'], value: null };
  }

  const material_id = input.material_id || input.item_id;
  if (!material_id || typeof material_id !== 'string') errors.push('material_id is required');

  const validTypes = ['INWARD', 'OUTWARD', 'CONSUMED'];
  const type = String(input.type || '').toUpperCase();
  if (!validTypes.includes(type)) {
    errors.push(`Transaction type must be one of: ${validTypes.join(', ')}`);
  }

  const quantity = Number(input.quantity ?? 0);
  if (isNaN(quantity) || quantity <= 0) {
    errors.push('Transaction quantity must be a positive number');
  }

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `mtx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      project_id: input.project_id || null,
      material_id,
      type,
      quantity,
      challan_no: input.challan_no ? String(input.challan_no).trim() : null,
      receiver: input.receiver ? String(input.receiver).trim() : null,
      date: input.date || new Date().toISOString().split('T')[0],
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a Labour worker record.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateLabour(input = {}, options = {}) {
  const errors = [];
  const warnings = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Labour record must be a non-null object'], warnings: [], value: null };
  }

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (!name) errors.push('Worker name is required');

  const wage = Number(input.daily_wage ?? 0);
  let daily_wage;
  if (isNaN(wage) || wage <= 0) {
    if (options.preserveOriginal) {
      warnings.push(`Worker daily_wage is invalid or non-positive: ${input.daily_wage}`);
      daily_wage = input.daily_wage;
    } else {
      errors.push('Worker daily_wage must be a positive number');
      daily_wage = wage;
    }
  } else {
    daily_wage = wage;
  }

  const validStatuses = ['Active', 'Inactive'];
  const status = input.status || 'Active';
  if (!validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    value: errors.length === 0 ? {
      id: input.id || `lab_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      org_id: input.org_id || 'org_primary_01',
      name,
      phone: input.phone ? String(input.phone).trim() : '',
      trade: input.trade ? String(input.trade).trim() : 'General Labour',
      daily_wage,
      status,
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates an Attendance record.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateAttendance(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Attendance record must be a non-null object'], value: null };
  }

  if (!input.labour_id || typeof input.labour_id !== 'string') {
    errors.push('labour_id is required');
  }

  if (!input.date || typeof input.date !== 'string') {
    errors.push('date is required (YYYY-MM-DD)');
  }

  const validStatuses = ['PRESENT', 'ABSENT', 'HALF_DAY'];
  const status = String(input.status || 'PRESENT').toUpperCase();
  if (!validStatuses.includes(status)) {
    errors.push(`Attendance status must be one of: ${validStatuses.join(', ')}`);
  }

  const advance_paid = Number(input.advance_paid ?? 0);
  if (isNaN(advance_paid) || advance_paid < 0) {
    errors.push('advance_paid must be a non-negative number');
  }

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      project_id: input.project_id || null,
      labour_id: input.labour_id,
      date: input.date,
      status,
      advance_paid,
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a Payment transaction record.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validatePayment(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Payment must be a non-null object'], value: null };
  }

  const amount = Number(input.amount ?? 0);
  if (isNaN(amount) || amount <= 0) {
    errors.push('Payment amount must be a positive number');
  }

  const validTypes = ['INCOME', 'EXPENSE'];
  const type = String(input.type || '').toUpperCase();
  if (!validTypes.includes(type)) {
    errors.push(`Payment type must be one of: ${validTypes.join(', ')}`);
  }

  const validStatuses = ['Received', 'Paid', 'Pending'];
  const status = input.status || (type === 'INCOME' ? 'Received' : 'Paid');
  if (!validStatuses.includes(status)) {
    errors.push(`Payment status must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      project_id: input.project_id || null,
      milestone: input.milestone ? String(input.milestone).trim() : 'General',
      amount,
      type,
      status,
      mode: input.mode ? String(input.mode).trim() : 'Bank/NEFT',
      date: input.date || new Date().toISOString().split('T')[0],
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates an Invoice record for 3-way matching.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateInvoice(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Invoice must be a non-null object'], value: null };
  }

  const invoice_no = typeof input.invoice_no === 'string' ? input.invoice_no.trim() : (input.id || '');
  if (!invoice_no) errors.push('invoice_no is required');

  const total = Number(input.total ?? input.amount ?? 0);
  if (isNaN(total) || total < 0) {
    errors.push('Invoice total must be a non-negative number');
  }

  const validStatuses = ['CLEAN_MATCH', 'PARTIAL_HOLD', 'REJECTED', 'Needs review'];
  const status = input.status || 'CLEAN_MATCH';
  if (!validStatuses.includes(status)) {
    errors.push(`Invoice status must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `inv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      po_id: input.po_id || null,
      dealer_id: input.dealer_id || null,
      invoice_no,
      total,
      status,
      due_date: input.due_date || null,
      lines: Array.isArray(input.lines) ? input.lines : [],
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a Delivery record (challan / material delivery).
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateDelivery(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Delivery must be a non-null object'], value: null };
  }

  const challan_no = typeof input.challan_no === 'string' ? input.challan_no.trim() : (input.id || '');
  if (!challan_no) {
    errors.push('challan_no is required');
  }

  const validStatuses = ['Received', 'Inspected', 'Partial', 'Pending'];
  const status = input.status || 'Received';
  if (!validStatuses.includes(status)) {
    errors.push(`Delivery status must be one of: ${validStatuses.join(', ')}`);
  }

  const items = Array.isArray(input.items)
    ? input.items.map(item => ({
        material_id: item.material_id || item.item_id || null,
        material_name: item.material_name || item.name || '',
        quantity: Number(item.quantity ?? item.qty ?? 0),
        unit: item.unit || 'Units',
        unit_price: Number(item.unit_price ?? item.price ?? 0)
      }))
    : [];

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `del_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      project_id: input.project_id || null,
      po_id: input.po_id || null,
      dealer_id: input.dealer_id || null,
      challan_no,
      delivery_date: input.delivery_date || input.date || new Date().toISOString().split('T')[0],
      status,
      items,
      received_by: input.received_by ? String(input.received_by).trim() : 'Site Incharge',
      notes: input.notes ? String(input.notes).trim() : '',
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a Quote record.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateQuote(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Quote must be a non-null object'], value: null };
  }

  const total_amount = Number(input.total_amount ?? input.amount ?? 0);
  if (isNaN(total_amount) || total_amount < 0) {
    errors.push('Quote total_amount must be a non-negative number');
  }

  const validStatuses = ['Pending', 'Accepted', 'Rejected'];
  const status = input.status || 'Pending';
  if (!validStatuses.includes(status)) {
    errors.push(`Quote status must be one of: ${validStatuses.join(', ')}`);
  }

  const items = Array.isArray(input.items)
    ? input.items.map(item => ({
        item_name: item.item_name || item.name || '',
        quantity: Number(item.quantity ?? item.qty ?? 0),
        rate: Number(item.rate ?? item.unit_price ?? 0),
        amount: Number(item.amount ?? ((item.quantity ?? 0) * (item.rate ?? 0)))
      }))
    : [];

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `qte_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      rfq_id: input.rfq_id || null,
      dealer_id: input.dealer_id || null,
      dealer_name: input.dealer_name ? String(input.dealer_name).trim() : '',
      project_id: input.project_id || null,
      total_amount,
      status,
      items,
      valid_until: input.valid_until || null,
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a Request For Quotation (RFQ) record.
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validateRFQ(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['RFQ must be a non-null object'], value: null };
  }

  const title = typeof input.title === 'string' ? input.title.trim() : (input.rfq_number || '');
  if (!title) {
    errors.push('RFQ title or rfq_number is required');
  }

  const validStatuses = ['Open', 'Closed', 'Cancelled'];
  const status = input.status || 'Open';
  if (!validStatuses.includes(status)) {
    errors.push(`RFQ status must be one of: ${validStatuses.join(', ')}`);
  }

  const items = Array.isArray(input.items)
    ? input.items.map(item => ({
        material_id: item.material_id || null,
        name: item.name || item.material_name || '',
        quantity: Number(item.quantity ?? item.qty ?? 0),
        unit: item.unit || 'Units'
      }))
    : [];

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `rfq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      project_id: input.project_id || null,
      rfq_number: input.rfq_number || `RFQ-${Date.now()}`,
      title,
      status,
      items,
      due_date: input.due_date || null,
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

/**
 * Validates a PlanVersion record (scheduler plan baseline/version).
 * @param {Object} input
 * @returns {{ valid: boolean, errors: string[], value: Object }}
 */
export function validatePlanVersion(input = {}) {
  const errors = [];
  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['PlanVersion must be a non-null object'], value: null };
  }

  if (!input.project_id) {
    errors.push('PlanVersion project_id is required');
  }

  const version = Number(input.version ?? 1);
  if (isNaN(version) || version <= 0) {
    errors.push('PlanVersion version must be a positive integer');
  }

  const total_duration_days = Number(input.total_duration_days ?? 0);
  if (isNaN(total_duration_days) || total_duration_days < 0) {
    errors.push('PlanVersion total_duration_days must be a non-negative number');
  }

  return {
    valid: errors.length === 0,
    errors,
    value: errors.length === 0 ? {
      id: input.id || `pln_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      project_id: input.project_id,
      version,
      name: input.name ? String(input.name).trim() : `Plan v${version}`,
      tasks: Array.isArray(input.tasks) ? input.tasks : [],
      critical_path: Array.isArray(input.critical_path) ? input.critical_path : [],
      total_duration_days,
      created_by: input.created_by ? String(input.created_by).trim() : 'scheduler_agent',
      created_at: input.created_at || new Date().toISOString()
    } : null
  };
}

