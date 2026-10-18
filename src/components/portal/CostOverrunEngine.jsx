import React, { useState } from 'react';
import { 
  AlertTriangle, TrendingUp, IndianRupee, Clock, ShieldAlert, 
  Plus, CheckCircle2, ArrowRight, Sparkles, Filter 
} from 'lucide-react';
import { SMALL_CONTRACTOR_PROJECTS, EARLY_WARNING_ALERTS } from '../../data/mockData';

export function CostOverrunEngine({ onOpenAgent, onOpenClientRoom }) {
  const [projects, setProjects] = useState(SMALL_CONTRACTOR_PROJECTS);
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="agent-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              EARLY OVERRUN DETECTION
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>
            Cost Overrun & Delay Early Warning Engine
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 750, marginTop: 4 }}>
            Real-world mathematical cost models identifying material rate inflation, site wastage, labor overtime, & project extension penalties before margins get wiped out.
          </p>
        </div>

        <button 
          onClick={onOpenClientRoom}
          style={{ 
            background: '#0f766e', 
            color: '#ffffff', 
            border: 'none', 
            padding: '10px 18px', 
            borderRadius: 6, 
            fontSize: 13, 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            cursor: 'pointer' 
          }}
        >
          <Plus size={16} />
          <span>+ Log Client Change Order</span>
        </button>
      </div>

      {/* Detected Risks Pink Cards Row */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 10 }}>
          DETECTED FINANCIAL & DELAY RISKS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {EARLY_WARNING_ALERTS.map((alert) => (
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
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 14, color: '#9f1239' }}>{alert.title}</strong>
                  <span style={{ fontSize: 11, color: '#9f1239' }}>{alert.date}</span>
                </div>
                <p style={{ fontSize: 12.5, color: '#881337', marginTop: 4, lineHeight: 1.5 }}>
                  {alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Cost & Margin Projections */}
      <div style={{ fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 12 }}>
        PROJECT COST & MARGIN PROJECTIONS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {projects.map((proj) => {
          const isKothrud = proj.id === 'ks-proj-1';
          return (
            <div 
              key={proj.id}
              style={{ 
                background: '#ffffff', 
                borderRadius: 10, 
                border: '1px solid #cbd5e1', 
                padding: '22px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{proj.name}</h3>
                  <div style={{ fontSize: 12.5, color: '#64748b', marginTop: 2 }}>
                    Client: <strong>{proj.clientName}</strong> • Contract Value: ₹{(proj.contractBudget / 100000).toFixed(2)}L
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Projected Final Cost</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                    ₹{(proj.projectedFinalCost / 100000).toFixed(2)}L{' '}
                    <span style={{ color: '#e11d48', fontSize: 13 }}>(+₹{(proj.costOverrun / 100000).toFixed(2)}L Overrun)</span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Sub-Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: 11, color: '#64748b' }}>Approved Budget</span>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '4px 0 2px' }}>
                    ₹{(proj.contractBudget / 100000).toFixed(2)}L
                  </div>
                  <span style={{ fontSize: 11, color: '#64748b' }}>Baseline limit</span>
                </div>

                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: 11, color: '#64748b' }}>Actual Spent To-Date</span>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0f766e', margin: '4px 0 2px' }}>
                    ₹{(proj.actualCostSpent / 100000).toFixed(2)}L
                  </div>
                  <span style={{ fontSize: 11, color: '#64748b' }}>
                    {Math.round((proj.actualCostSpent / proj.contractBudget) * 100)}% of budget utilized
                  </span>
                </div>

                <div style={{ background: '#fff1f2', padding: 14, borderRadius: 8, border: '1px solid #fecdd3' }}>
                  <span style={{ fontSize: 11, color: '#be123c' }}>Projected Final Cost</span>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#e11d48', margin: '4px 0 2px' }}>
                    ₹{(proj.projectedFinalCost / 100000).toFixed(2)}L
                  </div>
                  <span style={{ fontSize: 11, color: '#be123c' }}>
                    Includes delay penalties (+₹3.5k/day)
                  </span>
                </div>
              </div>

              {/* Expense Category Breakdown Box */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 10 }}>
                  ACTUAL EXPENSE CATEGORY BREAKDOWN
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 11, color: '#64748b' }}>Material Expenses</span>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                      {isKothrud ? '₹2.31L' : '₹14.80L'}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: '#64748b' }}>Labour & Overtime Wages</span>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                      {isKothrud ? '₹3.98L' : '₹8.20L'}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: '#64748b' }}>Site Expenses & Petty</span>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                      {isKothrud ? '₹1.33L' : '₹2.80L'}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: '#e11d48' }}>Delay Overhead Penalty</span>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#e11d48', marginTop: 2 }}>
                      {isKothrud ? '₹28,000' : '₹70,000'}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recovery Recommendation */}
              <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
                  <Sparkles size={14} style={{ color: '#0f766e' }} />
                  <span>
                    <strong>Agent 03 (Planning AI):</strong> Start East side plastering 5 days early to absorb rebar delay and save ₹18,000 in overhead.
                  </span>
                </div>
                <button 
                  onClick={() => onOpenAgent && onOpenAgent('planning_schedule')}
                  style={{ 
                    background: '#f1f5f9', 
                    color: '#0f766e', 
                    border: '1px solid #cbd5e1', 
                    padding: '6px 12px', 
                    borderRadius: 4, 
                    fontSize: 12, 
                    fontWeight: 700,
                    cursor: 'pointer' 
                  }}
                >
                  Apply 1-Click Re-Plan →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
