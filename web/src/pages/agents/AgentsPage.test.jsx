import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AgentsPage } from './AgentsPage';
import { SiteSchedulerAgent } from '../../components/agents/SiteSchedulerAgent';
import { AGENT_REGISTRY } from '../../config/agentRegistry';
import { AppContext } from '../../state/appContextInstance';

describe('ISSUE-001 Regression: AgentsPage & Agent Tabs Rendering', () => {
  const baseMockContext = {
    activeAgentId: 'cash',
    setActiveAgentId: () => {},
    activeProject: { id: 'site_101', name: 'Shivaji Nagar Villa (G+2)' },
    tasks: [
      { id: 't1', name: 'First Floor Slab', stage: 'RCC', status: 'In Progress', due_date: '2026-10-25', assigned_to: 'Ramesh' }
    ],
    materials: [
      { id: 'm1', name: 'Cement Bags', in_stock: 100, min_threshold: 20, unit: 'Bags', unit_price: 380 }
    ],
    materialTransactions: [],
    labour: [
      { id: 'l1', name: 'Santosh Mistri', daily_wage: 900, status: 'Active' }
    ],
    payments: [
      { id: 'pay_1', amount: 500000, type: 'INCOME', status: 'Received' }
    ],
    cashSettings: { wageReserveWeeks: 2, openingBalance: 100000 }
  };

  it('directly renders SiteSchedulerAgent with activeProject prop without crashing on undeclared variable', () => {
    const activeProject = { id: 'p1', name: 'Koregaon Park Penthouse' };
    const html = renderToString(
      <AppContext.Provider value={baseMockContext}>
        <SiteSchedulerAgent activeProject={activeProject} />
      </AppContext.Provider>
    );

    expect(html).toContain('Site Scheduler &amp; PM AI');
    expect(html).toContain('Koregaon Park Penthouse');
  });

  it('renders every agent tab in AGENT_REGISTRY without errors', () => {
    expect(AGENT_REGISTRY).toHaveLength(6);

    for (const agent of AGENT_REGISTRY) {
      const contextValue = {
        ...baseMockContext,
        activeAgentId: agent.id
      };

      const html = renderToString(
        <AppContext.Provider value={contextValue}>
          <AgentsPage />
        </AppContext.Provider>
      );

      // Verify the agent hub header is present
      expect(html).toContain('Agent Team Hub');
      // Verify the agent hub header is present
      expect(html).toContain('Agent Team Hub');
      // Verify the active agent view label is rendered
      expect(html).toContain('Active View');
      expect(html).toContain(agent.name.replace(/&/g, '&amp;'));
    }
  });
});
