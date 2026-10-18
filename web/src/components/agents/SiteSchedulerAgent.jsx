import React from 'react';
import { useApp } from '../../hooks/useApp';
import { Calendar } from 'lucide-react';

export function SiteSchedulerAgent({ activeProject }) {
  const { tasks = [] } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'Completed');

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
        borderRadius: '12px',
        padding: '24px',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
              AGENT 03 • LIVE
            </span>
            <span style={{ fontSize: '13px', color: '#bae6fd', fontWeight: '600' }}>
              Critical Path & S-Curve Engine
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginTop: '6px', color: '#ffffff' }}>
            Site Scheduler & PM AI
          </h2>
          <p style={{ fontSize: '14px', color: '#e0f2fe', maxWidth: '650px', marginTop: '4px' }}>
            Performs Critical Path forward/backward pass, detects crew shortages from daily haazri, and plans schedule recovery as Version N+1 while locking Version 1 baseline.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 20px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
          <div style={{ fontSize: '11px', color: '#e0f2fe' }}>Tasks Active:</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
            {tasks.length} Tasks ({completedTasks.length} Done)
          </div>
        </div>
      </div>

      {/* Task Schedule Overview */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={17} style={{ color: '#0284c7' }} />
          Schedule Milestones for {activeProject?.name || 'Active Project'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tasks.map((tsk) => (
            <div key={tsk.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <div>
                <strong style={{ fontSize: '13px', color: '#0f172a' }}>{tsk.name}</strong>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  Stage: {tsk.stage} • Due: {tsk.due_date} • Assigned: {tsk.assigned_to || 'Unassigned'}
                </div>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '4px',
                background: tsk.status === 'Completed' ? '#ecfdf5' : tsk.status === 'In Progress' ? '#eff6ff' : '#f8fafc',
                color: tsk.status === 'Completed' ? '#059669' : tsk.status === 'In Progress' ? '#2563eb' : '#64748b',
                border: '1px solid',
                borderColor: tsk.status === 'Completed' ? '#a7f3d0' : tsk.status === 'In Progress' ? '#bfdbfe' : '#e2e8f0'
              }}>
                {tsk.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
