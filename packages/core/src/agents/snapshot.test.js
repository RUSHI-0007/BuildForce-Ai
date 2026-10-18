import { describe, it, expect } from 'vitest';
import { buildProjectSnapshot } from './snapshot.js';

describe('ProjectSnapshot (packages/core/src/agents/snapshot.js)', () => {
  it('builds an immutable, normalized snapshot filtered to the active project', () => {
    const mockState = {
      projects: [{ id: 'site_1', name: 'Pune Villa' }],
      tasks: [
        { id: 't1', project_id: 'site_1', name: 'Excavation' },
        { id: 't2', project_id: 'site_2', name: 'Other Project Task' }
      ],
      materials: [{ id: 'm1', name: 'Cement', in_stock: 100 }],
      cashSettings: { opening_balance: 500000 }
    };

    const snapshot = buildProjectSnapshot(mockState, 'site_1');

    expect(snapshot.projectId).toBe('site_1');
    expect(snapshot.projectName).toBe('Pune Villa');
    expect(snapshot.tasks.length).toBe(1);
    expect(snapshot.tasks[0].id).toBe('t1');
    expect(snapshot.cashSettings.openingBalance).toBe(500000);
    expect(Object.isFrozen(snapshot)).toBe(true);
  });
});
