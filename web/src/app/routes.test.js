import React from 'react';
import { describe, it, expect, beforeAll } from 'vitest';
import { renderToString } from 'react-dom/server';

// Verify all portal page modules can be resolved and imported without error
import { ProjectsPage } from '../pages/org/ProjectsPage';
import { ProjectOverview } from '../pages/project/ProjectOverview';
import { TasksPage } from '../pages/project/TasksPage';
import { IssuesPage } from '../pages/project/IssuesPage';
import { MaterialsPage } from '../pages/org/MaterialsPage';
import { LabourPage } from '../pages/org/LabourPage';
import { PaymentsPage } from '../pages/project/PaymentsPage';
import { DrivePage } from '../pages/project/DrivePage';
import { CashflowPage } from '../pages/org/CashflowPage';
import { LibraryPage } from '../pages/org/LibraryPage';
import { ReportsPage } from '../pages/org/ReportsPage';
import { SettingsPage } from '../pages/org/SettingsPage';
import { AgentsPage } from '../pages/agents/AgentsPage';

// Routes map and Providers
import { PORTAL_ROUTES, renderPortalView } from './routes';
import { AppProviders } from './providers';

describe('Portal Routes and Page Integrity (web/src/app/routes.test.js)', () => {
  const all13Views = [
    'sites',
    'site_dashboard',
    'tasks',
    'issues',
    'materials',
    'labour',
    'payments',
    'drive',
    'cashflow',
    'library',
    'reports',
    'settings',
    'agents'
  ];

  beforeAll(() => {
    // Provide node environment mock for browser globals
    const storageMap = new Map();
    globalThis.localStorage = {
      getItem: (key) => storageMap.get(key) ?? null,
      setItem: (key, val) => storageMap.set(key, String(val)),
      removeItem: (key) => storageMap.delete(key),
      clear: () => storageMap.clear()
    };
    if (typeof globalThis.window === 'undefined') {
      globalThis.window = {
        location: { hostname: 'localhost' }
      };
    }
  });

  it('maps all 13 currentView keys to valid page components', () => {
    all13Views.forEach(view => {
      expect(PORTAL_ROUTES[view]).toBeDefined();
      expect(typeof PORTAL_ROUTES[view]).toBe('function');
    });
  });

  it('renderPortalView returns a valid React element', () => {
    const el = renderPortalView('sites');
    expect(el).toBeDefined();
    expect(typeof el).toBe('object');
  });

  it('exports valid functions for all page components', () => {
    expect(typeof ProjectsPage).toBe('function');
    expect(typeof ProjectOverview).toBe('function');
    expect(typeof TasksPage).toBe('function');
    expect(typeof IssuesPage).toBe('function');
    expect(typeof MaterialsPage).toBe('function');
    expect(typeof LabourPage).toBe('function');
    expect(typeof PaymentsPage).toBe('function');
    expect(typeof DrivePage).toBe('function');
    expect(typeof CashflowPage).toBe('function');
    expect(typeof LibraryPage).toBe('function');
    expect(typeof ReportsPage).toBe('function');
    expect(typeof SettingsPage).toBe('function');
    expect(typeof AgentsPage).toBe('function');
  });

  describe('Smoke test: renders each of the 13 views without crashing', () => {
    all13Views.forEach(view => {
      it(`renders view: ${view}`, () => {
        const element = React.createElement(
          AppProviders,
          null,
          renderPortalView(view)
        );
        const html = renderToString(element);
        expect(html).toBeTruthy();
        expect(typeof html).toBe('string');
        expect(html.length).toBeGreaterThan(0);
      });
    });
  });
});
