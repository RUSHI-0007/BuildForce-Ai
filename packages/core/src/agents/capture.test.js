import { describe, it, expect } from 'vitest';
import { normalizeAttendanceEntries, normalizeInwardMaterial } from './capture.js';

describe('Capture Agent Logic (packages/core/src/agents/capture.js)', () => {
  it('normalizes attendance entries with default present and zero advance', () => {
    const entries = [
      { labourId: 'lab_1', status: 'PRESENT' },
      { labourId: 'lab_2', status: 'HALF_DAY', advancePaid: 200 }
    ];

    const records = normalizeAttendanceEntries(entries, 'site_101', '2026-10-18');
    expect(records.length).toBe(2);
    expect(records[0].project_id).toBe('site_101');
    expect(records[0].advance_paid).toBe(0);
    expect(records[1].advance_paid).toBe(200);
    expect(records[1].status).toBe('HALF_DAY');
  });

  it('normalizes inward material deliveries with challan info', () => {
    const inward = normalizeInwardMaterial({
      projectId: 'site_101',
      materialId: 'mat_1',
      quantity: 100,
      challanNo: 'CH-8821'
    });

    expect(inward.type).toBe('INWARD');
    expect(inward.quantity).toBe(100);
    expect(inward.challan_no).toBe('CH-8821');
  });
});
