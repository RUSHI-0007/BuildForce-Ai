import React, { useState } from 'react';
import { 
  Building2, LayoutDashboard, FileSpreadsheet, Activity, 
  CalendarClock, ShoppingBag, BadgeIndianRupee, CheckSquare, 
  AlertTriangle, Truck, Users, CreditCard, Settings, ChevronDown, 
  Sparkles, ExternalLink, ArrowLeft, Menu, FileText, ChevronRight,
  TrendingDown, MessageSquare, ShieldAlert, Sliders, UserCheck, CheckCircle2, User
} from 'lucide-react';
import { PROJECTS_DATA, AI_AGENTS, USER_PERSONAS } from '../../data/mockData';
import { ProjectsListingView } from './ProjectsListingView';
import { ProjectDashboardOverview } from './ProjectDashboardOverview';
import { AgentEstimation } from './AgentEstimation';
import { AgentProjectManager } from './AgentProjectManager';
import { AgentPlanningSchedule } from './AgentPlanningSchedule';
import { AgentProcurement } from './AgentProcurement';
import { AgentCreditCashflow } from './AgentCreditCashflow';

// Small Contractor Modules (from KritiSphere)
import { SmallContractorDashboard } from './SmallContractorDashboard';
import { MaterialsStockRequisition } from './MaterialsStockRequisition';
import { LabourWagesTracker } from './LabourWagesTracker';
import { CostOverrunEngine } from './CostOverrunEngine';
import { CashflowRunwayPlanner } from './CashflowRunwayPlanner';
import { ContractsStagePayments } from './ContractsStagePayments';
import { ClientRoomStream } from './ClientRoomStream';

export function PortalLayout({ onBackToLanding, initialAgent = null }) {
  // Navigation state defaults to 'small_contractor_dashboard' for small contractor focus
  const [currentSection, setCurrentSection] = useState(initialAgent ? 'agent_view' : 'small_contractor_dashboard');
  const [activeProject, setActiveProject] = useState(PROJECTS_DATA[0]);
  const [activeAgentId, setActiveAgentId] = useState(initialAgent || 'estimation');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [activePersona, setActivePersona] = useState(USER_PERSONAS[0]); // Omkar (Contractor)
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);

  // When clicking a project card in the directory
  const handleSelectProject = (project) => {
    setActiveProject(project);
    setCurrentSection('project_dashboard');
  };

  // Launching an agent directly
  const handleLaunchAgent = (agentId, project = null) => {
    if (project) setActiveProject(project);
    setActiveAgentId(agentId);
    setCurrentSection('agent_view');
  };

  return (
    <div className="portal-wrapper">
      {/* BuildForce Portal Sidebar */}
      <aside 
        className="portal-sidebar" 
        style={{ 
          width: sidebarCollapsed ? 70 : 255, 
          background: '#07142d', 
          color: '#cbd5e1', 
          borderRight: '1px solid #152747',
          transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Sidebar Org Header */}
        <div style={{ 
          padding: '16px', 
          borderBottom: '1px solid #152747',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div 
            onClick={() => setShowOrgDropdown(!showOrgDropdown)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10, 
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            {/* Emerald logo mark for small contractor command center */}
            <div style={{ 
              width: 32, 
              height: 32, 
              borderRadius: 6, 
              background: '#0f766e', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <Building2 size={18} />
            </div>

            {!sidebarCollapsed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#ffffff', display: 'block' }}>
                    Omkar Infra
                  </span>
                  <span style={{ fontSize: 10, color: '#34d399', fontWeight: 700 }}>
                    SMALL BUILDER SUITE
                  </span>
                </div>
                <ChevronDown size={14} style={{ color: '#94a3b8' }} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          
          {/* SECTION: DAILY OPERATIONS (Small Contractor Focus) */}
          {!sidebarCollapsed && (
            <div className="portal-nav-section-title" style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: 0.5 }}>
              <span>DAILY SITE OPERATIONS</span>
            </div>
          )}

          {/* 1. Multi-Site Dashboard */}
          <div 
            className={`portal-nav-item ${currentSection === 'small_contractor_dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentSection('small_contractor_dashboard')}
            style={{ 
              color: currentSection === 'small_contractor_dashboard' ? '#fff' : '#cbd5e1',
              background: currentSection === 'small_contractor_dashboard' ? '#0f766e' : 'transparent',
              borderLeftColor: currentSection === 'small_contractor_dashboard' ? '#34d399' : 'transparent'
            }}
          >
            <LayoutDashboard size={16} style={{ color: '#34d399' }} />
            {!sidebarCollapsed && <span>Site Command Center</span>}
          </div>

          {/* 2. Materials Stock & Requisition */}
          <div 
            className={`portal-nav-item ${currentSection === 'materials_stock' ? 'active' : ''}`}
            onClick={() => setCurrentSection('materials_stock')}
            style={{ 
              color: currentSection === 'materials_stock' ? '#fff' : '#cbd5e1',
              background: currentSection === 'materials_stock' ? '#0f766e' : 'transparent',
              borderLeftColor: currentSection === 'materials_stock' ? '#34d399' : 'transparent'
            }}
          >
            <Truck size={16} style={{ color: '#fb923c' }} />
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Materials & Stock</span>
                <span style={{ fontSize: 10, background: '#f59e0b', color: '#fff', padding: '1px 5px', borderRadius: 10, fontWeight: 800 }}>1</span>
              </div>
            )}
          </div>

          {/* 3. Labour & Daily Wages */}
          <div 
            className={`portal-nav-item ${currentSection === 'labour_wages' ? 'active' : ''}`}
            onClick={() => setCurrentSection('labour_wages')}
            style={{ 
              color: currentSection === 'labour_wages' ? '#fff' : '#cbd5e1',
              background: currentSection === 'labour_wages' ? '#0f766e' : 'transparent',
              borderLeftColor: currentSection === 'labour_wages' ? '#34d399' : 'transparent'
            }}
          >
            <Users size={16} style={{ color: '#60a5fa' }} />
            {!sidebarCollapsed && <span>Labour & Daily Wages</span>}
          </div>

          {/* 4. Cost Overruns */}
          <div 
            className={`portal-nav-item ${currentSection === 'cost_overruns' ? 'active' : ''}`}
            onClick={() => setCurrentSection('cost_overruns')}
            style={{ 
              color: currentSection === 'cost_overruns' ? '#fff' : '#cbd5e1',
              background: currentSection === 'cost_overruns' ? '#0f766e' : 'transparent',
              borderLeftColor: currentSection === 'cost_overruns' ? '#34d399' : 'transparent'
            }}
          >
            <TrendingDown size={16} style={{ color: '#f87171' }} />
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Cost Overruns</span>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444' }}></span>
              </div>
            )}
          </div>

          {/* 5. Cash-Flow Planner */}
          <div 
            className={`portal-nav-item ${currentSection === 'cash_plan' ? 'active' : ''}`}
            onClick={() => setCurrentSection('cash_plan')}
            style={{ 
              color: currentSection === 'cash_plan' ? '#fff' : '#cbd5e1',
              background: currentSection === 'cash_plan' ? '#0f766e' : 'transparent',
              borderLeftColor: currentSection === 'cash_plan' ? '#34d399' : 'transparent'
            }}
          >
            <Sliders size={16} style={{ color: '#38bdf8' }} />
            {!sidebarCollapsed && <span>12-Week Cash Runway</span>}
          </div>

          {/* 6. Contracts & Milestones */}
          <div 
            className={`portal-nav-item ${currentSection === 'contracts_milestones' ? 'active' : ''}`}
            onClick={() => setCurrentSection('contracts_milestones')}
            style={{ 
              color: currentSection === 'contracts_milestones' ? '#fff' : '#cbd5e1',
              background: currentSection === 'contracts_milestones' ? '#0f766e' : 'transparent',
              borderLeftColor: currentSection === 'contracts_milestones' ? '#34d399' : 'transparent'
            }}
          >
            <FileText size={16} style={{ color: '#a78bfa' }} />
            {!sidebarCollapsed && <span>Contracts & Stage Pay</span>}
          </div>

          {/* 7. Client Room (WhatsApp Stream) */}
          <div 
            className={`portal-nav-item ${currentSection === 'client_room' ? 'active' : ''}`}
            onClick={() => setCurrentSection('client_room')}
            style={{ 
              color: currentSection === 'client_room' ? '#fff' : '#cbd5e1',
              background: currentSection === 'client_room' ? '#0f766e' : 'transparent',
              borderLeftColor: currentSection === 'client_room' ? '#34d399' : 'transparent'
            }}
          >
            <MessageSquare size={16} style={{ color: '#34d399' }} />
            {!sidebarCollapsed && <span>Client Room (WhatsApp)</span>}
          </div>

          {/* SECTION: 5 AI AGENTS WORKFORCE */}
          {!sidebarCollapsed && (
            <div className="portal-nav-section-title" style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 4, marginTop: 14 }}>
              <Sparkles size={11} style={{ color: '#eb4d4b' }} />
              <span>5 AI Workforce Agents</span>
            </div>
          )}

          {/* Agent 1 */}
          <div 
            className={`portal-nav-item ${currentSection === 'agent_view' && activeAgentId === 'estimation' ? 'active' : ''}`}
            onClick={() => handleLaunchAgent('estimation')}
            style={{ 
              color: currentSection === 'agent_view' && activeAgentId === 'estimation' ? '#fff' : '#cbd5e1',
              background: currentSection === 'agent_view' && activeAgentId === 'estimation' ? '#1e3a8a' : 'transparent'
            }}
          >
            <FileSpreadsheet size={16} style={{ color: '#60a5fa' }} />
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Residential Takeoff AI</span>
                <span style={{ fontSize: 10, background: '#2563eb', padding: '1px 5px', borderRadius: 3 }}>01</span>
              </div>
            )}
          </div>

          {/* Agent 2 */}
          <div 
            className={`portal-nav-item ${currentSection === 'agent_view' && activeAgentId === 'project_manager' ? 'active' : ''}`}
            onClick={() => handleLaunchAgent('project_manager')}
            style={{ 
              color: currentSection === 'agent_view' && activeAgentId === 'project_manager' ? '#fff' : '#cbd5e1',
              background: currentSection === 'agent_view' && activeAgentId === 'project_manager' ? '#065f46' : 'transparent'
            }}
          >
            <Activity size={16} style={{ color: '#34d399' }} />
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Site Quality & Snags AI</span>
                <span style={{ fontSize: 10, background: '#059669', padding: '1px 5px', borderRadius: 3 }}>02</span>
              </div>
            )}
          </div>

          {/* Agent 3 */}
          <div 
            className={`portal-nav-item ${currentSection === 'agent_view' && activeAgentId === 'planning_schedule' ? 'active' : ''}`}
            onClick={() => handleLaunchAgent('planning_schedule')}
            style={{ 
              color: currentSection === 'agent_view' && activeAgentId === 'planning_schedule' ? '#fff' : '#cbd5e1',
              background: currentSection === 'agent_view' && activeAgentId === 'planning_schedule' ? '#5b21b6' : 'transparent'
            }}
          >
            <CalendarClock size={16} style={{ color: '#a78bfa' }} />
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Milestone Schedule AI</span>
                <span style={{ fontSize: 10, background: '#7c3aed', padding: '1px 5px', borderRadius: 3 }}>03</span>
              </div>
            )}
          </div>

          {/* Agent 4 */}
          <div 
            className={`portal-nav-item ${currentSection === 'agent_view' && activeAgentId === 'procurement' ? 'active' : ''}`}
            onClick={() => handleLaunchAgent('procurement')}
            style={{ 
              color: currentSection === 'agent_view' && activeAgentId === 'procurement' ? '#fff' : '#cbd5e1',
              background: currentSection === 'agent_view' && activeAgentId === 'procurement' ? '#9a3412' : 'transparent'
            }}
          >
            <ShoppingBag size={16} style={{ color: '#fb923c' }} />
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Local Vendor RFQ AI</span>
                <span style={{ fontSize: 10, background: '#ea580c', padding: '1px 5px', borderRadius: 3 }}>04</span>
              </div>
            )}
          </div>

          {/* Agent 5 */}
          <div 
            className={`portal-nav-item ${currentSection === 'agent_view' && activeAgentId === 'credit_cashflow' ? 'active' : ''}`}
            onClick={() => handleLaunchAgent('credit_cashflow')}
            style={{ 
              color: currentSection === 'agent_view' && activeAgentId === 'credit_cashflow' ? '#fff' : '#cbd5e1',
              background: currentSection === 'agent_view' && activeAgentId === 'credit_cashflow' ? '#0369a1' : 'transparent'
            }}
          >
            <BadgeIndianRupee size={16} style={{ color: '#38bdf8' }} />
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span>Contractor Credit AI</span>
                <span style={{ fontSize: 10, background: '#0284c7', padding: '1px 5px', borderRadius: 3 }}>05</span>
              </div>
            )}
          </div>

          {/* SECTION: ORIGINAL DIRECTORY & DASHBOARD */}
          {!sidebarCollapsed && (
            <div className="portal-nav-section-title" style={{ color: '#64748b', marginTop: 14 }}>
              PROJECT PORTFOLIO
            </div>
          )}
          <div 
            className={`portal-nav-item ${currentSection === 'projects_list' ? 'active' : ''}`}
            onClick={() => setCurrentSection('projects_list')}
            style={{ color: '#94a3b8' }}
          >
            <Building2 size={16} />
            {!sidebarCollapsed && <span>All Sites Directory</span>}
          </div>
          <div 
            className={`portal-nav-item ${currentSection === 'project_dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentSection('project_dashboard')}
            style={{ color: '#94a3b8' }}
          >
            <LayoutDashboard size={16} />
            {!sidebarCollapsed && <span>Single Project Dashboard</span>}
          </div>
        </div>

        {/* Sidebar Footer with Persona Switcher (Contractor vs Supervisor) */}
        <div style={{ 
          padding: '12px 14px', 
          borderTop: '1px solid #152747',
          background: '#040d1e'
        }}>
          {!sidebarCollapsed && (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.06)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img 
                    src={activePersona.avatar} 
                    alt={activePersona.name} 
                    style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#ffffff' }}>
                      {activePersona.name}
                    </div>
                    <div style={{ fontSize: 10, color: '#34d399' }}>
                      {activePersona.role}
                    </div>
                  </div>
                </div>
                <ChevronDown size={14} style={{ color: '#94a3b8' }} />
              </div>

              {/* Persona Switch Menu */}
              {showPersonaMenu && (
                <div style={{ 
                  position: 'absolute', 
                  bottom: '100%', 
                  left: 0, 
                  width: '100%', 
                  background: '#0b1c3e', 
                  border: '1px solid #1e3a8a', 
                  borderRadius: 8, 
                  padding: 6,
                  marginBottom: 6,
                  boxShadow: '0 -4px 12px rgba(0,0,0,0.3)',
                  zIndex: 20
                }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', padding: '4px 8px', fontWeight: 700 }}>
                    SWITCH ROLE (PIN-FREE DEMO):
                  </div>
                  {USER_PERSONAS.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setActivePersona(p);
                        setShowPersonaMenu(false);
                      }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        padding: '6px 8px', 
                        borderRadius: 4, 
                        cursor: 'pointer',
                        background: activePersona.id === p.id ? 'rgba(15,118,110,0.3)' : 'transparent'
                      }}
                    >
                      <img src={p.avatar} alt={p.name} style={{ width: 22, height: 22, borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontSize: 11.5, color: '#fff', fontWeight: 600 }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>{p.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 11, color: '#64748b' }}>
              {!sidebarCollapsed && "BuildForce for Small Builders"}
            </span>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{ color: '#64748b', padding: 4, background: 'transparent', border: 'none', cursor: 'pointer' }}
              title="Collapse Sidebar"
            >
              {sidebarCollapsed ? '»' : '«'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Portal Viewport */}
      <div className="portal-main">
        {/* Top Header Bar */}
        <header className="portal-topbar" style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
          <div className="portal-topbar-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#0f766e', fontWeight: 800, cursor: 'pointer' }} onClick={() => setCurrentSection('small_contractor_dashboard')}>
              Omkar Infra & Builders
            </span>
            <span style={{ color: '#cbd5e1' }}>/</span>

            {/* Quick Active Site Switcher Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowSiteDropdown(!showSiteDropdown)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                <Building2 size={13} style={{ color: '#0f766e' }} />
                <span>{activeProject.name}</span>
                <ChevronDown size={13} style={{ color: '#64748b' }} />
              </button>

              {showSiteDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: 4,
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  zIndex: 50,
                  minWidth: 280,
                  padding: 6
                }}>
                  <div style={{ fontSize: 10, color: '#64748b', fontWeight: 800, padding: '4px 8px', letterSpacing: 0.5 }}>
                    SWITCH ACTIVE SITE (1 TO 10):
                  </div>
                  {PROJECTS_DATA.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setActiveProject(p);
                        setShowSiteDropdown(false);
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        background: activeProject.id === p.id ? '#ecfdf5' : 'transparent',
                        borderLeft: activeProject.id === p.id ? '3px solid #0f766e' : '3px solid transparent'
                      }}
                    >
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: '#64748b', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <span>{p.type}</span>
                        <strong style={{ color: '#0f766e' }}>{p.budget}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ color: '#64748b', fontSize: 12.5, fontWeight: 600 }}>
              {currentSection === 'small_contractor_dashboard' && 'Site Command Center'}
              {currentSection === 'materials_stock' && 'Materials & Stock Requisition'}
              {currentSection === 'labour_wages' && 'Labour Roster & Daily Wages'}
              {currentSection === 'cost_overruns' && 'Cost Overrun & Delay Engine'}
              {currentSection === 'cash_plan' && '12-Week Cashflow Runway'}
              {currentSection === 'contracts_milestones' && 'Contracts & Stage Payments'}
              {currentSection === 'client_room' && 'Client Room (WhatsApp Stream)'}
              {currentSection === 'projects_list' && 'All Sites Directory'}
              {currentSection === 'project_dashboard' && `Project ${activeProject.name}`}
              {currentSection === 'agent_view' && `AI Agent: ${activeAgentId.replace('_', ' ').toUpperCase()}`}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Active sites badge */}
            <div style={{ 
              background: '#ecfdf5', 
              color: '#065f46', 
              fontSize: 12, 
              fontWeight: 700, 
              padding: '4px 10px', 
              borderRadius: 4,
              border: '1px solid #a7f3d0'
            }}>
              ● 2 Sites Live (18 Labour)
            </div>

            {/* User Profile Avatar */}
            <div style={{ 
              width: 32, 
              height: 32, 
              borderRadius: 6, 
              background: '#0f766e', 
              color: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 700, 
              fontSize: 13 
            }}>
              {activePersona.name.charAt(0)}
            </div>

            {/* Button to Switch back to Public Landing Site */}
            <button 
              onClick={onBackToLanding}
              style={{ 
                background: '#f1f5f9', 
                color: '#334155', 
                border: '1px solid #cbd5e1',
                padding: '6px 12px', 
                borderRadius: 4, 
                fontSize: 12, 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              <ExternalLink size={12} />
              <span>Public Overview</span>
            </button>
          </div>
        </header>

        {/* Dedicated Supervisor Field Mode Banner */}
        {activePersona.role === 'Site Supervisor' && (
          <div style={{
            background: 'linear-gradient(90deg, #0f766e 0%, #115e59 100%)',
            color: '#ffffff',
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #134e4a',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>👷</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>
                  Field Mode: Logged in as {activePersona.name} ({activePersona.assignedSite || 'Kothrud Site A1'})
                </div>
                <div style={{ fontSize: 11, color: '#a7f3d0' }}>
                  Simplified site execution: Record daily haazri, submit cement/sand requisitions & sync site photos.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={() => setCurrentSection('labour_wages')} 
                style={{ background: '#ffffff', color: '#0f766e', border: 'none', padding: '6px 12px', borderRadius: 4, fontSize: 11.5, fontWeight: 800, cursor: 'pointer' }}
              >
                + Record Haazri
              </button>
              <button 
                onClick={() => setCurrentSection('materials_stock')} 
                style={{ background: '#34d399', color: '#064e3b', border: 'none', padding: '6px 12px', borderRadius: 4, fontSize: 11.5, fontWeight: 800, cursor: 'pointer' }}
              >
                + Request Material
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Content Views */}
        <div className="portal-content-scrollable">
          {/* Small Contractor Views */}
          {currentSection === 'small_contractor_dashboard' && (
            <SmallContractorDashboard 
              activePersona={activePersona}
              onNavigateToSection={(sec) => setCurrentSection(sec)}
              onOpenAgent={(agentId) => handleLaunchAgent(agentId)}
            />
          )}

          {currentSection === 'materials_stock' && (
            <MaterialsStockRequisition 
              activePersona={activePersona}
              activeProject={activeProject}
              onOpenAgent={(agentId) => handleLaunchAgent(agentId)}
            />
          )}

          {currentSection === 'labour_wages' && (
            <LabourWagesTracker 
              activePersona={activePersona}
              activeProject={activeProject}
              onOpenAgent={(agentId) => handleLaunchAgent(agentId)}
            />
          )}

          {currentSection === 'cost_overruns' && (
            <CostOverrunEngine 
              activeProject={activeProject}
              onOpenAgent={(agentId) => handleLaunchAgent(agentId)}
              onOpenClientRoom={() => setCurrentSection('client_room')}
            />
          )}

          {currentSection === 'cash_plan' && (
            <CashflowRunwayPlanner 
              activeProject={activeProject}
              onOpenAgent={(agentId) => handleLaunchAgent(agentId)}
            />
          )}

          {currentSection === 'contracts_milestones' && (
            <ContractsStagePayments 
              activeProject={activeProject}
              onOpenClientRoom={() => setCurrentSection('client_room')}
            />
          )}

          {currentSection === 'client_room' && (
            <ClientRoomStream 
              activePersona={activePersona}
              activeProject={activeProject}
            />
          )}

          {/* Original Directory & Dashboard */}
          {currentSection === 'projects_list' && (
            <ProjectsListingView 
              onSelectProject={handleSelectProject}
              onLaunchAgentDirectly={handleLaunchAgent}
            />
          )}

          {currentSection === 'project_dashboard' && (
            <ProjectDashboardOverview 
              activeProject={activeProject}
              onSelectAgent={handleLaunchAgent}
            />
          )}

          {/* 5 AI Agents */}
          {currentSection === 'agent_view' && activeAgentId === 'estimation' && (
            <AgentEstimation activeProject={activeProject} />
          )}

          {currentSection === 'agent_view' && activeAgentId === 'project_manager' && (
            <AgentProjectManager 
              activeProject={activeProject}
              onReplanSchedule={() => handleLaunchAgent('planning_schedule')}
            />
          )}

          {currentSection === 'agent_view' && activeAgentId === 'planning_schedule' && (
            <AgentPlanningSchedule activeProject={activeProject} />
          )}

          {currentSection === 'agent_view' && activeAgentId === 'procurement' && (
            <AgentProcurement activeProject={activeProject} />
          )}

          {currentSection === 'agent_view' && activeAgentId === 'credit_cashflow' && (
            <AgentCreditCashflow activeProject={activeProject} />
          )}
        </div>
      </div>
    </div>
  );
}
