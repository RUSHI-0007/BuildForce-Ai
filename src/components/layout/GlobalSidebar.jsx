import React, { useState } from 'react';
import { 
  Building2, LayoutDashboard, CheckSquare, AlertTriangle, Truck, Users, 
  CreditCard, Settings, ChevronDown, Sparkles, 
  FileText, BookOpen, BadgeIndianRupee, ChevronLeft, ChevronRight,
  Folder, MapPin, Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export function GlobalSidebar({ collapsed, onToggleCollapse, onBackToLanding }) {
  const { currentView, setCurrentView, activeProject, projects, selectProject, setActiveProjectId, issues } = useApp();
  const { org } = useAuth();

  const [showSiteDropdown, setShowSiteDropdown] = useState(false);

  const isNavActive = (view) => currentView === view;
  const openIssuesCount = issues.filter(i => (!activeProject || i.project_id === activeProject.id) && i.status === 'Open').length;

  return (
    <aside 
      style={{
        width: collapsed ? '68px' : '260px',
        minWidth: collapsed ? '68px' : '260px',
        background: '#0f1d3b', // Powerplay dark navy
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
      {/* Org / Firm Header */}
      <div style={{
        padding: collapsed ? '16px 8px' : '16px 14px',
        borderBottom: '1px solid #1c325e',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '800',
            fontSize: '16px',
            flexShrink: 0
          }}>
            {org?.name ? org.name.charAt(0) : 'O'}
          </div>

          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#ffffff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {org?.name || 'Omkar Infra & Builders'}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#60a5fa',
                fontWeight: '700',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Small Builder Suite
              </div>
            </div>
          )}
        </div>

        {/* Active Site Selector Quick-Pill */}
        {!collapsed && activeProject && (
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowSiteDropdown(!showSiteDropdown)}
              style={{
                background: '#132347',
                border: '1px solid #1e3a6d',
                borderRadius: '6px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                <MapPin size={12} style={{ color: '#38bdf8', flexShrink: 0 }} />
                <span style={{ color: '#e2e8f0', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {activeProject.name}
                </span>
              </div>
              <ChevronDown size={12} style={{ color: '#94a3b8' }} />
            </div>

            {showSiteDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                background: '#0b162c',
                border: '1px solid #1e3a6d',
                borderRadius: '8px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                zIndex: 100,
                padding: '4px'
              }}>
                <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '700', padding: '6px 8px', textTransform: 'uppercase' }}>
                  Switch Active Site
                </div>
                {projects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      selectProject(p.id);
                      setShowSiteDropdown(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      background: p.id === activeProject.id ? '#1e3a6d' : 'transparent',
                      color: p.id === activeProject.id ? '#ffffff' : '#94a3b8'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                    {p.id === activeProject.id && <Check size={12} style={{ color: '#38bdf8' }} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav List - Consistent, Stable, Never Hidden */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '10px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px'
      }}>
        {/* 1. Sites Directory */}
        <div
          onClick={() => setCurrentView('sites')}
          title="All Sites"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            fontWeight: isNavActive('sites') ? '600' : '500',
            color: isNavActive('sites') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('sites') ? '#1e3a6d' : 'transparent',
            transition: 'background 0.12s ease'
          }}
        >
          <Building2 size={18} style={{ color: isNavActive('sites') ? '#60a5fa' : '#94a3b8', flexShrink: 0 }} />
          {!collapsed && <span>Sites</span>}
        </div>

        {/* 2. Site Dashboard */}
        <div
          onClick={() => setCurrentView('site_dashboard')}
          title="Site Dashboard"
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

        {/* Section Label: PROGRESS & QUALITY */}
        {!collapsed && (
          <div style={{
            fontSize: '10px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            padding: '12px 12px 4px 12px',
            textTransform: 'uppercase'
          }}>
            Progress & Quality
          </div>
        )}

        {/* 3. Tasks */}
        <div
          onClick={() => setCurrentView('tasks')}
          title="Tasks & Schedule"
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
          {!collapsed && <span>Tasks & Schedule</span>}
        </div>

        {/* 4. Issues */}
        <div
          onClick={() => setCurrentView('issues')}
          title="Issues & Snags"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('issues') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('issues') ? '#1e3a6d' : 'transparent'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
            {!collapsed && <span>Issues & Snags</span>}
          </div>
          {!collapsed && openIssuesCount > 0 && (
            <span style={{ fontSize: '10.5px', background: '#dc2626', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontWeight: '700' }}>
              {openIssuesCount}
            </span>
          )}
        </div>

        {/* Section Label: MANAGE RESOURCES */}
        {!collapsed && (
          <div style={{
            fontSize: '10px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            padding: '12px 12px 4px 12px',
            textTransform: 'uppercase'
          }}>
            Manage Resources
          </div>
        )}

        {/* 5. Materials (ALWAYS VISIBLE) */}
        <div
          onClick={() => setCurrentView('materials')}
          title="Materials & Stock"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('materials') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('materials') ? '#1e3a6d' : 'transparent'
          }}
        >
          <Truck size={18} style={{ color: '#fb923c', flexShrink: 0 }} />
          {!collapsed && <span>Materials & Stock</span>}
        </div>

        {/* 6. Labour / Manpower (ALWAYS VISIBLE) */}
        <div
          onClick={() => setCurrentView('labour')}
          title="Labour & Daily Haazri"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('labour') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('labour') ? '#1e3a6d' : 'transparent'
          }}
        >
          <Users size={18} style={{ color: '#34d399', flexShrink: 0 }} />
          {!collapsed && <span>Labour & Daily Haazri</span>}
        </div>

        {/* Section Label: FINANCIALS & DOCS */}
        {!collapsed && (
          <div style={{
            fontSize: '10px',
            fontWeight: '700',
            color: '#64748b',
            letterSpacing: '0.06em',
            padding: '12px 12px 4px 12px',
            textTransform: 'uppercase'
          }}>
            Money & Documents
          </div>
        )}

        {/* 7. Cashflow Tracker */}
        <div
          onClick={() => setCurrentView('cashflow')}
          title="Cashflow & Runway"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('cashflow') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('cashflow') ? '#1e3a6d' : 'transparent'
          }}
        >
          <BadgeIndianRupee size={18} style={{ color: '#22c55e', flexShrink: 0 }} />
          {!collapsed && <span>Cashflow & Runway</span>}
        </div>

        {/* 8. Client Payments */}
        <div
          onClick={() => setCurrentView('payments')}
          title="Client Payments"
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
          {!collapsed && <span>Client Payments</span>}
        </div>

        {/* 9. Site Drive */}
        <div
          onClick={() => setCurrentView('drive')}
          title="Site Drive (Drawings)"
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
          {!collapsed && <span>Drive & Drawings</span>}
        </div>

        {/* 10. Reports & Extracts */}
        <div
          onClick={() => setCurrentView('reports')}
          title="Reports & Extracts"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            fontWeight: isNavActive('reports') ? '600' : '500',
            color: isNavActive('reports') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('reports') ? '#1e3a6d' : 'transparent'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />
            {!collapsed && <span>Reports & Extracts</span>}
          </div>
          {!collapsed && (
            <span style={{ fontSize: '10px', background: '#dc2626', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontWeight: '700' }}>
              PDF
            </span>
          )}
        </div>

        {/* 11. Rate Library */}
        <div
          onClick={() => setCurrentView('library')}
          title="Rate Library"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13.5px',
            color: isNavActive('library') ? '#ffffff' : '#cbd5e1',
            background: isNavActive('library') ? '#1e3a6d' : 'transparent'
          }}
        >
          <BookOpen size={18} style={{ color: '#94a3b8', flexShrink: 0 }} />
          {!collapsed && <span>Rate Library</span>}
        </div>

        {/* 12. DEDICATED AI TAB: 5 AI AGENTS (PROMINENT & ALWAYS ACCESSIBLE) */}
        <div
          onClick={() => setCurrentView('agents')}
          title="AI Agents Workforce"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13.5px',
            fontWeight: '700',
            marginTop: '6px',
            color: isNavActive('agents') ? '#ffffff' : '#fef08a',
            background: isNavActive('agents') ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'rgba(234, 179, 8, 0.12)',
            border: '1px solid',
            borderColor: isNavActive('agents') ? '#3b82f6' : 'rgba(234, 179, 8, 0.3)',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={18} style={{ color: '#fbbf24', flexShrink: 0 }} />
            {!collapsed && <span>AI Agents</span>}
          </div>
          {!collapsed && (
            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              padding: '2px 7px',
              borderRadius: '10px',
              background: '#f59e0b',
              color: '#000000',
              letterSpacing: '0.04em'
            }}>
              5 AGENTS
            </span>
          )}
        </div>
      </div>

      {/* Bottom Pinned Settings & Collapse */}
      <div style={{
        padding: '10px 8px',
        borderTop: '1px solid #1c325e',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div
          onClick={() => setCurrentView('settings')}
          title="Organisation Settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '9px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            color: isNavActive('settings') ? '#ffffff' : '#94a3b8',
            background: isNavActive('settings') ? '#1e3a6d' : 'transparent'
          }}
        >
          <Settings size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Settings</span>}
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
            fontSize: '12px',
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
