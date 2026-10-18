import { describe, it, expect } from 'vitest';
import {
  validateProject,
  validateTask,
  validateMaterial,
  validateMaterialTransaction,
  validateLabour,
  validateAttendance,
  validatePayment,
  validateInvoice
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
});
