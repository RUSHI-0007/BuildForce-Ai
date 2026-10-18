import React, { useState } from 'react';
import { GlobalSidebar } from '../layout/GlobalSidebar';
import { TopBar } from '../layout/TopBar';
import { useApp } from '../../hooks/useApp';

import { renderPortalView } from '../../app/routes';

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

  const renderContent = () => renderPortalView(currentView);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f5f6fa', // Light gray content area
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
