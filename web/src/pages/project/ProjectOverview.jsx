import React from 'react';
import { 
  MapPin, IndianRupee, CheckSquare, 
  AlertTriangle, Users, Truck
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { StatsCard } from '../../components/ui/StatsCard';

export function ProjectOverview() {
  const { activeProject, tasks, issues, payments, setCurrentView } = useApp();

  if (!activeProject) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>No site selected</h2>
        <button onClick={() => setCurrentView('sites')} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
          Back to Sites
        </button>
      </div>
    );
  }

  const siteTasks = tasks.filter(t => t.project_id === activeProject.id);
  const siteIssues = issues.filter(i => i.project_id === activeProject.id && i.status === 'Open');
  const sitePayments = payments.filter(p => p.project_id === activeProject.id);

  const totalReceived = sitePayments
    .filter(p => p.type === 'INCOME' && p.status === 'Received')
    .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const totalExpense = sitePayments
    .filter(p => p.type === 'EXPENSE')
    .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Site Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #e2e8f0',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              {activeProject.name}
            </h1>
            <span style={{
              fontSize: '11.5px',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '4px',
              background: '#eff6ff',
              color: '#2563eb'
            }}>
              {activeProject.status}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} style={{ color: '#94a3b8' }} />
              {activeProject.location}
            </span>
            {activeProject.client_name && (
              <span>Client: <strong style={{ color: '#334155' }}>{activeProject.client_name}</strong></span>
            )}
          </div>
        </div>

        {/* Progress summary */}
        <div style={{ minWidth: '200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
            <span>Milestone Progress</span>
            <span>{activeProject.progress || 0}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${activeProject.progress || 0}%`, height: '100%', background: '#2563eb' }} />
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <StatsCard 
          title="Client Payments"
          value={`₹${(totalReceived / 100000).toFixed(1)} L`}
          subtitle={`Total Budget: ₹${(Number(activeProject.budget) / 100000).toFixed(1)} L`}
          icon={IndianRupee}
          color="#16a34a"
        />
        <StatsCard 
          title="Direct Expenses"
          value={`₹${(totalExpense / 100000).toFixed(1)} L`}
          subtitle="Materials & Labour paid"
          icon={IndianRupee}
          color="#d97706"
        />
        <StatsCard 
          title="Open Tasks"
          value={siteTasks.filter(t => t.status !== 'Completed').length}
          subtitle={`${siteTasks.length} total tasks`}
          icon={CheckSquare}
          color="#2563eb"
        />
        <StatsCard 
          title="Open Snags / Issues"
          value={siteIssues.length}
          subtitle="Requires attention"
          icon={AlertTriangle}
          color="#dc2626"
        />
      </div>

      {/* Quick Access Action Bar for Contractor */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>
          ⚡ Fast Site Actions:
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentView('tasks')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#1e293b',
              cursor: 'pointer'
            }}
          >
            <CheckSquare size={14} style={{ color: '#2563eb' }} />
            <span>Manage Tasks ({siteTasks.length})</span>
          </button>

          <button
            onClick={() => setCurrentView('issues')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#1e293b',
              cursor: 'pointer'
            }}
          >
            <AlertTriangle size={14} style={{ color: '#d97706' }} />
            <span>Report Snag</span>
          </button>

          <button
            onClick={() => setCurrentView('materials')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#1e293b',
              cursor: 'pointer'
            }}
          >
            <Truck size={14} style={{ color: '#ea580c' }} />
            <span>Site Materials</span>
          </button>

          <button
            onClick={() => setCurrentView('labour')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#1e293b',
              cursor: 'pointer'
            }}
          >
            <Users size={14} style={{ color: '#16a34a' }} />
            <span>Today's Haazri</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Current Tasks + Recent Payments */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Current Tasks */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              Active Tasks & Schedule
            </h3>
            <button
              onClick={() => setCurrentView('tasks')}
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
            >
              View All →
            </button>
          </div>

          {siteTasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '13px' }}>
              No tasks added for this site yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {siteTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                      {task.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {task.stage} • Assigned to: {task.assigned_to}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: task.status === 'Completed' ? '#dcfce7' : task.status === 'In Progress' ? '#eff6ff' : '#f1f5f9',
                    color: task.status === 'Completed' ? '#15803d' : task.status === 'In Progress' ? '#2563eb' : '#64748b'
                  }}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payments Summary */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              Recent Client Payments & Expenses
            </h3>
            <button
              onClick={() => setCurrentView('payments')}
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
            >
              View Ledger →
            </button>
          </div>

          {sitePayments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '13px' }}>
              No payments recorded for this site yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sitePayments.slice(0, 4).map((pay) => (
                <div
                  key={pay.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                      {pay.milestone}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {pay.date} • {pay.mode}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: pay.type === 'INCOME' ? '#16a34a' : '#dc2626'
                  }}>
                    {pay.type === 'INCOME' ? '+' : '-'} ₹{Number(pay.amount).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
