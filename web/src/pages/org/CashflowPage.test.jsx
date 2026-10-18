import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CashflowPage } from './CashflowPage';
import { AppContext } from '../../state/appContextInstance';

describe('ISSUE-005 Regression: CashflowPage overdrawn state reporting', () => {
  it('reports Overdrawn state on Estimated Runway card when net liquidity is negative', () => {
    const mockContext = {
      payments: [
        { id: 'p1', amount: 50000, type: 'INCOME', status: 'Received' },
        { id: 'p2', amount: 200000, type: 'EXPENSE', status: 'Paid' } // Net: -150,000
      ],
      materials: [],
      labour: [],
      activeProject: { id: 'p1', name: 'Test Villa' },
      setActiveAgentId: () => {},
      setCurrentView: () => {}
    };

    const html = renderToString(
      <AppContext.Provider value={mockContext}>
        <CashflowPage />
      </AppContext.Provider>
    );

    // Verify it reports "Overdrawn" rather than negative runway weeks
    expect(html).toContain('Overdrawn');
    expect(html).not.toMatch(/-[0-9]+(\.[0-9]+)? Weeks/);
    expect(html).toContain('Critical Warning: Account Overdrawn');
  });

  it('reports healthy runway weeks when positive cash is available', () => {
    const mockContext = {
      payments: [
        { id: 'p1', amount: 500000, type: 'INCOME', status: 'Received' },
        { id: 'p2', amount: 100000, type: 'EXPENSE', status: 'Paid' } // Net: 400,000 (~3.2 weeks)
      ],
      materials: [],
      labour: [],
      activeProject: { id: 'p1', name: 'Test Villa' },
      setActiveAgentId: () => {},
      setCurrentView: () => {}
    };

    const html = renderToString(
      <AppContext.Provider value={mockContext}>
        <CashflowPage />
      </AppContext.Provider>
    );

    expect(html).toContain('Weeks');
    expect(html).toContain('Healthy Cashflow Status');
  });

  describe('ISSUE-006 Regression: Removal of Ask AI Credit Advisor button and credit id', () => {
    it('does not render the "Ask AI Credit Advisor" button or reference "credit" agent id', () => {
      const mockContext = {
        payments: [{ id: 'p1', amount: 100000, type: 'INCOME', status: 'Received' }],
        materials: [],
        labour: [],
        activeProject: { id: 'p1', name: 'Test Villa' },
        setActiveAgentId: () => {},
        setCurrentView: () => {}
      };

      const html = renderToString(
        <AppContext.Provider value={mockContext}>
          <CashflowPage />
        </AppContext.Provider>
      );

      // Narrowed assertion: checks button text and quoted 'credit' id without forbidding the word 'credit'
      expect(html).not.toContain('Ask AI Credit Advisor');
      expect(html).not.toMatch(/['"]credit['"]/);
    });
  });
});
