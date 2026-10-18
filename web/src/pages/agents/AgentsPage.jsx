import React from 'react';
import { Sparkles, Calendar, ShoppingBag, BadgeIndianRupee, Camera, Send, Network } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { AGENT_REGISTRY } from '../../config/agentRegistry';
import { CashBillsAgent } from '../../components/agents/CashBillsAgent';
import { ProcurementRfqAgent } from '../../components/agents/ProcurementRfqAgent';
import { SiteSchedulerAgent } from '../../components/agents/SiteSchedulerAgent';
import { BuildingAgentCard } from '../../components/portal/BuildingAgentCard';

export function AgentsPage() {
  const { activeAgentId = 'cash', setActiveAgentId, activeProject } = useApp();

  const getIconForAgent = (id) => {
    switch (id) {
      case 'capture': return Camera;
      case 'scheduler': return Calendar;
      case 'procurement': return ShoppingBag;
      case 'cash': return BadgeIndianRupee;
      case 'client': return Send;
      case 'coordinator': return Network;
      default: return Sparkles;
    }
  };

  const getColorForAgent = (id) => {
    switch (id) {
      case 'capture': return '#6366f1';
      case 'scheduler': return '#0284c7';
      case 'procurement': return '#ea580c';
      case 'cash': return '#059669';
      case 'client': return '#7c3aed';
      case 'coordinator': return '#2563eb';
      default: return '#3b82f6';
    }
  };

  // Safe fallback if activeAgentId is undefined or from old session
  const currentAgentId = AGENT_REGISTRY.some(a => a.id === activeAgentId) ? activeAgentId : 'cash';
  const currentAgent = AGENT_REGISTRY.find(a => a.id === currentAgentId) || AGENT_REGISTRY[0];

  return (
    <div style={{ padding: '20px 24px', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 6-Agent Overview Hub & Status Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '800'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Agent Team Hub
              </h1>
              <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{ fontWeight: '700', color: '#0284c7' }}>● 6 AI Specialist Agents</span>
                <span>•</span>
                <span>Marked Preview during core engine integration</span>
                <span>•</span>
                <span>Active Site: <strong>{activeProject?.name || 'All Sites'}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Agent Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {AGENT_REGISTRY.map((agent) => {
            const Icon = getIconForAgent(agent.id);
            const color = getColorForAgent(agent.id);
            const isSelected = currentAgentId === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setActiveAgentId(agent.id)}
                style={{
                  background: isSelected ? `${color}0d` : '#f8fafc',
                  border: '1px solid',
                  borderColor: isSelected ? color : '#e2e8f0',
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: `${color}1a`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{agent.name}</strong>
                  </div>

                  <span style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: '#f0f9ff',
                    color: '#0284c7',
                    border: '1px solid #bae6fd',
                    textTransform: 'uppercase'
                  }}>
                    PREVIEW
                  </span>
                </div>

                <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>
                  {agent.tag}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>{agent.status === 'live' ? 'Calculates from live data' : 'Preview specifications'}</span>
                  {isSelected && <span style={{ color, fontWeight: '700' }}>Active View</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workspace of Selected Agent */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        {currentAgentId === 'cash' && <CashBillsAgent activeProject={activeProject} />}
        {currentAgentId === 'procurement' && <ProcurementRfqAgent activeProject={activeProject} />}
        {currentAgentId === 'scheduler' && <SiteSchedulerAgent activeProject={activeProject} />}
        {['capture', 'client', 'coordinator'].includes(currentAgentId) && (
          <BuildingAgentCard agent={currentAgent} />
        )}
      </div>
    </div>
  );
}
