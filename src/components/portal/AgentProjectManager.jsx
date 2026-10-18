import React, { useState } from 'react';
import { 
  Activity, AlertTriangle, CheckCircle2, Camera, ShieldAlert, 
  FileText, Users, Clock, ArrowRight, Zap, RefreshCw 
} from 'lucide-react';
import { PM_ALERTS } from '../../data/mockData';
import confetti from 'canvas-confetti';

export function AgentProjectManager({ activeProject, onReplanSchedule }) {
  const [alerts, setAlerts] = useState(PM_ALERTS);
  const [resolvedTickets, setResolvedTickets] = useState({});
  const [dprGenerated, setDprGenerated] = useState(false);
  const [isGeneratingDpr, setIsGeneratingDpr] = useState(false);

  const handleResolveAlert = (alertId) => {
    setResolvedTickets(prev => ({ ...prev, [alertId]: true }));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleGenerateDPR = () => {
    setIsGeneratingDpr(true);
    setTimeout(() => {
      setIsGeneratingDpr(false);
      setDprGenerated(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Agent Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', 
        borderRadius: 12, 
        padding: '24px', 
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
              AGENT 02
            </span>
            <span style={{ fontSize: 13, color: '#a7f3d0', fontWeight: 600 }}>Progress & Quality AI</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>
            Site Supervisor & Quality AI
          </h2>
          <p style={{ fontSize: 14, color: '#d1fae5', maxWidth: 650, marginTop: 4 }}>
            Continuously correlates daily WhatsApp site photos, worker haazri, and cement bag counts to flag schedule delays, mason productivity deficits, and concrete honeycombing snags.
          </p>
        </div>

        <button 
          onClick={handleGenerateDPR}
          disabled={isGeneratingDpr}
          style={{ 
            background: '#ffffff', 
            color: '#065f46', 
            padding: '12px 20px', 
            borderRadius: 8, 
            fontWeight: 800, 
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <FileText size={16} />
          <span>{isGeneratingDpr ? 'Synthesizing Site Logs...' : 'Generate Today\'s DPR with AI'}</span>
        </button>
      </div>

      {/* Main Grid: Roadblocks Radar + Computer Vision Quality + DPR Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
        
        {/* Left Column: Active Roadblocks Feed */}
        <div className="agent-workspace-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <strong style={{ fontSize: 16, color: '#0f172a' }}>Active Roadblocks & Anomaly Radar</strong>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                Continuously evaluated against master S-curve
              </div>
            </div>
            <span style={{ fontSize: 11, background: '#fef2f2', color: '#dc2626', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
              {alerts.filter(a => !resolvedTickets[a.id]).length} UNRESOLVED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {alerts.map((alt) => {
              const isResolved = resolvedTickets[alt.id];

              return (
                <div 
                  key={alt.id}
                  style={{ 
                    border: '1px solid',
                    borderColor: isResolved ? '#10b981' : (alt.severity === 'critical' ? '#fca5a5' : '#fed7aa'),
                    background: isResolved ? '#f0fdf4' : (alt.severity === 'critical' ? '#fff5f5' : '#fffaf0'),
                    borderRadius: 10,
                    padding: 16,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ 
                        fontSize: 10, 
                        fontWeight: 800, 
                        background: alt.severity === 'critical' ? '#dc2626' : '#d97706',
                        color: '#fff', 
                        padding: '2px 6px', 
                        borderRadius: 3 
                      }}>
                        {alt.category}
                      </span>
                      <strong style={{ fontSize: 14, color: '#0f172a' }}>{alt.title}</strong>
                    </div>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{alt.timestamp}</span>
                  </div>

                  <p style={{ fontSize: 12.5, color: '#334155', lineHeight: 1.5, marginBottom: 8 }}>
                    {alt.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#dc2626', fontWeight: 700, marginBottom: 12 }}>
                    <AlertTriangle size={14} />
                    <span>{alt.impact}</span>
                  </div>

                  {/* Actionable Button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px dashed #cbd5e1' }}>
                    <div style={{ fontSize: 11, color: '#475569' }}>
                      <strong>AI Suggestion:</strong> {alt.actionable.actionText}
                    </div>

                    {isResolved ? (
                      <span style={{ color: '#059669', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle2 size={15} />
                        <span>Action Dispatched</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleResolveAlert(alt.id)}
                        style={{ 
                          background: alt.severity === 'critical' ? '#eb4d4b' : '#2563eb', 
                          color: '#fff', 
                          padding: '6px 12px', 
                          borderRadius: 6, 
                          fontSize: 11.5, 
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {alt.actionable.label}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Computer Vision Quality Defect & DPR Generator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Computer Vision Defect Detection Card */}
          <div className="agent-workspace-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Camera size={16} style={{ color: '#2563eb' }} />
                <strong style={{ fontSize: 14, color: '#0f172a' }}>Computer Vision QA Scan</strong>
              </div>
              <span style={{ fontSize: 11, background: '#fef2f2', color: '#dc2626', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                DEFECT AUDIT
              </span>
            </div>

            <div style={{ 
              position: 'relative', 
              height: 180, 
              borderRadius: 8, 
              overflow: 'hidden', 
              backgroundImage: 'url(https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid #cbd5e1'
            }}>
              {/* Defect Bounding Box */}
              <div style={{ 
                position: 'absolute', 
                top: 40, 
                left: 60, 
                width: 140, 
                height: 90, 
                border: '2px solid #ef4444', 
                background: 'rgba(239, 68, 68, 0.2)',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 4
              }}>
                <span style={{ background: '#dc2626', color: '#fff', fontSize: 9, fontWeight: 800, padding: '1px 4px', borderRadius: 2, alignSelf: 'flex-start' }}>
                  HONEYCOMB VOID (94.8%)
                </span>
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  Depth: ~45mm • Column C-4 (Site A1)
                </span>
              </div>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, color: '#475569' }}>
              <strong>AI Recommendation:</strong> Non-shrink polymer grouting repair required before brickwork starts. Auto-assigned to supervisor Rushi.
            </div>
          </div>

          {/* Generated Daily Progress Report (DPR) */}
          <div className="agent-workspace-card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={16} style={{ color: '#059669' }} />
                <strong style={{ fontSize: 14, color: '#0f172a' }}>Daily Site Progress Report (DPR)</strong>
              </div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Today 09:30 AM</span>
            </div>

            {dprGenerated ? (
              <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}>
                <div style={{ fontWeight: 800, color: '#059669', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={16} />
                  <span>DPR #DPR-KOTHRUD-01 Generated & WhatsApp Ready</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#334155' }}>
                  <div>• <strong>Site:</strong> Kothrud Residence Villa (Site A1)</div>
                  <div>• <strong>Weather:</strong> Clear, 29°C (Good for Curing)</div>
                  <div>• <strong>Active Workforce:</strong> 9 Workers (3 Masons, 6 Helpers) • ₹7,800 Wages</div>
                  <div>• <strong>Materials Consumed:</strong> UltraTech Cement (20 Bags), Red Bricks (1,200 pcs)</div>
                  <div>• <strong>Work Progress:</strong> 1st Floor Brickwork 68% complete</div>
                  <div>• <strong>Snags Logged:</strong> 1 (Minor surface honeycomb at Column C-4)</div>
                </div>
              </div>
            ) : (
              <div style={{ 
                background: '#f8fafc', 
                border: '1px dashed #cbd5e1', 
                borderRadius: 8, 
                padding: 24, 
                textAlign: 'center',
                color: '#64748b' 
              }}>
                <FileText size={28} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>No DPR generated yet today</div>
                <div style={{ fontSize: 11, marginTop: 4 }}>Click button above to synthesize today's photo logs and contractor inputs into an executive PDF report.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
