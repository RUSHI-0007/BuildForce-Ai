import React from 'react';
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

/**
 * Maps currentView names to their page components.
 * Preserves the exact view names expected by GlobalSidebar and AppContext.
 */
export const PORTAL_ROUTES = {
  sites: ProjectsPage,
  site_dashboard: ProjectOverview,
  tasks: TasksPage,
  issues: IssuesPage,
  materials: MaterialsPage,
  labour: LabourPage,
  payments: PaymentsPage,
  drive: DrivePage,
  cashflow: CashflowPage,
  library: LibraryPage,
  reports: ReportsPage,
  settings: SettingsPage,
  agents: AgentsPage
};

/**
 * Renders the page component corresponding to currentView.
 * @param {string} currentView 
 * @returns {React.ReactElement}
 */
export function renderPortalView(currentView) {
  const Component = PORTAL_ROUTES[currentView] || PORTAL_ROUTES.sites;
  return <Component />;
}
