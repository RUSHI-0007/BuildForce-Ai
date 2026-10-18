import { describe, it, expect } from 'vitest';
import {
  validateProject,
  validateTask,
  validateMaterial,
  validateMaterialTransaction,
  validateLabour,
  validateAttendance,
  validatePayment,
  validateInvoice,
  validateDelivery,
  validateQuote,
  validateRFQ,
  validatePlanVersion
} from './schemas.js';

describe('Core Schema Validators (packages/core/src/schema/schemas.js)', () => {
  describe('Project Schema', () => {
    it('validates and normalizes valid project record', () => {
      const res = validateProject({
        name: 'Shivaji Villa',
        budget: '4500000',
        progress: '45',
        status: 'In Progress'
      });
      expect(res.valid).toBe(true);
      expect(res.value.name).toBe('Shivaji Villa');
      expect(res.value.budget).toBe(4500000);
      expect(res.value.progress).toBe(45);
      expect(res.value.status).toBe('In Progress');
      expect(res.value.id).toBeDefined();
    });

    it('rejects project without name or with negative budget', () => {
      const res1 = validateProject({ budget: 1000 });
      expect(res1.valid).toBe(false);
      expect(res1.errors).toContain('Project name is required');

      const res2 = validateProject({ name: 'Site', budget: -500 });
      expect(res2.valid).toBe(false);
      expect(res2.errors).toContain('Project budget must be a non-negative number');
    });
  });

  describe('Task Schema', () => {
    it('normalizes task duration and depends_on array', () => {
      const res = validateTask({
        name: 'Slab Casting',
        project_id: 'site_1',
        duration_days: '5',
        depends_on: 'tsk_0'
      });
      expect(res.valid).toBe(true);
      expect(res.value.duration_days).toBe(5);
      expect(res.value.depends_on).toEqual(['tsk_0']);
    });

    it('validates all new Phase 3 task fields (start_date, duration_days, depends_on, weight, progress_pct, material_needs)', () => {
      const res = validateTask({
        name: 'Brick Masonry',
        project_id: 'site_101',
        start_date: '2026-10-20',
        duration_days: 4,
        depends_on: ['tsk_1', 'tsk_2'],
        weight: 2.5,
        progress_pct: 60,
        material_needs: [
          { material_id: 'mat_1', quantity: 50, unit: 'Bags' },
          { material_id: 'mat_4', quantity: 2000, unit: 'Pieces' }
        ]
      });
      expect(res.valid).toBe(true);
      expect(res.value.start_date).toBe('2026-10-20');
      expect(res.value.duration_days).toBe(4);
      expect(res.value.depends_on).toEqual(['tsk_1', 'tsk_2']);
      expect(res.value.weight).toBe(2.5);
      expect(res.value.progress_pct).toBe(60);
      expect(res.value.material_needs).toHaveLength(2);
      expect(res.value.material_needs[0].material_id).toBe('mat_1');
    });

    it('rejects invalid status and zero duration', () => {
      const res = validateTask({ name: 'Task', duration_days: 0, status: 'InvalidStatus' });
      expect(res.valid).toBe(false);
      expect(res.errors.some(e => e.includes('duration_days must be a positive number'))).toBe(true);
      expect(res.errors.some(e => e.includes('Invalid task status'))).toBe(true);
    });
  });

  describe('Material & Transaction Schema', () => {
    it('validates material inventory and non-negative constraints', () => {
      const res = validateMaterial({ name: 'Cement', unit: 'Bags', in_stock: 100, unit_price: 380 });
      expect(res.valid).toBe(true);
      expect(res.value.in_stock).toBe(100);
      expect(res.value.unit_price).toBe(380);
    });

    it('validates material transaction type and maps legacy item_id', () => {
      const res = validateMaterialTransaction({
        item_id: 'mat_1',
        type: 'inward',
        quantity: '50'
      });
      expect(res.valid).toBe(true);
      expect(res.value.material_id).toBe('mat_1');
      expect(res.value.type).toBe('INWARD');
      expect(res.value.quantity).toBe(50);
    });

    it('rejects non-positive transaction quantity', () => {
      const res = validateMaterialTransaction({ material_id: 'mat_1', type: 'INWARD', quantity: 0 });
      expect(res.valid).toBe(false);
      expect(res.errors).toContain('Transaction quantity must be a positive number');
    });
  });

  describe('Labour & Attendance Schema', () => {
    it('coerces string daily_wage to number and validates status', () => {
      const res = validateLabour({
        name: 'Ramesh Mistri',
        daily_wage: '1100',
        phone: '9822104512'
      });
      expect(res.valid).toBe(true);
      expect(res.value.daily_wage).toBe(1100);
      expect(typeof res.value.daily_wage).toBe('number');
      expect(res.value.status).toBe('Active');
    });

    it('validates attendance status and advance_paid', () => {
      const res = validateAttendance({
        labour_id: 'lab_1',
        date: '2026-10-18',
        status: 'HALF_DAY',
        advance_paid: '200'
      });
      expect(res.valid).toBe(true);
      expect(res.value.status).toBe('HALF_DAY');
      expect(res.value.advance_paid).toBe(200);
    });
  });

  describe('Payment & Invoice Schema', () => {
    it('validates payment amount and direction', () => {
      const res = validatePayment({
        amount: '250000',
        type: 'income',
        milestone: 'Plinth Complete'
      });
      expect(res.valid).toBe(true);
      expect(res.value.amount).toBe(250000);
      expect(res.value.type).toBe('INCOME');
      expect(res.value.status).toBe('Received');
    });

    it('validates invoice 3-way status and line items', () => {
      const res = validateInvoice({
        invoice_no: 'INV-2026-001',
        total: '78500',
        status: 'CLEAN_MATCH',
        lines: [{ material_id: 'mat_1', qty: 100, rate: 380 }]
      });
      expect(res.valid).toBe(true);
      expect(res.value.total).toBe(78500);
      expect(res.value.lines.length).toBe(1);
    });
  });

  describe('Deliveries, Quotes, RFQs & Plan Versions Schema (Phase 3)', () => {
    it('validates and normalizes Delivery records', () => {
      const validDelivery = validateDelivery({
        challan_no: 'CH-10992',
        project_id: 'site_101',
        po_id: 'po_1',
        status: 'Received',
        items: [{ material_id: 'mat_1', material_name: 'Cement', quantity: '100', unit: 'Bags' }]
      });
      expect(validDelivery.valid).toBe(true);
      expect(validDelivery.value.challan_no).toBe('CH-10992');
      expect(validDelivery.value.items[0].quantity).toBe(100);
      expect(validDelivery.value.status).toBe('Received');

      const invalidDelivery = validateDelivery({ challan_no: '' });
      expect(invalidDelivery.valid).toBe(false);
      expect(invalidDelivery.errors).toContain('challan_no is required');
    });

    it('validates and normalizes Quote records', () => {
      const validQuote = validateQuote({
        total_amount: '45000',
        dealer_name: 'Shinde Traders',
        items: [{ item_name: 'River Sand', quantity: 3, rate: 7000 }]
      });
      expect(validQuote.valid).toBe(true);
      expect(validQuote.value.total_amount).toBe(45000);
      expect(validQuote.value.status).toBe('Pending');
      expect(validQuote.value.items[0].amount).toBe(21000);

      const invalidQuote = validateQuote({ total_amount: -100 });
      expect(invalidQuote.valid).toBe(false);
      expect(invalidQuote.errors).toContain('Quote total_amount must be a non-negative number');
    });

    it('validates and normalizes RFQ records', () => {
      const validRFQ = validateRFQ({
        rfq_number: 'RFQ-2026-001',
        title: 'Steel & Cement Bulk RFQ',
        items: [{ name: 'TMT Steel 12mm', quantity: 5, unit: 'Tons' }]
      });
      expect(validRFQ.valid).toBe(true);
      expect(validRFQ.value.title).toBe('Steel & Cement Bulk RFQ');
      expect(validRFQ.value.status).toBe('Open');
      expect(validRFQ.value.items).toHaveLength(1);

      const invalidRFQ = validateRFQ({ title: '', rfq_number: '' });
      expect(invalidRFQ.valid).toBe(false);
      expect(invalidRFQ.errors).toContain('RFQ title or rfq_number is required');
    });

    it('validates and normalizes PlanVersion records', () => {
      const validPlan = validatePlanVersion({
        project_id: 'site_101',
        version: 1,
        name: 'Baseline S-Curve Plan',
        tasks: [{ id: 'tsk_1', name: 'Excavation', duration_days: 3 }],
        critical_path: ['tsk_1'],
        total_duration_days: 35
      });
      expect(validPlan.valid).toBe(true);
      expect(validPlan.value.project_id).toBe('site_101');
      expect(validPlan.value.version).toBe(1);
      expect(validPlan.value.tasks).toHaveLength(1);
      expect(validPlan.value.total_duration_days).toBe(35);

      const invalidPlan = validatePlanVersion({ version: 1 });
      expect(invalidPlan.valid).toBe(false);
      expect(invalidPlan.errors).toContain('PlanVersion project_id is required');
    });
  });
});
