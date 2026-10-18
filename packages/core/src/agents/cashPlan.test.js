import { describe, it, expect } from 'vitest';
import { calculateCashRunway } from './cashPlan.js';

describe('Cash Plan Engine (packages/core/src/agents/cashPlan.js)', () => {
  it('calculates runway and wage safety reserve properly', () => {
    const snapshot = {
      cashSettings: { openingBalance: 500000, overheadPerWeek: 20000, wageReserveWeeks: 2, wagePayWeekday: 6 },
      payments: [
        { type: 'INCOME', status: 'Received', amount: 300000 },
        { type: 'EXPENSE', status: 'Paid', amount: 200000 }
      ],
      labour: [
        { id: 'l1', name: 'Ramesh Mason', daily_wage: 900, status: 'Active' }, // 900 * 6 = 5400/wk
        { id: 'l2', name: 'Suresh Helper', daily_wage: 600, status: 'Active' }  // 600 * 6 = 3600/wk
      ]
    };

    // Total weekly wage = 9000
    // Total weekly overhead = 20000
    // Total weekly obligation = 29000
    // Current cash = 500,000 + 300,000 - 200,000 = 600,000
    // Reserve for 2 weeks wages = 18000
    // Available for vendors = 600,000 - 18,000 = 582,000
    // Runway weeks = Math.floor(600,000 / 29,000) = 20 weeks

    const plan = calculateCashRunway(snapshot);
    expect(plan.currentCash).toBe(600000);
    expect(plan.estimatedWeeklyWages).toBe(9000);
    expect(plan.wageSafetyReserve).toBe(18000);
    expect(plan.availableForVendors).toBe(582000);
    expect(plan.runwayWeeks).toBe(20);
    expect(plan.isHealthy).toBe(true);
    expect(plan.wageWeekday).toBe(6);
  });

  it('supports configurable wage weekday from options or settings', () => {
    const snapshot = {
      cashSettings: { openingBalance: 100000, wagePayWeekday: 5 }, // Friday
      labour: [{ id: 'l1', daily_wage: 1000, status: 'Active' }]
    };

    const planWithConfig = calculateCashRunway(snapshot);
    expect(planWithConfig.wageWeekday).toBe(5);

    const planWithOverride = calculateCashRunway(snapshot, { wageWeekday: 1 }); // Monday
    expect(planWithOverride.wageWeekday).toBe(1);
  });

  describe('ISSUE-005 Regression: Overdrawn state instead of negative runway', () => {
    it('reports overdrawn state and zero runwayWeeks when outflows exceed opening balance and inflows', () => {
      const overdrawnSnapshot = {
        cashSettings: { openingBalance: 50000, overheadPerWeek: 15000 },
        payments: [
          { type: 'INCOME', status: 'Received', amount: 20000 },
          { type: 'EXPENSE', status: 'Paid', amount: 150000 } // Deficit: 50k + 20k - 150k = -80k
        ],
        labour: [{ id: 'l1', daily_wage: 1000, status: 'Active' }]
      };

      const plan = calculateCashRunway(overdrawnSnapshot);
      expect(plan.currentCash).toBe(-80000);
      expect(plan.isOverdrawn).toBe(true);
      expect(plan.status).toBe('OVERDRAWN');
      expect(plan.runwayWeeks).toBe(0);
      expect(plan.isHealthy).toBe(false);
      expect(plan.availableForVendors).toBe(0);
    });
  });
});
