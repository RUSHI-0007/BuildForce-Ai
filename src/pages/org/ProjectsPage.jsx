import React, { useState } from 'react';
import { 
  Building2, Plus, MapPin, IndianRupee, Calendar, 
  ArrowRight, Search, CheckCircle2, Clock, Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/ui/StatsCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';

export function ProjectsPage({ onOpenCreateModal }) {
  const { projects, selectProject, addProject, deleteProject } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    client_name: '',
    budget: '',
    type: 'Residential Bungalow'
  });

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase()));
    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'IN_PROGRESS') return matchesSearch && p.status === 'In Progress';
    if (statusFilter === 'COMPLETED') return matchesSearch && p.status === 'Completed';
    return matchesSearch;
  });

  const totalValue = projects.reduce((acc, p) => acc + (Number(p.budget) || 0), 0);
  const avgProgress = projects.length > 0 
    ? Math.round(projects.reduce((acc, p) => acc + (Number(p.progress) || 0), 0) / projects.length) 
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addProject(formData);
    setIsModalOpen(false);
    setFormData({ name: '', location: '', client_name: '', budget: '', type: 'Residential Bungalow' });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Construction Sites
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Manage ongoing works, budgets, materials, and daily labour haazri across all sites.
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
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          <Plus size={16} />
          <span>Add New Site</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No Construction Sites Yet"
          description="BuildSite helps small builders track sites without hassle. Add your first site to get started in seconds."
          actionLabel="Add Your First Site"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <>
          {/* Stats Bar */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <StatsCard 
              title="Total Sites"
              value={projects.length}
              subtitle="Registered in workspace"
              icon={Building2}
              color="#2563eb"
            />
            <StatsCard 
              title="Combined Project Value"
              value={`₹${(totalValue / 100000).toFixed(1)} Lakhs`}
              subtitle="Total active contract worth"
              icon={IndianRupee}
              color="#16a34a"
            />
            <StatsCard 
              title="Average Progress"
              value={`${avgProgress}%`}
              subtitle="Completion across active sites"
              icon={Clock}
              color="#d97706"
            />
          </div>

          {/* Filter Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
              {['ALL', 'IN_PROGRESS', 'COMPLETED'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: statusFilter === filter ? '600' : '500',
                    border: 'none',
                    background: statusFilter === filter ? '#ffffff' : 'transparent',
                    color: statusFilter === filter ? '#0f172a' : '#64748b',
                    boxShadow: statusFilter === filter ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {filter === 'ALL' ? 'All Sites' : filter === 'IN_PROGRESS' ? 'In Progress' : 'Completed'}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search site or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  background: '#ffffff'
                }}
              />
            </div>
          </div>

          {/* Site Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '18px'
          }}>
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                <div style={{ padding: '18px 20px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                      {p.name}
                    </h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: p.status === 'Completed' ? '#dcfce7' : '#eff6ff',
                      color: p.status === 'Completed' ? '#15803d' : '#2563eb'
                    }}>
                      {p.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: '#94a3b8' }} />
                      <span>{p.location || 'Pune Site'}</span>
                    </div>
                    {p.client_name && (
                      <div style={{ fontSize: '12px', color: '#475569' }}>
                        Client: <strong style={{ color: '#0f172a' }}>{p.client_name}</strong>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                      <span>Site Progress</span>
                      <span>{p.progress || 0}%</span>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${p.progress || 0}%`,
                        height: '100%',
                        background: '#2563eb',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', fontSize: '12px' }}>
                    <div>
                      <div style={{ color: '#64748b' }}>Budget</div>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>
                        ₹{p.budget ? (Number(p.budget) / 100000).toFixed(1) + ' L' : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Due Date</div>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>
                        {p.end_date || 'Dec 2026'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid #f1f5f9',
                  background: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete site "${p.name}"?`)) {
                        deleteProject(p.id);
                      }
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Delete Site"
                  >
                    <Trash2 size={15} />
                  </button>

                  <button
                    onClick={() => selectProject(p.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      background: '#0f1d3b',
                      color: '#ffffff',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Open Site</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal for adding site */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Construction Site"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Site / Project Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Shivaji Nagar Villa (G+2)"
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

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Location / City
            </label>
            <input
              type="text"
              placeholder="e.g. Shivaji Nagar, Pune"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                Client Name
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Kulkarni"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13.5px'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Contract Budget (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 4500000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Create Site
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
