import React, { useState } from 'react';
import { 
  Plus, Download, Search, Filter, ArrowUpDown, Phone, Image, 
  Info, MoreVertical, Sparkles, Building2, CheckCircle2, ChevronDown, Calendar, Layers 
} from 'lucide-react';
import { PROJECTS_DATA, AI_AGENTS } from '../../data/mockData';
import confetti from 'canvas-confetti';

export function ProjectsListingView({ onSelectProject, onLaunchAgentDirectly }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectLocation, setNewProjectLocation] = useState('');
  const [newProjectBudget, setNewProjectBudget] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && p.status === statusFilter;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName) return;

    const newProj = {
      id: `PRJ${Math.random().toString(36).substr(2, 9)}`,
      name: newProjectName,
      client: "Velocity In-house",
      location: newProjectLocation || "Bengaluru, Karnataka",
      type: "Commercial Mixed-Use",
      totalArea: "350,000 sq.ft",
      budget: newProjectBudget ? `₹${newProjectBudget} Cr` : "₹25.00 Cr",
      spent: "₹0.00 Cr",
      plannedProgress: 0,
      actualProgress: 0,
      variance: 0,
      delayDays: 0,
      status: "In Progress",
      startDate: "01 Nov 2026",
      endDate: "30 Nov 2027",
      stages: ["Excavation", "Substructure", "Superstructure", "Finishing"],
      currentStage: "Site Setup & Boundary Shoring"
    };

    setProjects([newProj, ...projects]);
    setShowNewProjectModal(false);
    setNewProjectName('');
    setNewProjectLocation('');
    setNewProjectBudget('');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{ padding: '24px 32px 48px', maxWidth: 1400, margin: '0 auto' }}>
      {/* AI Agents Integrated Workforce Banner on Projects Directory */}
      <div style={{ 
        background: 'linear-gradient(90deg, #071530 0%, #152d5e 60%, #071530 100%)', 
        borderRadius: 12, 
        padding: '18px 24px', 
        color: '#fff', 
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: '0 4px 14px rgba(7, 21, 48, 0.25)',
        border: '1px solid #1e3a6a'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: 8, 
            background: 'linear-gradient(135deg, #2563eb, #eb4d4b)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#fff' 
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong style={{ fontSize: 15 }}>5 Autonomous AI Agents Linked to Your Projects</strong>
              <span style={{ fontSize: 10, background: '#10b981', color: '#fff', padding: '1px 6px', borderRadius: 3, fontWeight: 800 }}>
                ACTIVE
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: '#cbd5e1', marginTop: 2 }}>
              Estimation • Project Manager • Schedule Recovery • Procurement • ₹50L Working Capital
            </div>
          </div>
        </div>

        {/* Quick Launch Chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {AI_AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onLaunchAgentDirectly(agent.id, projects[0])}
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                color: '#fff', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '6px 12px', 
                borderRadius: 6, 
                fontSize: 11.5, 
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <span style={{ color: agent.color }}>●</span>
              <span>{agent.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>
          Your projects ({filteredProjects.length})
        </h1>

        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={() => setShowNewProjectModal(true)}
            style={{ 
              background: '#1d4ed8', 
              color: '#ffffff', 
              padding: '9px 18px', 
              borderRadius: 6, 
              fontSize: 13.5, 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 6px rgba(29, 78, 216, 0.3)'
            }}
          >
            <Plus size={16} />
            <span>New Project</span>
          </button>

          <button 
            onClick={() => alert('Exporting projects directory to Excel (.xlsx)...')}
            style={{ 
              background: '#ffffff', 
              color: '#1e40af', 
              border: '1px solid #1d4ed8', 
              padding: '9px 18px', 
              borderRadius: 6, 
              fontSize: 13.5, 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6 
            }}
          >
            <Download size={16} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, gap: 16 }}>
        {/* Search input */}
        <div style={{ 
          position: 'relative', 
          width: 320, 
          background: '#ffffff', 
          borderRadius: 6, 
          border: '1px solid #cbd5e1' 
        }}>
          <Search size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#64748b' }} />
          <input 
            type="text" 
            placeholder="Search projects" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 12px 10px 36px', 
              border: 'none', 
              outline: 'none', 
              fontSize: 13.5, 
              borderRadius: 6 
            }}
          />
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ 
            background: '#ffffff', 
            border: '1px solid #cbd5e1', 
            borderRadius: 6, 
            padding: '8px 14px', 
            fontSize: 13, 
            fontWeight: 600, 
            color: '#334155',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer'
          }}>
            <ArrowUpDown size={14} />
            <span>Project Status</span>
            <ChevronDown size={14} />
          </div>

          <div style={{ 
            background: '#ffffff', 
            border: '1px solid #cbd5e1', 
            borderRadius: 6, 
            padding: '8px 14px', 
            fontSize: 13, 
            fontWeight: 600, 
            color: '#334155',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer'
          }}>
            <Filter size={14} />
            <span>Filter</span>
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: 24 
      }}>
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id}
            onClick={() => onSelectProject(proj)}
            style={{ 
              background: '#ffffff', 
              borderRadius: 10, 
              border: '1px solid #cbd5e1', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            {/* Top Image Graphic Area */}
            <div style={{ 
              height: 160, 
              background: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)', 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Building Silhouette Graphic */}
              <div style={{ opacity: 0.9 }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="12" y="24" width="18" height="32" rx="2" fill="white" />
                  <rect x="34" y="14" width="18" height="42" rx="2" fill="white" />
                  {/* Windows */}
                  <rect x="16" y="28" width="4" height="4" fill="#93c5fd" />
                  <rect x="22" y="28" width="4" height="4" fill="#93c5fd" />
                  <rect x="16" y="36" width="4" height="4" fill="#93c5fd" />
                  <rect x="22" y="36" width="4" height="4" fill="#93c5fd" />
                  <rect x="38" y="20" width="4" height="4" fill="#93c5fd" />
                  <rect x="44" y="20" width="4" height="4" fill="#93c5fd" />
                  <rect x="38" y="28" width="4" height="4" fill="#93c5fd" />
                  <rect x="44" y="28" width="4" height="4" fill="#93c5fd" />
                  <rect x="38" y="36" width="4" height="4" fill="#93c5fd" />
                  <rect x="44" y="36" width="4" height="4" fill="#93c5fd" />
                </svg>
              </div>

              {/* Action icons on top-right of image */}
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                <div style={{ 
                  width: 26, 
                  height: 26, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.85)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Phone size={12} style={{ color: '#1e40af' }} />
                </div>
                <div style={{ 
                  width: 26, 
                  height: 26, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.85)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Image size={12} style={{ color: '#1e40af' }} />
                </div>
              </div>
            </div>

            {/* Card Content Area */}
            <div style={{ padding: '16px 20px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>
                    {proj.name}
                  </h3>
                  <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>
                    {proj.location}
                  </div>
                </div>

                {/* Circular Progress Gauge */}
                <div style={{ 
                  width: 42, 
                  height: 42, 
                  borderRadius: '50%', 
                  border: '3px solid #fef3c7',
                  borderTopColor: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#92400e'
                }}>
                  {proj.actualProgress}%
                </div>
              </div>

              {/* Dates */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11.5, color: '#64748b', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>START DATE</span>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>{proj.startDate || '--'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>END DATE</span>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>{proj.endDate || '--'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CURRENT STAGE</span>
                  <span style={{ color: '#2563eb', fontWeight: 600 }}>{proj.currentStage}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ 
                borderTop: '1px solid #f1f5f9', 
                paddingTop: 12, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                {/* Active Pill (Matching screenshot) */}
                <div style={{ 
                  background: '#fef3c7', 
                  color: '#92400e', 
                  padding: '3px 10px', 
                  borderRadius: 4, 
                  fontSize: 11.5, 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <span>⚡ Active</span>
                  <ChevronDown size={12} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#64748b' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    Project info <Info size={12} />
                  </span>
                  <MoreVertical size={14} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="modal-overlay" onClick={() => setShowNewProjectModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
                Create New Construction Project
              </h3>
              <button onClick={() => setShowNewProjectModal(false)} style={{ fontSize: 22, color: '#64748b' }}>×</button>
            </div>

            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>
                  Project Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Signature Towers G+28" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>
                  Location & City
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Whitefield, Bengaluru" 
                  value={newProjectLocation}
                  onChange={(e) => setNewProjectLocation(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>
                  Total Project Budget (₹ Crores)
                </label>
                <input 
                  type="number" 
                  step="0.5"
                  placeholder="e.g. 42.5" 
                  value={newProjectBudget}
                  onChange={(e) => setNewProjectBudget(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }}
                />
              </div>

              <div style={{ background: '#eff6ff', padding: 12, borderRadius: 6, fontSize: 12, color: '#1e40af' }}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: 4 }} />
                All 5 AI Agents (Estimation, PM, Schedule, Procurement, Capital) will automatically attach to this project upon creation.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  style={{ padding: '8px 16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, fontWeight: 600, fontSize: 13 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ padding: '8px 20px', background: '#1d4ed8', color: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 13 }}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
