import React, { useState } from 'react';
import { 
  Search, Bell, Plus, ChevronDown, User, LogOut, 
  ExternalLink, Sparkles, Building2, Check, RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export function TopBar({ onOpenNewModal, onBackToLanding }) {
  const { currentView, setCurrentView, activeProject, projects, selectProject, resetToCleanWorkspace } = useApp();
  const { user, org, signOut } = useAuth();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProjectSwitcher, setShowProjectSwitcher] = useState(false);
  const [showQuickAddMenu, setShowQuickAddMenu] = useState(false);

  // Compute breadcrumb title based on view
  const getViewTitle = () => {
    switch(currentView) {
      case 'sites': return 'Sites';
      case 'site_dashboard': return 'Site Dashboard';
      case 'tasks': return 'Tasks & Schedule';
      case 'issues': return 'Issues & Snags';
      case 'materials': return 'Material Stock Register';
      case 'labour': return 'Labour & Daily Haazri';
      case 'cashflow': return 'Cashflow Tracker';
      case 'payments': return 'Client Payments';
      case 'drive': return 'Drive Documents';
      case 'library': return 'Rate Library & BOQs';
      case 'reports': return 'Reports & Extracts';
      case 'settings': return 'Settings';
      case 'agents': return 'AI Workforce Agents';
      default: return 'Overview';
    }
  };

  const isProjectScoped = ['site_dashboard', 'tasks', 'issues', 'payments', 'drive'].includes(currentView);

  return (
    <header style={{
      height: '56px',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Left Breadcrumb & Project Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span 
          onClick={() => setCurrentView('sites')}
          style={{ 
            fontSize: '13px', 
            fontWeight: '600', 
            color: '#64748b', 
            cursor: 'pointer',
            transition: 'color 0.15s ease'
          }}
        >
          {org?.name || 'Omkar Infra'}
        </span>

        <span style={{ color: '#cbd5e1', fontSize: '13px' }}>/</span>

        {isProjectScoped && activeProject && (
          <>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowProjectSwitcher(!showProjectSwitcher)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#1e293b',
                  cursor: 'pointer'
                }}
              >
                <Building2 size={14} style={{ color: '#2563eb' }} />
                <span>{activeProject.name}</span>
                <ChevronDown size={13} style={{ color: '#94a3b8' }} />
              </button>

              {showProjectSwitcher && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '6px',
                  background: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  width: '260px',
                  zIndex: 100,
                  padding: '6px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', padding: '6px 8px', textTransform: 'uppercase' }}>
                    Select Active Site
                  </div>
                  {projects.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        selectProject(p.id);
                        setShowProjectSwitcher(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        background: p.id === activeProject.id ? '#eff6ff' : 'transparent',
                        color: p.id === activeProject.id ? '#2563eb' : '#334155'
                      }}
                    >
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.name}
                      </div>
                      {p.id === activeProject.id && <Check size={14} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span style={{ color: '#cbd5e1', fontSize: '13px' }}>/</span>
          </>
        )}

        <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a' }}>
          {getViewTitle()}
        </span>
      </div>

      {/* Right Controls: Quick Add, Reset/Demo Toggle, User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Quick Add Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowQuickAddMenu(!showQuickAddMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: '#2563eb',
              color: '#ffffff',
              borderRadius: '6px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Plus size={15} />
            <span>+ New</span>
            <ChevronDown size={13} />
          </button>

          {showQuickAddMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '6px',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              width: '200px',
              zIndex: 100,
              padding: '6px'
            }}>
              <div
                onClick={() => {
                  setShowQuickAddMenu(false);
                  onOpenNewModal?.('project');
                }}
                style={{ padding: '8px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer', borderRadius: '6px' }}
              >
                + Add New Site
              </div>
              <div
                onClick={() => {
                  setShowQuickAddMenu(false);
                  onOpenNewModal?.('task');
                }}
                style={{ padding: '8px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer', borderRadius: '6px' }}
              >
                + Add Task
              </div>
              <div
                onClick={() => {
                  setShowQuickAddMenu(false);
                  onOpenNewModal?.('issue');
                }}
                style={{ padding: '8px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer', borderRadius: '6px' }}
              >
                + Log Issue / Snag
              </div>
              <div
                onClick={() => {
                  setShowQuickAddMenu(false);
                  onOpenNewModal?.('material');
                }}
                style={{ padding: '8px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer', borderRadius: '6px' }}
              >
                + Receive Material
              </div>
              <div
                onClick={() => {
                  setShowQuickAddMenu(false);
                  onOpenNewModal?.('labour');
                }}
                style={{ padding: '8px 12px', fontSize: '13px', color: '#334155', cursor: 'pointer', borderRadius: '6px' }}
              >
                + Add Worker
              </div>
            </div>
          )}
        </div>

        {/* User Profile Button */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid transparent',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#e0e7ff',
              color: '#3730a3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '13px'
            }}>
              {user?.name ? user.name.charAt(0) : 'O'}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#0f172a' }}>
                {user?.name || 'Omkar Patil'}
              </span>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                {user?.role || 'Contractor'}
              </span>
            </div>
            <ChevronDown size={13} style={{ color: '#94a3b8' }} />
          </div>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '6px',
              background: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 10px 20px -3px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              width: '240px',
              zIndex: 100,
              padding: '8px'
            }}>
              <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{user?.name || 'Omkar Patil'}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{user?.email || 'omkar@omkarinfra.com'}</div>
              </div>

              {onBackToLanding && (
                <div
                  onClick={() => {
                    setShowUserMenu(false);
                    onBackToLanding();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '12.5px',
                    color: '#334155',
                    cursor: 'pointer',
                    borderRadius: '6px'
                  }}
                >
                  <ExternalLink size={14} />
                  <span>Public Landing Page</span>
                </div>
              )}

              <div
                onClick={() => {
                  setShowUserMenu(false);
                  if (window.confirm('Reset all demo data and start with an empty clean workspace?')) {
                    resetToCleanWorkspace();
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  fontSize: '12.5px',
                  color: '#d97706',
                  cursor: 'pointer',
                  borderRadius: '6px'
                }}
              >
                <RefreshCw size={14} />
                <span>Reset to Clean / Empty State</span>
              </div>

              <div
                onClick={() => {
                  setShowUserMenu(false);
                  signOut();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px',
                  fontSize: '12.5px',
                  color: '#dc2626',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  borderTop: '1px solid #f1f5f9',
                  marginTop: '4px'
                }}
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
