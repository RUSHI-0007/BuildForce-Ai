import { describe, it, expect } from 'vitest';
import { runCoordinatorCycle } from './coordinator.js';

describe('Coordinator Agent Engine (packages/core/src/agents/coordinator.js)', () => {
  it('detects shortages and produces actionable procurement proposals', () => {
    const snapshot = {
      projectId: 'site_101',
      tasks: [],
      materials: [
        { id: 'm1', name: 'UltraTech Cement', in_stock: 20, min_threshold: 50, unit: 'Bags' }
      ],
      materialTransactions: [],
      labour: [],
      payments: [],
      cashSettings: { openingBalance: 100000 }
    };

    const proposals = runCoordinatorCycle(snapshot);
    const procProp = proposals.find(p => p.agentId === 'procurement');

    expect(procProp).toBeDefined();
    expect(procProp.actionType).toBe('SEND_RFQ');
    expect(procProp.payload.materialName).toBe('UltraTech Cement');
    expect(procProp.priority).toBe('CRITICAL');
  });
});
