import React, { useState } from 'react';
import { 
  Building2, Users, IndianRupee, AlertTriangle, Clock, CheckCircle2, 
  ArrowRight, Plus, ExternalLink, ShieldAlert, Sparkles, Filter, ChevronRight, X
} from 'lucide-react';
import { 
  SMALL_CONTRACTOR_PROJECTS, EARLY_WARNING_ALERTS, 
  PENDING_MATERIAL_REQUESTS, USER_PERSONAS 
} from '../../data/mockData';

export function SmallContractorDashboard({ onNavigateToSection, onOpenAgent, activePersona = USER_PERSONAS[0] }) {
  const [materialRequests, setMaterialRequests] = useState(PENDING_MATERIAL_REQUESTS);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);
  const [approvedNotification, setApprovedNotification] = useState(null);

  const handleApproveRequest = (reqId) => {
    const req = materialRequests.find(r => r.id === reqId);
    setMaterialRequests(prev => prev.filter(r => r.id !== reqId));
    setApprovedNotification(`Approved request #${reqId} (${req.materialName} - ${req.requestedQty}). PO dispatched to supplier.`);
    setTimeout(() => setApprovedNotification(null), 4000);
  };

  const handleRejectRequest = (reqId) => {
    setMaterialRequests(prev => prev.filter(r => r.id !== reqId));
    setApprovedNotification(`Request #${reqId} rejected. Supervisor notified.`);
    setTimeout(() => setApprovedNotification(null), 4000);
  };

  return (
    <div className="agent-container">
      {/* Top Header Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ 
              background: '#ecfdf5', 
              color: '#065f46', 
              border: '1px solid #a7f3d0', 
              padding: '3px 10px', 
              borderRadius: 20, 
              fontSize: 12, 
              fontWeight: 700 
            }}>
              Contractor Command Center
            </span>
            <span style={{ fontSize: 13, color: '#64748b' }}>
              • Logged in as <strong>{activePersona.name}</strong>
            </span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a' }}>
            Multi-Site Review & Decision Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 750, marginTop: 4 }}>
            Site Supervisors report shortages, daily stock usage & site progress. Review pending site material requests, evaluate budget impact, and make approval decisions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            onClick={() => onNavigateToSection('materials_stock')}
            style={{ 
              background: '#ffffff', 
              color: '#0f766e', 
              border: '1px solid #cbd5e1', 
              padding: '9px 16px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              cursor: 'pointer' 
            }}
          >
            All Site Materials (4)
          </button>
          <button 
            onClick={() => onNavigateToSection('client_room')}
            style={{ 
              background: '#0f766e', 
              color: '#ffffff', 
              border: 'none', 
              padding: '9px 18px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              cursor: 'pointer' 
            }}
          >
            <Plus size={15} />
            <span>+ Change Order</span>
          </button>
        </div>
      </div>

      {approvedNotification && (
        <div style={{ 
          background: '#ecfdf5', 
          border: '1px solid #10b981', 
          borderRadius: 8, 
          padding: '12px 16px', 
          marginBottom: 20, 
          color: '#065f46', 
          fontSize: 13.5, 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} style={{ color: '#10b981' }} />
            <span>{approvedNotification}</span>
          </div>
          <button onClick={() => setApprovedNotification(null)} style={{ color: '#065f46', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* 6-Metric Contractor KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="agent-metric-card" style={{ cursor: 'pointer' }} onClick={() => onNavigateToSection('projects_list')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f766e' }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>ACTIVE SITES</span>
            <Building2 size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '8px 0 2px' }}>2</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>3 Work Zones</div>
        </div>

        <div className="agent-metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>TOTAL BUDGET</span>
            <IndianRupee size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '8px 0 2px' }}>₹57.5L</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Contractor Cap</div>
        </div>

        <div className="agent-metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>COST SPENT</span>
            <span style={{ fontSize: 12 }}>📈</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', margin: '8px 0 2px' }}>₹35.35L</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Stock + Wages</div>
        </div>

        <div className="agent-metric-card" style={{ background: '#fff1f2', borderColor: '#fecdd3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e11d48' }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>PROJECTED OVERRUN</span>
            <AlertTriangle size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#e11d48', margin: '8px 0 2px' }}>+₹2.85L</div>
          <div style={{ fontSize: 11, color: '#be123c', fontWeight: 600 }}>● Warning: Over Budget</div>
        </div>

        <div className="agent-metric-card" style={{ cursor: 'pointer' }} onClick={() => onNavigateToSection('labour_wages')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>WORKERS ON-SITE</span>
            <Users size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '8px 0 2px' }}>18</div>
          <div style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>Present Today</div>
        </div>

        <div className="agent-metric-card" style={{ cursor: 'pointer', background: materialRequests.length > 0 ? '#fffbeb' : '#fff', borderColor: materialRequests.length > 0 ? '#fde68a' : '#e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b45309' }}>
            <span style={{ fontSize: 11, fontWeight: 700 }}>PENDING REQUESTS</span>
            <span style={{ fontSize: 12 }}>📦</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#b45309', margin: '8px 0 2px' }}>{materialRequests.length}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Site Requirements</div>
        </div>
      </div>

      {/* Live Early Warning & Delay Risk Alerts */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={18} style={{ color: '#e11d48' }} />
            <strong style={{ fontSize: 15, color: '#0f172a' }}>Live Early Warning & Delay Risk Alerts</strong>
            <span style={{ fontSize: 11, background: '#ffe4e6', color: '#e11d48', padding: '1px 8px', borderRadius: 10, fontWeight: 700 }}>
              {EARLY_WARNING_ALERTS.length - dismissedAlerts.length} Active
            </span>
          </div>
          <span 
            onClick={() => onNavigateToSection('cost_overruns')}
            style={{ fontSize: 13, color: '#0f766e', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            Full Cost Analysis →
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {EARLY_WARNING_ALERTS.filter(a => !dismissedAlerts.includes(a.id)).map((alert) => (
            <div 
              key={alert.id}
              style={{ 
                background: '#fff1f2', 
                border: '1px solid #fecdd3', 
                borderRadius: 8, 
                padding: '16px',
                display: 'flex',
                gap: 14
              }}
            >
              <div style={{ 
                width: 36, 
                height: 36, 
                borderRadius: 6, 
                background: '#ffe4e6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#e11d48',
                flexShrink: 0
              }}>
                <ShieldAlert size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: 14, color: '#9f1239' }}>{alert.title}</strong>
                  <span style={{ fontSize: 11, color: '#9f1239' }}>{alert.date}</span>
                </div>
                <p style={{ fontSize: 12.5, color: '#881337', marginTop: 4, lineHeight: 1.5 }}>
                  {alert.description}
                </p>
                <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                  <button 
                    onClick={() => onNavigateToSection(alert.actionTarget)}
                    style={{ 
                      fontSize: 12, 
                      fontWeight: 700, 
                      background: '#e11d48', 
                      color: '#ffffff', 
                      padding: '5px 12px', 
                      borderRadius: 4, 
                      border: 'none',
                      cursor: 'pointer' 
                    }}
                  >
                    {alert.actionLabel}
                  </button>
                  <button 
                    onClick={() => setDismissedAlerts(prev => [...prev, alert.id])}
                    style={{ 
                      fontSize: 12, 
                      color: '#9f1239', 
                      background: 'transparent', 
                      border: 'none', 
                      cursor: 'pointer' 
                    }}
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Projects & Sites (Left) + Pending Material Requests (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        
        {/* Left Column: Active Projects & Sites */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>Projects & Site Locations</strong>
            <span 
              onClick={() => onNavigateToSection('projects_list')}
              style={{ fontSize: 12.5, color: '#0f766e', fontWeight: 700, cursor: 'pointer' }}
            >
              Manage Sites (3) ↗
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SMALL_CONTRACTOR_PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                style={{ 
                  background: '#ffffff', 
                  borderRadius: 10, 
                  border: '1px solid #e2e8f0', 
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                      <span style={{ fontSize: 11, background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                        {proj.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                      Client: <strong>{proj.clientName}</strong> ({proj.clientPhone}) • {proj.address}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Budget vs Projected</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>
                      ₹{(proj.contractBudget / 100000).toFixed(2)}L{' '}
                      <span style={{ color: '#e11d48', fontSize: 12 }}>(+₹{(proj.costOverrun / 100000).toFixed(2)}L Over)</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar + Timeline metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 14, alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: 8, marginBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                      <span style={{ color: '#64748b' }}>Overall Site Progress</span>
                      <strong style={{ color: '#0f766e' }}>{proj.progressPercentage}%</strong>
                    </div>
                    <div style={{ width: '100%', height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${proj.progressPercentage}%`, height: '100%', background: '#0f766e', borderRadius: 3 }}></div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Timeline Elapsed</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{proj.daysElapsed} Days</div>
                    <div style={{ fontSize: 10.5, color: '#64748b' }}>({proj.daysRemaining} remaining)</div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#64748b' }}>Projected Delay</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#e11d48' }}>+{proj.projectedDelayDays} Days Delay</div>
                  </div>
                </div>

                {/* Sub-Sites List */}
                <div>
                  <div style={{ fontSize: 11.5, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
                    Active Work Zones ({proj.sites.length})
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: proj.sites.length > 1 ? '1fr 1fr' : '1fr', gap: 10 }}>
                    {proj.sites.map((site) => (
                      <div 
                        key={site.id}
                        style={{ 
                          background: '#f1f5f9', 
                          borderRadius: 6, 
                          padding: '10px 12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>{site.name}</div>
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                            Phase: <strong>{site.phase}</strong> • Supervisor: {site.supervisor} ({site.labourCount} Labour)
                          </div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#0f766e' }}>
                          {site.progress}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending Material Requests (Direct from Supervisors) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>Pending Material Requests</strong>
            <span style={{ fontSize: 11, background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
              {materialRequests.length} Awaiting Approval
            </span>
          </div>

          {materialRequests.length === 0 ? (
            <div style={{ 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: 10, 
              padding: '30px', 
              textAlign: 'center',
              color: '#64748b' 
            }}>
              <CheckCircle2 size={36} style={{ color: '#10b981', margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>All Requests Cleared!</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>No pending supervisor orders for materials today.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {materialRequests.map((req) => (
                <div 
                  key={req.id}
                  style={{ 
                    background: '#ffffff', 
                    borderRadius: 10, 
                    border: '1px solid #cbd5e1', 
                    padding: '18px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <span style={{ fontSize: 10, background: '#fee2e2', color: '#b91c1c', padding: '2px 6px', borderRadius: 3, fontWeight: 800 }}>
                        {req.priority}
                      </span>
                      <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginTop: 4 }}>
                        {req.materialName}
                      </h4>
                      <div style={{ fontSize: 11.5, color: '#64748b' }}>
                        Requested by: <strong>{req.requestedBy}</strong>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: '#64748b' }}>Req: {req.reqDate}</span>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: 6, fontSize: 12, color: '#334155', lineHeight: 1.5, marginBottom: 12 }}>
                    "{req.reason}"
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12, marginBottom: 14 }}>
                    <div>
                      <span style={{ color: '#64748b' }}>Current Site Stock:</span>
                      <strong style={{ color: '#e11d48', marginLeft: 4 }}>{req.currentSiteStock}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Requested Qty:</span>
                      <strong style={{ color: '#0f172a', marginLeft: 4 }}>{req.requestedQty}</strong>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ color: '#64748b' }}>Estimated Cost Impact:</span>
                      <strong style={{ color: '#0f766e', marginLeft: 4 }}>₹{req.estCostImpact.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button 
                      onClick={() => handleApproveRequest(req.id)}
                      style={{ 
                        flex: 1, 
                        background: '#0f766e', 
                        color: '#ffffff', 
                        border: 'none', 
                        padding: '9px 12px', 
                        borderRadius: 6, 
                        fontSize: 12.5, 
                        fontWeight: 700,
                        cursor: 'pointer' 
                      }}
                    >
                      Approve & Dispatch PO
                    </button>
                    <button 
                      onClick={() => handleRejectRequest(req.id)}
                      style={{ 
                        background: '#f1f5f9', 
                        color: '#475569', 
                        border: '1px solid #cbd5e1', 
                        padding: '9px 12px', 
                        borderRadius: 6, 
                        fontSize: 12.5, 
                        fontWeight: 600,
                        cursor: 'pointer' 
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Connect with 5 AI Agents Banner */}
          <div style={{ 
            marginTop: 20, 
            background: 'linear-gradient(135deg, #071530 0%, #0f766e 100%)', 
            borderRadius: 10, 
            padding: '16px', 
            color: '#fff' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Sparkles size={16} style={{ color: '#38bdf8' }} />
              <strong style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Small Contractor AI Workforce
              </strong>
            </div>
            <p style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.5, marginBottom: 12 }}>
              Have our AI evaluate local vendors for this cement requisition to save ₹14,000 on market price.
            </p>
            <button 
              onClick={() => onOpenAgent('procurement')}
              style={{ 
                background: '#ffffff', 
                color: '#071530', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: 4, 
                fontSize: 12, 
                fontWeight: 700,
                cursor: 'pointer' 
              }}
            >
              Open Procurement AI Matrix →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
