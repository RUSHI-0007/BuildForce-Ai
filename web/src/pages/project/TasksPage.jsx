import React, { useState } from 'react';
import { 
  CheckSquare, Plus, Calendar, User, CheckCircle2, 
  Clock, AlertCircle, Filter, Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/ui/StatsCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';

export function TasksPage() {
  const { tasks, activeProject, addTask, updateTask, deleteTask } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stageFilter, setStageFilter] = useState('ALL');

  const [formData, setFormData] = useState({
    name: '',
    stage: 'RCC Work',
    due_date: new Date().toISOString().split('T')[0],
    assigned_to: 'Ramesh Mistri'
  });

  const siteTasks = activeProject 
    ? tasks.filter(t => t.project_id === activeProject.id)
    : tasks;

  const filteredTasks = siteTasks.filter(t => {
    if (stageFilter === 'ALL') return true;
    return t.stage === stageFilter;
  });

  const completedCount = siteTasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = siteTasks.filter(t => t.status === 'In Progress').length;
  const pendingCount = siteTasks.filter(t => t.status === 'Pending').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addTask({
      ...formData,
      project_id: activeProject?.id,
      status: 'Pending'
    });
    setIsModalOpen(false);
    setFormData({
      name: '',
      stage: 'RCC Work',
      due_date: new Date().toISOString().split('T')[0],
      assigned_to: 'Ramesh Mistri'
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Tasks & Site Milestones
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {activeProject ? `Tasks for ${activeProject.name}` : 'All construction tasks and schedules'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            background: '#2563eb',
            color: '#ffffff',
            fontSize: '13.5px',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <StatsCard 
          title="Total Tasks" 
          value={siteTasks.length} 
          subtitle="Scheduled on site" 
          icon={CheckSquare} 
          color="#2563eb" 
        />
        <StatsCard 
          title="In Progress" 
          value={inProgressCount} 
          subtitle="Under active execution" 
          icon={Clock} 
          color="#d97706" 
        />
        <StatsCard 
          title="Completed" 
          value={completedCount} 
          subtitle="Finished and inspected" 
          icon={CheckCircle2} 
          color="#16a34a" 
        />
      </div>

      {siteTasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No Tasks Added Yet"
          description="Create your first task (e.g., Column Reinforcement, Brickwork, Plaster) to keep track of site progress."
          actionLabel="Add First Task"
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
          {/* Stage Filters */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            background: '#f8fafc'
          }}>
            {['ALL', 'RCC Work', 'Masonry', 'Services', 'Electrical', 'Finishing'].map(stage => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: stageFilter === stage ? '600' : '500',
                  border: '1px solid',
                  borderColor: stageFilter === stage ? '#2563eb' : '#cbd5e1',
                  background: stageFilter === stage ? '#eff6ff' : '#ffffff',
                  color: stageFilter === stage ? '#2563eb' : '#475569',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {stage === 'ALL' ? 'All Stages' : stage}
              </button>
            ))}
          </div>

          {/* Tasks Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Task Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Stage</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Assigned To</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Due Date</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a' }}>
                      {t.name}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#f1f5f9', fontSize: '12px' }}>
                        {t.stage}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      {t.assigned_to}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b' }}>
                      {t.due_date}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={t.status}
                        onChange={(e) => handleStatusChange(t.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          border: '1px solid #cbd5e1',
                          background: t.status === 'Completed' ? '#dcfce7' : t.status === 'In Progress' ? '#eff6ff' : '#f8fafc',
                          color: t.status === 'Completed' ? '#15803d' : t.status === 'In Progress' ? '#2563eb' : '#475569',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => deleteTask(t.id)}
                        style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for adding task */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Site Task"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Task Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Second Floor Column Pouring"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Stage / Category
              </label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13.5px',
                  background: '#ffffff'
                }}
              >
                <option value="RCC Work">RCC Work</option>
                <option value="Masonry">Masonry</option>
                <option value="Services">Services (Plumbing/Drainage)</option>
                <option value="Electrical">Electrical</option>
                <option value="Plastering">Plastering</option>
                <option value="Finishing">Finishing & Painting</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Assigned Mistri / Subcontractor
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

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Target Due Date
            </label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px'
              }}
            />
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
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Save Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
