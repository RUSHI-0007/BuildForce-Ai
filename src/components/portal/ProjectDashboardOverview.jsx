import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Filter, ArrowUpRight, CheckCircle2, 
  Clock, AlertTriangle, ChevronRight, TrendingUp, Layers, UserCheck 
} from 'lucide-react';
import { AI_AGENTS } from '../../data/mockData';

export function ProjectDashboardOverview({ activeProject, onSelectAgent }) {
  const [activeTabUpdates, setActiveTabUpdates] = useState('tasks');
  const [taskFilter, setTaskFilter] = useState('Categories');
  const [compareWithPlanned, setCompareWithPlanned] = useState(true);

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>
            Project Dashboard
          </h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            {activeProject.name} • {activeProject.location} • Stage: <strong>{activeProject.currentStage}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 6, 
            background: '#ecfdf5', 
            color: '#059669', 
            padding: '6px 12px', 
            borderRadius: 6, 
            fontWeight: 700, 
            fontSize: 12 
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
            5 AI Agents Monitoring Live
          </span>
        </div>
      </div>

      {/* AI Workforce Operations Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #071530 0%, #17336b 100%)', 
        borderRadius: 12, 
        padding: '20px 24px', 
        color: '#fff', 
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ 
            width: 44, 
            height: 44, 
            borderRadius: 10, 
            background: 'rgba(255,255,255,0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#eb4d4b'
          }}>
            <Sparkles size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong style={{ fontSize: 16 }}>AI Workforce Summary</strong>
              <span style={{ fontSize: 11, background: '#2563eb', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                1 Critical Alert
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#cbd5e1', marginTop: 4 }}>
              Mason productivity lag of 6% detected in Lower Basement backfill. Recommended schedule re-plan ready to save 5 days.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            onClick={() => onSelectAgent('planning_schedule')}
            style={{ 
              background: '#eb4d4b', 
              color: '#fff', 
              padding: '8px 16px', 
              borderRadius: 6, 
              fontWeight: 700, 
              fontSize: 13 
            }}
          >
            Review Re-plan Action
          </button>
        </div>
      </div>

      {/* The 4-Card Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Left Column: Project Status */}
        <div className="agent-workspace-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <strong style={{ fontSize: 15, color: '#0f172a' }}>Project Status</strong>
            <Filter size={16} style={{ color: '#64748b', cursor: 'pointer' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, color: '#64748b' }}>Actual Start - End Dates</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>
                {activeProject.startDate} — {activeProject.endDate}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 11, color: '#64748b' }}>Planned Start - End Dates</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>
                15 Jan 2026 — 21 Feb 2027
              </div>
            </div>
          </div>

          {/* S-Curve Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
              <span>
                Actual Progress: <strong style={{ color: '#0f172a' }}>{activeProject.actualProgress}%</strong>
              </span>
              <span>
                Planned: <strong style={{ color: '#2563eb' }}>{activeProject.plannedProgress}%</strong>
              </span>
              <span style={{ color: '#dc2626', fontWeight: 700 }}>
                Lag: {activeProject.variance}% ({activeProject.delayDays} days)
              </span>
            </div>
            
            <div style={{ height: 10, background: '#e2e8f0', borderRadius: 5, overflow: 'hidden', position: 'relative' }}>
              <div 
                style={{ 
                  width: `${activeProject.plannedProgress}%`, 
                  height: '100%', 
                  background: '#93c5fd', 
                  position: 'absolute', 
                  top: 0, 
                  left: 0 
                }}
              ></div>
              <div 
                style={{ 
                  width: `${activeProject.actualProgress}%`, 
                  height: '100%', 
                  background: '#2563eb', 
                  position: 'absolute', 
                  top: 0, 
                  left: 0 
                }}
              ></div>
            </div>
          </div>

          {/* Quick AI Agent Shortcuts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <div 
              onClick={() => onSelectAgent('estimation')}
              style={{ background: '#eff6ff', padding: 10, borderRadius: 6, cursor: 'pointer' }}
            >
              <div style={{ fontSize: 11, color: '#2563eb', fontWeight: 700 }}>ESTIMATION AI</div>
              <div style={{ fontSize: 12, color: '#1e293b', fontWeight: 600, marginTop: 2 }}>6 DWGs Analyzed</div>
            </div>

            <div 
              onClick={() => onSelectAgent('procurement')}
              style={{ background: '#fff7ed', padding: 10, borderRadius: 6, cursor: 'pointer' }}
            >
              <div style={{ fontSize: 11, color: '#ea580c', fontWeight: 700 }}>PROCUREMENT AI</div>
              <div style={{ fontSize: 12, color: '#1e293b', fontWeight: 600, marginTop: 2 }}>₹14,000 Saving Ready</div>
            </div>

            <div 
              onClick={() => onSelectAgent('credit_cashflow')}
              style={{ background: '#f0fdf4', padding: 10, borderRadius: 6, cursor: 'pointer' }}
            >
              <div style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>CAPITAL AI</div>
              <div style={{ fontSize: 12, color: '#1e293b', fontWeight: 600, marginTop: 2 }}>₹50L Credit Line</div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent progress updates */}
        <div className="agent-workspace-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <strong style={{ fontSize: 15, color: '#0f172a' }}>Recent progress updates</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>
              <Calendar size={14} />
              <span>View all updates ›</span>
            </div>
          </div>

          {/* Tabs: Updates on tasks vs Progress remarks */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: 16 }}>
            <button
              onClick={() => setActiveTabUpdates('tasks')}
              style={{ 
                padding: '8px 14px', 
                fontSize: 13, 
                fontWeight: 600, 
                color: activeTabUpdates === 'tasks' ? '#2563eb' : '#64748b',
                borderBottom: activeTabUpdates === 'tasks' ? '2px solid #2563eb' : 'none'
              }}
            >
              Updates on tasks
            </button>
            <button
              onClick={() => setActiveTabUpdates('remarks')}
              style={{ 
                padding: '8px 14px', 
                fontSize: 13, 
                fontWeight: 600, 
                color: activeTabUpdates === 'remarks' ? '#2563eb' : '#64748b',
                borderBottom: activeTabUpdates === 'remarks' ? '2px solid #2563eb' : 'none'
              }}
            >
              Progress remarks
            </button>
          </div>

          {/* Updates Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700 }}>
                <span>Lower Basement Roof Slab Pour</span>
                <span style={{ color: '#059669' }}>+1% (Today)</span>
              </div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
                Cement: 20 Bags consumed • 12 Barbenders deployed • Photographic evidence verified.
              </div>
            </div>

            <div style={{ padding: 12, background: '#fef2f2', borderRadius: 8, border: '1px solid #fee2e2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#991b1b' }}>
                <span>Soil Backfilling Productivity</span>
                <span>-6% Lag</span>
              </div>
              <div style={{ fontSize: 11, color: '#7f1d1d', marginTop: 4 }}>
                Mason count insufficient. AI flagged 7-day critical path delay risk.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deadline Tasks & Schedule Tasks Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="agent-workspace-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <strong style={{ fontSize: 15, color: '#0f172a' }}>Deadline Tasks</strong>
            <span style={{ fontSize: 11, color: '#64748b' }}>Due this week</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10, background: '#f8fafc', borderRadius: 6, fontSize: 13 }}>
              <span>Electrical Conduit Laying (Basement 1)</span>
              <span style={{ color: '#ea580c', fontWeight: 600 }}>Due in 2 days</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10, background: '#f8fafc', borderRadius: 6, fontSize: 13 }}>
              <span>Pre-pour Reinforcement QA Inspection</span>
              <span style={{ color: '#2563eb', fontWeight: 600 }}>Tomorrow</span>
            </div>
          </div>
        </div>

        <div className="agent-workspace-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <strong style={{ fontSize: 15, color: '#0f172a' }}>Schedule Tasks</strong>
            <Filter size={16} style={{ color: '#64748b' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10, background: '#f8fafc', borderRadius: 6, fontSize: 13 }}>
              <span>Podium Concrete Pour (M30 Grade)</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>On Schedule</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10, background: '#f8fafc', borderRadius: 6, fontSize: 13 }}>
              <span>East Side Plastering Acceleration</span>
              <span style={{ color: '#7c3aed', fontWeight: 600 }}>AI Suggested (+5 Days)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Tasks with Category Filter & Toggle */}
      <div className="agent-workspace-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>Top Tasks</strong>
            <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 2, borderRadius: 6 }}>
              {['Categories', 'Tags', 'Users'].map((f) => (
                <button
                  key={f}
                  onClick={() => setTaskFilter(f)}
                  style={{ 
                    padding: '4px 10px', 
                    borderRadius: 4, 
                    fontSize: 12, 
                    fontWeight: 600,
                    background: taskFilter === f ? '#fff' : 'transparent',
                    color: taskFilter === f ? '#0f172a' : '#64748b'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>
              Compare with planned
            </span>
            <input 
              type="checkbox" 
              checked={compareWithPlanned} 
              onChange={() => setCompareWithPlanned(!compareWithPlanned)}
              style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
            />
          </div>
        </div>

        {/* Task Breakdown Table */}
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Completed</th>
                <th>In Progress</th>
                <th>Not Started</th>
                <th>Delayed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Civil & Structure</strong></td>
                <td>120 tasks</td>
                <td>48 tasks</td>
                <td>112 tasks</td>
                <td style={{ color: '#dc2626', fontWeight: 700 }}>3 delayed</td>
                <td><span style={{ color: '#ea580c', fontWeight: 600 }}>Needs Attention</span></td>
              </tr>
              <tr>
                <td><strong>Electrical & MEP</strong></td>
                <td>47 tasks</td>
                <td>14 tasks</td>
                <td>65 tasks</td>
                <td style={{ color: '#059669', fontWeight: 700 }}>0 delayed</td>
                <td><span style={{ color: '#059669', fontWeight: 600 }}>Optimal</span></td>
              </tr>
              <tr>
                <td><strong>Plumbing & Drainage</strong></td>
                <td>395 tasks</td>
                <td>22 tasks</td>
                <td>80 tasks</td>
                <td style={{ color: '#dc2626', fontWeight: 700 }}>2 delayed</td>
                <td><span style={{ color: '#ea580c', fontWeight: 600 }}>Needs Attention</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
