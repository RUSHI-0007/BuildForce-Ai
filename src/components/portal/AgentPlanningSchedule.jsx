import React, { useState } from 'react';
import { 
  CalendarClock, Sparkles, CheckCircle2, ArrowRight, Zap, 
  RotateCcw, Sliders, AlertCircle, TrendingDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function AgentPlanningSchedule({ activeProject }) {
  const [replanApplied, setReplanApplied] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(1);

  const initialSchedule = [
    {
      id: "TSK-01",
      name: "Foundation Footing & Plinth Beam RCC",
      start: "Jan 15",
      end: "Feb 20",
      duration: "35 Days",
      progress: 100,
      status: "Completed",
      isCritical: false
    },
    {
      id: "TSK-02",
      name: "Ground Floor Columns & 1st Slab Pour",
      start: "Mar 01",
      end: "Apr 15",
      duration: "45 Days",
      progress: 68,
      status: replanApplied ? "Recovered (+4 Days)" : "Delayed (-3 Days)",
      isCritical: true
    },
    {
      id: "TSK-03",
      name: "9-inch External Red Brick Masonry",
      start: replanApplied ? "Apr 10 (Early Transfer)" : "Apr 20",
      end: replanApplied ? "May 08" : "May 18",
      duration: "25 Days",
      progress: replanApplied ? 35 : 12,
      status: replanApplied ? "Active (Crew Transferred)" : "Pending",
      isCritical: true
    },
    {
      id: "TSK-04",
      name: "Concealed CPVC Plumbing & Electrical Conduit",
      start: "May 10",
      end: "May 28",
      duration: "18 Days",
      progress: 0,
      status: "Pending",
      isCritical: true
    },
    {
      id: "TSK-05",
      name: "Internal Sand-Faced Plaster & Gypsum Finish",
      start: "Jun 01",
      end: "Jun 25",
      duration: "25 Days",
      progress: 0,
      status: "Pending",
      isCritical: true
    },
    {
      id: "TSK-06",
      name: "Flooring Tiles, Painting & Client Handover",
      start: "Jun 28",
      end: "Jul 31",
      duration: "32 Days",
      progress: 0,
      status: "Pending",
      isCritical: false
    }
  ];

  const handleApplyReplan = () => {
    setReplanApplied(!replanApplied);
    if (!replanApplied) {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Agent Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)', 
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
              AGENT 03
            </span>
            <span style={{ fontSize: 13, color: '#ddd6fe', fontWeight: 600 }}>Critical Path & Milestone Engine</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>
            Planning & Schedule AI
          </h2>
          <p style={{ fontSize: 14, color: '#ede9fe', maxWidth: 650, marginTop: 4 }}>
            Simulates parallel construction sequences, detects critical path slippages in real-time, and auto-calculates timeline recovery plans to save 5–12 days per delay event.
          </p>
        </div>

        <button 
          onClick={handleApplyReplan}
          style={{ 
            background: replanApplied ? '#10b981' : '#ffffff', 
            color: replanApplied ? '#ffffff' : '#5b21b6', 
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
          {replanApplied ? (
            <>
              <CheckCircle2 size={16} />
              <span>Re-plan Active (5 Days Saved)</span>
            </>
          ) : (
            <>
              <Zap size={16} style={{ color: '#7c3aed' }} />
              <span>Execute AI Schedule Re-plan</span>
            </>
          )}
        </button>
      </div>

      {/* AI Recovery Recommendation Banner */}
      <div style={{ 
        background: replanApplied ? '#f0fdf4' : '#fff7ed', 
        border: '1px solid',
        borderColor: replanApplied ? '#86efac' : '#fdba74',
        borderRadius: 10,
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ 
            width: 38, 
            height: 38, 
            borderRadius: '50%', 
            background: replanApplied ? '#10b981' : '#ea580c', 
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: replanApplied ? '#065f46' : '#9a3412' }}>
              {replanApplied ? 'Schedule Critical Path Re-optimized' : 'AI Recovery Action: Start East side plastering work 5 days early'}
            </div>
            <div style={{ fontSize: 13, color: replanApplied ? '#047857' : '#c2410c', marginTop: 2 }}>
              {replanApplied 
                ? 'Parallelized plastering with cure cycle. Overall project delay reduced from 7 days down to 0 days!'
                : 'Recovers 5 days of critical path delay caused by mason shortage in basement backfill.'}
            </div>
          </div>
        </div>

        <button 
          onClick={handleApplyReplan}
          style={{ 
            background: replanApplied ? '#059669' : '#ea580c', 
            color: '#fff', 
            padding: '8px 16px', 
            borderRadius: 6, 
            fontWeight: 700, 
            fontSize: 12.5 
          }}
        >
          {replanApplied ? 'Reset to Original' : 'Apply Re-plan (Save 5 Days)'}
        </button>
      </div>

      {/* Gantt Timeline & Sequence Visualizer */}
      <div className="agent-workspace-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>Master Schedule & Critical Path Sequence</strong>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Dynamic simulation showing buffer float and lead-time constraints
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, background: '#2563eb', borderRadius: 2 }}></span>
              Normal Sequence
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, background: '#eb4d4b', borderRadius: 2 }}></span>
              Critical Path
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, background: '#10b981', borderRadius: 2 }}></span>
              AI Parallel Fast-track
            </span>
          </div>
        </div>

        {/* Interactive Gantt Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {initialSchedule.map((tsk, idx) => {
            const isSelected = selectedTaskIndex === idx;

            return (
              <div 
                key={tsk.id}
                onClick={() => setSelectedTaskIndex(idx)}
                style={{ 
                  background: isSelected ? '#f8fafc' : '#ffffff', 
                  border: '1px solid',
                  borderColor: isSelected ? '#3b82f6' : '#e2e8f0',
                  borderRadius: 8, 
                  padding: '12px 16px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>{tsk.id}</span>
                    <strong style={{ fontSize: 14, color: '#0f172a' }}>{tsk.name}</strong>
                    {tsk.isCritical && (
                      <span style={{ fontSize: 10, background: '#fef2f2', color: '#dc2626', padding: '1px 5px', borderRadius: 3, fontWeight: 800 }}>
                        CRITICAL PATH
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                    <span style={{ color: '#64748b' }}>{tsk.start} – {tsk.end} ({tsk.duration})</span>
                    <span style={{ 
                      fontWeight: 700, 
                      color: tsk.status.includes('Recovered') ? '#059669' : (tsk.status.includes('Delayed') ? '#dc2626' : '#2563eb') 
                    }}>
                      {tsk.status}
                    </span>
                  </div>
                </div>

                {/* Visual Gantt Bar */}
                <div style={{ height: 10, background: '#f1f5f9', borderRadius: 5, overflow: 'hidden', position: 'relative' }}>
                  <div 
                    style={{ 
                      width: `${tsk.progress}%`, 
                      height: '100%', 
                      background: tsk.id === 'TSK-03' && replanApplied ? '#10b981' : (tsk.isCritical ? '#eb4d4b' : '#2563eb'), 
                      borderRadius: 5 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
