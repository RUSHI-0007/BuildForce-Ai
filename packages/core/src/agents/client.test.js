import { describe, it, expect } from 'vitest';
import { calculateClientBillingReadiness } from './client.js';

describe('Client Agent Logic (packages/core/src/agents/client.js)', () => {
  it('computes physical vs financial completion and outstanding amounts', () => {
    const payments = [
      { type: 'INCOME', amount: 1000000, status: 'Received' },
      { type: 'INCOME', amount: 1000000, status: 'Pending' }
    ];
    const tasks = [
      { id: 't1', status: 'Completed' },
      { id: 't2', status: 'Completed' },
      { id: 't3', status: 'Pending' },
      { id: 't4', status: 'Pending' }
    ];

    const result = calculateClientBillingReadiness(payments, tasks);
    expect(result.totalContract).toBe(2000000);
    expect(result.totalBilledOrReceived).toBe(1000000);
    expect(result.outstandingAmount).toBe(1000000);
    expect(result.physicalCompletionPct).toBe(50);
    expect(result.financialCompletionPct).toBe(50);
    expect(result.isOverBilled).toBe(false);
  });
});
