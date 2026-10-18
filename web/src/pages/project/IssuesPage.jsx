import React, { useState } from 'react';
import { 
  AlertTriangle, Plus, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { StatsCard } from '../../components/ui/StatsCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';

export function IssuesPage() {
  const { issues, activeProject, addIssue, updateIssue } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const [formData, setFormData] = useState({
    title: '',
    priority: 'High',
    assigned_to: 'Site Incharge'
  });

  const siteIssues = activeProject 
    ? issues.filter(i => i.project_id === activeProject.id)
    : issues;

  const filteredIssues = siteIssues.filter(i => {
    if (filter === 'ALL') return true;
    if (filter === 'OPEN') return i.status === 'Open';
    if (filter === 'RESOLVED') return i.status === 'Resolved';
    return true;
  });

  const openCount = siteIssues.filter(i => i.status === 'Open').length;
  const highPriorityCount = siteIssues.filter(i => i.status === 'Open' && i.priority === 'High').length;
  const resolvedCount = siteIssues.filter(i => i.status === 'Resolved').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    addIssue({
      ...formData,
      project_id: activeProject?.id
    });
    setIsModalOpen(false);
    setFormData({ title: '', priority: 'High', assigned_to: 'Site Incharge' });
  };

  const toggleStatus = (issueId, currentStatus) => {
    updateIssue(issueId, { status: currentStatus === 'Open' ? 'Resolved' : 'Open' });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Site Issues & Snags
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {activeProject ? `Snag list for ${activeProject.name}` : 'Log defects, material delays, and rework'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            background: '#dc2626',
            color: '#ffffff',
            fontSize: '13.5px',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} />
          <span>Report Snag</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <StatsCard 
          title="Open Snags" 
          value={openCount} 
          subtitle="Pending resolution" 
          icon={AlertTriangle} 
          color="#dc2626" 
        />
        <StatsCard 
          title="High Priority" 
          value={highPriorityCount} 
          subtitle="Critical blocking issues" 
          icon={ShieldAlert} 
          color="#ea580c" 
        />
        <StatsCard 
          title="Resolved" 
          value={resolvedCount} 
          subtitle="Rectified and verified" 
          icon={CheckCircle2} 
          color="#16a34a" 
        />
      </div>

      {siteIssues.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="No Snags or Defects Reported"
          description="Everything is running smoothly! Click 'Report Snag' if any quality defect or site delay occurs."
          actionLabel="Report a Snag"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          {/* Filters */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            gap: '8px',
            background: '#f8fafc'
          }}>
            {['ALL', 'OPEN', 'RESOLVED'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: filter === tab ? '600' : '500',
                  border: '1px solid',
                  borderColor: filter === tab ? '#2563eb' : '#cbd5e1',
                  background: filter === tab ? '#eff6ff' : '#ffffff',
                  color: filter === tab ? '#2563eb' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {tab === 'ALL' ? 'All Issues' : tab === 'OPEN' ? `Open (${openCount})` : `Resolved (${resolvedCount})`}
              </button>
            ))}
          </div>

          {/* Issue Cards */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  background: issue.status === 'Resolved' ? '#fcfcfc' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <button
                    onClick={() => toggleStatus(issue.id, issue.status)}
                    style={{
                      marginTop: '2px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: issue.status === 'Resolved' ? '#16a34a' : '#cbd5e1',
                      padding: 0
                    }}
                  >
                    <CheckCircle2 size={22} />
                  </button>

                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: issue.status === 'Resolved' ? '#94a3b8' : '#0f172a',
                      textDecoration: issue.status === 'Resolved' ? 'line-through' : 'none',
                      marginBottom: '4px'
                    }}>
                      {issue.title}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b' }}>
                      <span>Reported: {issue.reported_date}</span>
                      <span>Assigned: <strong style={{ color: '#334155' }}>{issue.assigned_to}</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: issue.priority === 'High' ? '#fee2e2' : issue.priority === 'Medium' ? '#fef3c7' : '#f1f5f9',
                    color: issue.priority === 'High' ? '#dc2626' : issue.priority === 'Medium' ? '#d97706' : '#475569'
                  }}>
                    {issue.priority} Priority
                  </span>

                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: issue.status === 'Resolved' ? '#dcfce7' : '#eff6ff',
                    color: issue.status === 'Resolved' ? '#15803d' : '#2563eb'
                  }}>
                    {issue.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report New Site Snag / Defect"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Snag Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Honeycomb voids noticed on column C3 beam junction"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13.5px',
                  background: '#ffffff'
                }}
              >
                <option value="High">High (Blocking work)</option>
                <option value="Medium">Medium (Attention needed)</option>
                <option value="Low">Low (Minor finish touchup)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Assign For Rectification
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Mistri"
                value={formData.assigned_to}
                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: '9px 16px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#475569',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 18px',
                borderRadius: '6px',
                border: 'none',
                background: '#dc2626',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Snag
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
