import React, { useState } from 'react';
import { 
  Users, UserCheck, Clock, Plus, Search, Filter, 
  IndianRupee, AlertCircle, CheckCircle2, Calendar, Sparkles, X 
} from 'lucide-react';
import { LABOUR_ATTENDANCE_DATA } from '../../data/mockData';

export function LabourWagesTracker({ onOpenAgent }) {
  const [attendance, setAttendance] = useState(LABOUR_ATTENDANCE_DATA);
  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance', 'directory'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: '',
    role: 'Mason',
    baseWage: '850',
    siteLocation: 'Kothrud Site A1 - Main Structure',
    status: 'Present',
    checkIn: '08:30 AM',
    checkOut: '05:30 PM',
    regularHours: 8,
    overtimeHours: 0,
    bonus: 0
  });

  const filteredAttendance = attendance.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.role.toLowerCase() === selectedCategory.toLowerCase();
  });

  const totalWageToday = attendance.reduce((sum, item) => sum + (item.status === 'Present' ? item.totalWage : 0), 0);
  const presentCount = attendance.filter(item => item.status === 'Present').length;
  const totalOvertimePay = attendance.reduce((sum, item) => sum + (item.overtimePay || 0), 0);

  const handleRecordAttendance = (e) => {
    e.preventDefault();
    const base = Number(newWorker.baseWage) || 800;
    const otHrs = Number(newWorker.overtimeHours) || 0;
    const otRatePerHour = (base / 8) * 1.5;
    const otPay = Math.round(otHrs * otRatePerHour);
    const bonus = Number(newWorker.bonus) || 0;
    const total = newWorker.status === 'Present' ? (base + otPay + bonus) : 0;

    const record = {
      id: `w-${Date.now()}`,
      name: newWorker.name,
      role: newWorker.role,
      baseWage: base,
      siteLocation: newWorker.siteLocation,
      status: newWorker.status,
      checkIn: newWorker.status === 'Present' ? newWorker.checkIn : '-',
      checkOut: newWorker.status === 'Present' ? newWorker.checkOut : '-',
      regularHours: newWorker.status === 'Present' ? Number(newWorker.regularHours) : 0,
      overtimeHours: otHrs,
      overtimePay: otPay,
      bonus: bonus,
      totalWage: total,
      recordedBy: "Rushi Khalate (Supervisor)"
    };

    setAttendance(prev => [record, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="agent-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
              DAILY SITE LABOUR OPERATIONS
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>
            Labour Roster, Attendance & Overtime Wages
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 750, marginTop: 4 }}>
            Category-wise worker rosters, daily check-in/out, overtime wage calculations, & bonus logs. Built for daily cash/UPI payroll reconciliation across your active sites.
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          style={{ 
            background: '#0f766e', 
            color: '#ffffff', 
            border: 'none', 
            padding: '10px 18px', 
            borderRadius: 6, 
            fontSize: 13, 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            cursor: 'pointer' 
          }}
        >
          <Plus size={16} />
          <span>+ Record Attendance</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        <div className="agent-metric-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534', fontSize: 11, fontWeight: 700 }}>
            <span>TODAY'S WAGE BILL</span>
            <IndianRupee size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#166534', margin: '6px 0 2px' }}>
            ₹{totalWageToday.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: '#15803d' }}>
            {presentCount} active workers on payroll today
          </div>
        </div>

        <div className="agent-metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb', fontSize: 11, fontWeight: 700 }}>
            <span>ATTENDANCE STATUS</span>
            <UserCheck size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
            {presentCount} / {attendance.length}
          </div>
          <div style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>
            {Math.round((presentCount / attendance.length) * 100)}% Present on Sites
          </div>
        </div>

        <div className="agent-metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706', fontSize: 11, fontWeight: 700 }}>
            <span>OVERTIME WAGES</span>
            <Clock size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#d97706', margin: '6px 0 2px' }}>
            ₹{totalOvertimePay.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>
            Evening concrete & plaster shifts
          </div>
        </div>

        <div className="agent-metric-card" style={{ cursor: 'pointer' }} onClick={() => onOpenAgent && onOpenAgent('project_manager')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7c3aed', fontSize: 11, fontWeight: 700 }}>
            <span>AI LABOUR PRODUCTIVITY</span>
            <Sparkles size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#7c3aed', margin: '6px 0 2px' }}>
            91.4%
          </div>
          <div style={{ fontSize: 11, color: '#6b21a8', fontWeight: 600 }}>
            View AI Anomaly Check ↗
          </div>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 8, gap: 4 }}>
          <button 
            onClick={() => setActiveTab('attendance')}
            style={{ 
              background: activeTab === 'attendance' ? '#ffffff' : 'transparent', 
              color: activeTab === 'attendance' ? '#0f766e' : '#64748b', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'attendance' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Today's Attendance Sheet ({attendance.length})
          </button>
          <button 
            onClick={() => setActiveTab('directory')}
            style={{ 
              background: activeTab === 'directory' ? '#ffffff' : 'transparent', 
              color: activeTab === 'directory' ? '#0f766e' : '#64748b', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: 6, 
              fontSize: 13, 
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'directory' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Worker Directory (9 Registered)
          </button>
        </div>

        {/* Category Filter */}
        <select 
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{ 
            padding: '8px 14px', 
            borderRadius: 6, 
            border: '1px solid #cbd5e1', 
            fontSize: 13, 
            fontWeight: 600,
            color: '#334155' 
          }}
        >
          <option value="all">All Categories</option>
          <option value="Mason">Masons (₹850/day)</option>
          <option value="General Labour">General Labour (₹550/day)</option>
          <option value="Steel Fixer">Steel Fixers (₹900/day)</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="agent-workspace-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left' }}>WORKER NAME & CATEGORY</th>
              <th style={{ padding: '12px 14px', textAlign: 'left' }}>SITE LOCATION</th>
              <th style={{ padding: '12px 12px', textAlign: 'center' }}>STATUS</th>
              <th style={{ padding: '12px 14px', textAlign: 'left' }}>CHECK-IN / OUT</th>
              <th style={{ padding: '12px 12px', textAlign: 'center' }}>REGULAR HRS</th>
              <th style={{ padding: '12px 12px', textAlign: 'right' }}>OVERTIME</th>
              <th style={{ padding: '12px 12px', textAlign: 'right' }}>BONUS</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>TOTAL WAGE</th>
              <th style={{ padding: '12px 14px', textAlign: 'left' }}>RECORDED BY</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((w) => (
              <tr key={w.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px' }}>
                  <strong style={{ fontSize: 13.5, color: '#0f172a', display: 'block' }}>{w.name}</strong>
                  <span style={{ fontSize: 11, color: '#64748b' }}>{w.role} • Base: ₹{w.baseWage}/day</span>
                </td>
                <td style={{ padding: '14px 14px', fontSize: 12.5, color: '#334155' }}>
                  {w.siteLocation}
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                  <span style={{ 
                    fontSize: 11, 
                    fontWeight: 700, 
                    padding: '3px 10px', 
                    borderRadius: 4, 
                    background: w.status === 'Present' ? '#dcfce7' : '#fee2e2',
                    color: w.status === 'Present' ? '#166534' : '#991b1b'
                  }}>
                    {w.status}
                  </span>
                </td>
                <td style={{ padding: '14px 14px', fontSize: 12.5, color: '#334155', fontFamily: 'monospace' }}>
                  {w.checkIn} — {w.checkOut}
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'center', fontSize: 13, color: '#334155' }}>
                  {w.regularHours} hrs
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, color: w.overtimeHours > 0 ? '#d97706' : '#94a3b8' }}>
                  {w.overtimeHours > 0 ? `${w.overtimeHours} hrs (+₹${w.overtimePay})` : '—'}
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: 13, color: w.bonus > 0 ? '#059669' : '#94a3b8' }}>
                  {w.bonus > 0 ? `+₹${w.bonus}` : '—'}
                </td>
                <td style={{ padding: '14px 14px', textAlign: 'right' }}>
                  <strong style={{ fontSize: 14.5, color: w.status === 'Present' ? '#0f766e' : '#94a3b8' }}>
                    ₹{w.totalWage.toLocaleString()}
                  </strong>
                </td>
                <td style={{ padding: '14px 14px', fontSize: 11.5, color: '#64748b' }}>
                  {w.recordedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Attendance Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Record Site Worker Attendance</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleRecordAttendance} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Worker Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ramesh Kamble"
                  value={newWorker.name}
                  onChange={e => setNewWorker({...newWorker, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Role & Skill</label>
                  <select 
                    value={newWorker.role}
                    onChange={e => setNewWorker({...newWorker, role: e.target.value})}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  >
                    <option value="Mason">Mason (₹850/day)</option>
                    <option value="General Labour">General Labour (₹550/day)</option>
                    <option value="Steel Fixer">Steel Fixer (₹900/day)</option>
                    <option value="Carpenter">Carpenter (₹950/day)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Attendance Status</label>
                  <select 
                    value={newWorker.status}
                    onChange={e => setNewWorker({...newWorker, status: e.target.value})}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Site Location</label>
                <select 
                  value={newWorker.siteLocation}
                  onChange={e => setNewWorker({...newWorker, siteLocation: e.target.value})}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                >
                  <option value="Kothrud Site A1 - Main Structure">Kothrud Site A1</option>
                  <option value="Kothrud Site A2 - Interior & Plumbing">Kothrud Site A2</option>
                  <option value="Katraj Commercial Site B1">Katraj Commercial</option>
                </select>
              </div>

              {newWorker.status === 'Present' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Overtime Hours</label>
                    <input 
                      type="number" 
                      step="0.5"
                      placeholder="0"
                      value={newWorker.overtimeHours}
                      onChange={e => setNewWorker({...newWorker, overtimeHours: e.target.value})}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>Site Bonus (₹)</label>
                    <input 
                      type="number" 
                      placeholder="0"
                      value={newWorker.bonus}
                      onChange={e => setNewWorker({...newWorker, bonus: e.target.value})}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13 }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button 
                  type="submit"
                  style={{ flex: 1, background: '#0f766e', color: '#fff', border: 'none', padding: '10px', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}
                >
                  Save Worker Attendance
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
