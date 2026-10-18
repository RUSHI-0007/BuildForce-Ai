import { describe, it, expect } from 'vitest';
import { buildProjectSnapshot } from './snapshot.js';

describe('ProjectSnapshot (packages/core/src/agents/snapshot.js)', () => {
  it('enforces deep immutability across all nested arrays and objects', () => {
    const rawState = {
      projects: [{ id: 'p1', name: 'Tower A', budget: 5000000 }],
      tasks: [{ id: 't1', project_id: 'p1', name: 'Slab Pour', details: { crew: 8 } }],
      cashSettings: { opening_balance: 100000, overhead_per_week: 20000 }
    };

    const snapshot = buildProjectSnapshot(rawState, 'p1');

    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.isFrozen(snapshot.tasks)).toBe(true);
    expect(Object.isFrozen(snapshot.tasks[0])).toBe(true);
    expect(Object.isFrozen(snapshot.tasks[0].details)).toBe(true);
    expect(Object.isFrozen(snapshot.cashSettings)).toBe(true);

    // Deep mutation attempts in strict mode must throw
    expect(() => {
      snapshot.projectName = 'Mutated';
    }).toThrow(TypeError);

    expect(() => {
      snapshot.tasks[0].name = 'Hacked';
    }).toThrow(TypeError);

    expect(() => {
      snapshot.tasks[0].details.crew = 99;
    }).toThrow(TypeError);

    expect(() => {
      snapshot.cashSettings.openingBalance = 0;
    }).toThrow(TypeError);
  });

  it('filters project-scoped collections while retaining organization resources', () => {
    const rawState = {
      projects: [
        { id: 'site_1', name: 'Site One', budget: 1000000 },
        { id: 'site_2', name: 'Site Two', budget: 2000000 }
      ],
      tasks: [
        { id: 't1', project_id: 'site_1', name: 'Task Site 1' },
        { id: 't2', project_id: 'site_2', name: 'Task Site 2' }
      ],
      payments: [
        { id: 'pay_1', project_id: 'site_1', amount: 50000 },
        { id: 'pay_2', project_id: 'site_2', amount: 80000 }
      ],
      materials: [
        { id: 'mat_1', name: 'Cement', in_stock: 100 }
      ],
      labour: [
        { id: 'lab_1', name: 'Mistri Ramesh', daily_wage: 900 }
      ],
      dealers: [
        { id: 'dlr_1', name: 'Ultratech Agency' }
      ]
    };

    const snapshot1 = buildProjectSnapshot(rawState, 'site_1');
    expect(snapshot1.projectId).toBe('site_1');
    expect(snapshot1.projectName).toBe('Site One');
    expect(snapshot1.tasks.length).toBe(1);
    expect(snapshot1.tasks[0].id).toBe('t1');
    expect(snapshot1.payments.length).toBe(1);
    expect(snapshot1.payments[0].id).toBe('pay_1');

    // Org-level items are preserved
    expect(snapshot1.materials.length).toBe(1);
    expect(snapshot1.labour.length).toBe(1);
    expect(snapshot1.dealers.length).toBe(1);
  });

  it('provides safe normalized defaults on empty or null input', () => {
    const snapshot = buildProjectSnapshot(null);

    expect(snapshot.projectId).toBe('default_site');
    expect(snapshot.projectName).toBe('Active Project');
    expect(snapshot.schemaVersion).toBe('1.0.0');
    expect(snapshot.timezone).toBe('Asia/Kolkata');
    expect(Array.isArray(snapshot.tasks)).toBe(true);
    expect(Array.isArray(snapshot.materials)).toBe(true);
    expect(Array.isArray(snapshot.labour)).toBe(true);
    expect(Array.isArray(snapshot.attendance)).toBe(true);
    expect(Array.isArray(snapshot.payments)).toBe(true);
    expect(Array.isArray(snapshot.invoices)).toBe(true);
    expect(Array.isArray(snapshot.proposals)).toBe(true);
    expect(snapshot.cashSettings.openingBalance).toBe(0);
    expect(snapshot.cashSettings.wageReserveWeeks).toBe(2);
    expect(Object.isFrozen(snapshot)).toBe(true);
  });
});
