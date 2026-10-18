import React from 'react';
import { Sparkles, FileSpreadsheet, Calendar, ShoppingBag, ShieldCheck, BadgeIndianRupee } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentEstimation } from '../../components/portal/AgentEstimation';
import { AgentProjectManager } from '../../components/portal/AgentProjectManager';
import { AgentPlanningSchedule } from '../../components/portal/AgentPlanningSchedule';
import { AgentProcurement } from '../../components/portal/AgentProcurement';
import { AgentCreditCashflow } from '../../components/portal/AgentCreditCashflow';

export function AgentsPage() {
  const { activeAgentId, setActiveAgentId, activeProject } = useApp();

  const agents = [
    { id: 'estimator', name: 'AI Estimator & Takeoff', icon: FileSpreadsheet, color: '#f59e0b', tag: 'Fast BOQ' },
    { id: 'pm', name: 'AI Site Scheduler & PM', icon: Calendar, color: '#38bdf8', tag: 'Delay Detection' },
    { id: 'procurement', name: 'AI Procurement & RFQ', icon: ShoppingBag, color: '#fb923c', tag: 'Rates & Vendors' },
    { id: 'planning', name: 'AI Quality & Snags', icon: ShieldCheck, color: '#ec4899', tag: 'Code Compliance' },
    { id: 'credit', name: 'AI Credit & Cashflow', icon: BadgeIndianRupee, color: '#10b981', tag: 'Overdraft & Runway' }
  ];

  return (
    <div style={{ padding: '20px 24px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Agent Selector Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #fbbf24, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>AI Workforce</span>
            <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>5 Specialized Autonomous Agents</span>
          </div>
        </div>

        {/* Agent Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isSelected = activeAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgentId(agent.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: isSelected ? agent.color : '#e2e8f0',
                  background: isSelected ? `${agent.color}15` : '#f8fafc',
                  color: isSelected ? '#0f172a' : '#64748b',
                  fontSize: '12.5px',
                  fontWeight: isSelected ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={15} style={{ color: agent.color }} />
                <span>{agent.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Agent Workspace */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {activeAgentId === 'estimator' && <AgentEstimation activeProject={activeProject} />}
        {activeAgentId === 'pm' && <AgentProjectManager activeProject={activeProject} />}
        {activeAgentId === 'procurement' && <AgentProcurement activeProject={activeProject} />}
        {activeAgentId === 'planning' && <AgentPlanningSchedule activeProject={activeProject} />}
        {activeAgentId === 'credit' && <AgentCreditCashflow activeProject={activeProject} />}
      </div>
    </div>
  );
}
