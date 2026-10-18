import React from 'react';
import { 
  ArrowLeft, LayoutDashboard, FileText, CheckSquare, 
  AlertTriangle, CreditCard, Folder, Settings, ChevronLeft, ChevronRight,
  MapPin, Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ProjectSidebar({ collapsed, onToggleCollapse }) {
  const { activeProject, currentView, setCurrentView } = useApp();

  const isNavActive = (view) => currentView === view;

  return (
    <aside 
      style={{
        width: collapsed ? '68px' : '260px',
        minWidth: collapsed ? '68px' : '260px',
        background: '#0b162c', // Deep focused navy
        color: '#c8d6f0',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1a2f5a',
        transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      {/* Back to all sites button */}
      <div 
        onClick={() => setCurrentView('sites')}
        style={{
          padding: '12px 14px',
          borderBottom: '1px solid #1c325e',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: '#93c5fd',
          fontSize: '12.5px',
          fontWeight: '600',
          transition: 'color 0.15s ease'
        }}
      >
        <ArrowLeft size={16} />
        {!collapsed && <span>Back to All Sites</span>}
      </div>

      {/* Project Banner / Title */}
      <div style={{
        padding: collapsed ? '14px 8px' : '14px 16px',
        borderBottom: '1px solid #1c325e',
        background: '#132347'
      }}>
        {!collapsed ? (
          <div>
            <div style={{
              fontSize: '14.5px',
              fontWeight: '700',
              color: '#ffffff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '4px'
            }}>
              {activeProject?.name || 'Current Site'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#94a3b8' }}>
              <span style={{
                background: '#10b98120',
                color: '#34d399',
                padding: '2px 7px',
                borderRadius: '4px',
                fontWeight: '700'
              }}>
                {activeProject?.status || 'Active'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={11} />
                {activeProject?.location?.split(',')[0] || 'Site'}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', fontWeight: '700', color: '#38bdf8', fontSize: '14px' }}>
            {activeProject?.name?.substring(0, 2).toUpperCase() || 'ST'}
          </div>
        )}
      </div>

      {/* Project Nav List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {/* Site Dashboard / Overview */}
        <div
          onClick={() => setCurrentView('site_dashboard')}
          title="Site Overview"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            fontWeight: isNavActive('site_dashboard') ? '600' : '500',
            color: isNavActive('site_dashboard') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('site_dashboard') ? '#1e3a6d' : 'transparent'
          }}
        >
          <LayoutDashboard size={18} style={{ color: isNavActive('site_dashboard') ? '#60a5fa' : '#94a3b8', flexShrink: 0 }} />
          {!collapsed && <span>Site Dashboard</span>}
        </div>

        {/* Reports */}
        <div
          onClick={() => setCurrentView('reports')}
          title="Reports"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('reports') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('reports') ? '#1e3a6d' : 'transparent'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />
            {!collapsed && <span>Reports</span>}
          </div>
          {!collapsed && (
            <span style={{ fontSize: '10px', background: '#dc2626', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontWeight: '700' }}>
              PDF
            </span>
          )}
        </div>

        {/* SECTION: PROGRESS & QUALITY */}
        {!collapsed && (
          <div style={{
            fontSize: '10.5px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            padding: '16px 12px 6px 12px',
            textTransform: 'uppercase'
          }}>
            Progress & Quality
          </div>
        )}

        <div
          onClick={() => setCurrentView('tasks')}
          title="Tasks"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('tasks') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('tasks') ? '#1e3a6d' : 'transparent'
          }}
        >
          <CheckSquare size={18} style={{ color: '#38bdf8', flexShrink: 0 }} />
          {!collapsed && <span>Tasks</span>}
        </div>

        <div
          onClick={() => setCurrentView('issues')}
          title="Issues & Snags"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('issues') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('issues') ? '#1e3a6d' : 'transparent'
          }}
        >
          <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
          {!collapsed && <span>Issues</span>}
        </div>

        {/* SECTION: FINANCIALS */}
        {!collapsed && (
          <div style={{
            fontSize: '10.5px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            padding: '16px 12px 6px 12px',
            textTransform: 'uppercase'
          }}>
            Financials
          </div>
        )}

        <div
          onClick={() => setCurrentView('payments')}
          title="Payments Received"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('payments') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('payments') ? '#1e3a6d' : 'transparent'
          }}
        >
          <CreditCard size={18} style={{ color: '#a855f7', flexShrink: 0 }} />
          {!collapsed && <span>Payments Received</span>}
        </div>

        {/* SECTION: OTHERS / FILES */}
        {!collapsed && (
          <div style={{
            fontSize: '10.5px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            padding: '16px 12px 6px 12px',
            textTransform: 'uppercase'
          }}>
            Others
          </div>
        )}

        <div
          onClick={() => setCurrentView('drive')}
          title="Drive / Documents"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('drive') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('drive') ? '#1e3a6d' : 'transparent'
          }}
        >
          <Folder size={18} style={{ color: '#38bdf8', flexShrink: 0 }} />
          {!collapsed && <span>Drive</span>}
        </div>
      </div>

      {/* Bottom Pinned */}
      <div style={{
        padding: '10px 8px',
        borderTop: '1px solid #1c325e',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div
          onClick={() => setCurrentView('settings')}
          title="Site Settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('settings') ? '#ffffff' : '#94a3b8',
            background: isNavActive('settings') ? '#1e3a6d' : 'transparent'
          }}
        >
          <Settings size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Site Settings</span>}
        </div>

        {/* Collapse toggle */}
        <div
          onClick={onToggleCollapse}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12.5px',
            color: '#64748b'
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse Sidebar</span>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
