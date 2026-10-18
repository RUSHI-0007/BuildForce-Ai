import React, { useState } from 'react';
import { GlobalSidebar } from '../layout/GlobalSidebar';
import { TopBar } from '../layout/TopBar';
import { useApp } from '../../context/AppContext';

// Pages
import { ProjectsPage } from '../../pages/org/ProjectsPage';
import { ProjectOverview } from '../../pages/project/ProjectOverview';
import { TasksPage } from '../../pages/project/TasksPage';
import { IssuesPage } from '../../pages/project/IssuesPage';
import { MaterialsPage } from '../../pages/org/MaterialsPage';
import { LabourPage } from '../../pages/org/LabourPage';
import { PaymentsPage } from '../../pages/project/PaymentsPage';
import { DrivePage } from '../../pages/project/DrivePage';
import { CashflowPage } from '../../pages/org/CashflowPage';
import { LibraryPage } from '../../pages/org/LibraryPage';
import { ReportsPage } from '../../pages/org/ReportsPage';
import { SettingsPage } from '../../pages/org/SettingsPage';
import { AgentsPage } from '../../pages/agents/AgentsPage';

export function BuildSitePortal({ onBackToLanding, initialAgent = null }) {
  const { currentView, setCurrentView, setActiveAgentId } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If initialAgent was passed from landing page showcase
  React.useEffect(() => {
    if (initialAgent) {
      setActiveAgentId(initialAgent);
      setCurrentView('agents');
    }
  }, [initialAgent, setActiveAgentId, setCurrentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'sites':
        return <ProjectsPage />;
      case 'site_dashboard':
        return <ProjectOverview />;
      case 'tasks':
        return <TasksPage />;
      case 'issues':
        return <IssuesPage />;
      case 'materials':
        return <MaterialsPage />;
      case 'labour':
        return <LabourPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'drive':
        return <DrivePage />;
      case 'cashflow':
        return <CashflowPage />;
      case 'library':
        return <LibraryPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'agents':
        return <AgentsPage />;
      default:
        return <ProjectsPage />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f5f6fa', // Powerplay light gray content area
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#0f172a'
    }}>
      {/* Stable Unified Sidebar - Persistent Navigation */}
      <GlobalSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onBackToLanding={onBackToLanding}
      />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100vh',
        overflowY: 'auto'
      }}>
        {/* TopBar with breadcrumb & action triggers */}
        <TopBar 
          onBackToLanding={onBackToLanding}
          onOpenNewModal={(type) => {
            if (type === 'project') setCurrentView('sites');
            else if (type === 'task') setCurrentView('tasks');
            else if (type === 'issue') setCurrentView('issues');
            else if (type === 'material') setCurrentView('materials');
            else if (type === 'labour') setCurrentView('labour');
          }}
        />

        {/* View Content */}
        <main style={{ flex: 1 }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
