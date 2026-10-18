import React, { useState } from 'react';
import { Sparkles, Calendar, ShoppingBag, ShieldCheck, BadgeIndianRupee, FileSpreadsheet, Check, AlertCircle, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AGENT_REGISTRY } from '../../config/agentRegistry';
import { CashBillsAgent } from '../../components/agents/CashBillsAgent';
import { ProcurementRfqAgent } from '../../components/agents/ProcurementRfqAgent';
import { SiteSchedulerAgent } from '../../components/agents/SiteSchedulerAgent';
import { BuildingAgentCard } from '../../components/portal/BuildingAgentCard';
import { AgentEstimation as ConceptEstimation } from '../../components/portal/concept_preview/AgentEstimation';
import { AgentProjectManager as ConceptQuality } from '../../components/portal/concept_preview/AgentProjectManager';

export function AgentsPage() {
  const { activeAgentId = 'cash', setActiveAgentId, activeProject } = useApp();

  const getIconForAgent = (id) => {
    switch (id) {
      case 'cash': return BadgeIndianRupee;
      case 'procurement': return ShoppingBag;
      case 'scheduler': return Calendar;
      case 'estimator': return FileSpreadsheet;
      case 'quality': return ShieldCheck;
      default: return Sparkles;
    }
  };

  const getColorForAgent = (id) => {
    switch (id) {
      case 'cash': return '#10b981';
      case 'procurement': return '#fb923c';
      case 'scheduler': return '#38bdf8';
      case 'estimator': return '#f59e0b';
      case 'quality': return '#ec4899';
      default: return '#2563eb';
    }
  };

  // Safe fallback if activeAgentId is undefined or from old session
  const currentAgentId = AGENT_REGISTRY.some(a => a.id === activeAgentId) ? activeAgentId : 'cash';
  const currentAgent = AGENT_REGISTRY.find(a => a.id === currentAgentId) || AGENT_REGISTRY[0];

  return (
    <div style={{ padding: '20px 24px', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 5-Agent Overview Hub & Status Bar */}
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
                Agent Hub
              </h1>
              <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{ fontWeight: '700', color: '#059669' }}>● 3 of 5 agents live</span>
                <span>•</span>
                <span>2 in honest building roadmap</span>
                <span>•</span>
                <span>Active Site: <strong>{activeProject?.name || 'All Sites'}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Agent Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {AGENT_REGISTRY.map((agent) => {
            const Icon = getIconForAgent(agent.id);
            const color = getColorForAgent(agent.id);
            const isSelected = currentAgentId === agent.id;
            const isLive = agent.status === 'live';

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
                    background: isLive ? '#ecfdf5' : '#fef3c7',
                    color: isLive ? '#059669' : '#b45309',
                    border: '1px solid',
                    borderColor: isLive ? '#a7f3d0' : '#fde68a',
                    textTransform: 'uppercase'
                  }}>
                    {isLive ? 'Live' : 'Building'}
                  </span>
                </div>

                <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>
                  {agent.tag}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>{isLive ? 'Calculates from live data' : 'Under development'}</span>
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
        {currentAgentId === 'estimator' && (
          <BuildingAgentCard agent={currentAgent} conceptComponent={ConceptEstimation} />
        )}
        {currentAgentId === 'quality' && (
          <BuildingAgentCard agent={currentAgent} conceptComponent={ConceptQuality} />
        )}
      </div>
    </div>
  );
}
