import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { LabourPage } from './LabourPage';
import { AppContext } from '../../state/appContextInstance';

describe('ISSUE-002 Regression: Labour daily_wage numeric calculation and storage', () => {
  it('correctly calculates totalDailyWageBill using numeric addition when daily_wage is stored as string', () => {
    const today = new Date().toISOString().split('T')[0];
    const mockContext = {
      labour: [
        { id: 'w1', name: 'Ramesh Mistri', daily_wage: '850', status: 'Active', trade: 'Mason' },
        { id: 'w2', name: 'Suresh Helper', daily_wage: '1100', status: 'Active', trade: 'Mistri' }
      ],
      attendance: [
        { id: 'a1', labour_id: 'w1', date: today, status: 'PRESENT', advance_paid: 0 },
        { id: 'a2', labour_id: 'w2', date: today, status: 'PRESENT', advance_paid: 0 }
      ],
      addLabour: () => {},
      markAttendance: () => {}
    };

    const html = renderToString(
      <AppContext.Provider value={mockContext}>
        <LabourPage />
      </AppContext.Provider>
    );

    // 850 + 1100 = 1950. With string concatenation, it would produce '08501100' instead of ₹1,950
    expect(html).not.toContain('08501100');
    expect(html).toContain('₹1,950');
  });

  it('correctly calculates half-day earned net wages without string coercion issues', () => {
    const today = new Date().toISOString().split('T')[0];
    const mockContext = {
      labour: [
        { id: 'w1', name: 'Bablu Helper', daily_wage: '600', status: 'Active', trade: 'Helper' }
      ],
      attendance: [
        { id: 'a1', labour_id: 'w1', date: today, status: 'HALF_DAY', advance_paid: 50 }
      ],
      addLabour: () => {},
      markAttendance: () => {}
    };

    const html = renderToString(
      <AppContext.Provider value={mockContext}>
        <LabourPage />
      </AppContext.Provider>
    );

    // Half day of 600 is 300
    expect(html).toContain('₹300');
  });
});
