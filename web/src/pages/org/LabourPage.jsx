import React, { useState } from 'react';
import { 
  Users, Plus, Phone, Calendar, IndianRupee
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { StatsCard } from '../../components/ui/StatsCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';

export function LabourPage() {
  const { labour, attendance, addLabour, markAttendance } = useApp();
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isAddWorkerModalOpen, setIsAddWorkerModalOpen] = useState(false);

  const [newWorkerForm, setNewWorkerForm] = useState({
    name: '',
    phone: '',
    trade: 'Mason Mistri',
    daily_wage: '850'
  });

  // Calculate today's stats
  const dateAttendance = attendance.filter(a => a.date === selectedDate);
  const presentCount = dateAttendance.filter(a => a.status === 'PRESENT').length;
  const halfDayCount = dateAttendance.filter(a => a.status === 'HALF_DAY').length;
  const totalAdvances = dateAttendance.reduce((acc, a) => acc + (Number(a.advance_paid) || 0), 0);

  // Today's total wage bill
  const totalDailyWageBill = labour.reduce((acc, worker) => {
    const record = dateAttendance.find(a => a.labour_id === worker.id);
    if (!record) return acc;
    const dailyWage = Number(worker.daily_wage || 0);
    if (record.status === 'PRESENT') return acc + dailyWage;
    if (record.status === 'HALF_DAY') return acc + (dailyWage / 2);
    return acc;
  }, 0);

  const handleAddWorker = (e) => {
    e.preventDefault();
    if (!newWorkerForm.name.trim()) return;
    addLabour({
      ...newWorkerForm,
      daily_wage: Number(newWorkerForm.daily_wage) || 0
    });
    setIsAddWorkerModalOpen(false);
    setNewWorkerForm({ name: '', phone: '', trade: 'Mason Mistri', daily_wage: '850' });
  };

  const getAttendanceStatus = (workerId) => {
    const rec = dateAttendance.find(a => a.labour_id === workerId);
    return rec?.status || 'NOT_MARKED';
  };

  const getAdvancePaid = (workerId) => {
    const rec = dateAttendance.find(a => a.labour_id === workerId);
    return rec?.advance_paid || 0;
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Daily Labour Haazri & Wage Register
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Mark site attendance with 1-click, record cash advances, and auto-calculate daily payouts.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <Calendar size={15} style={{ color: '#64748b' }} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#0f172a', fontWeight: '600' }}
            />
          </div>

          <button
            onClick={() => setIsAddWorkerModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            <span>Add Worker</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <StatsCard 
          title="Workers Present Today" 
          value={`${presentCount + halfDayCount} / ${labour.length}`} 
          subtitle={`${presentCount} Full Day, ${halfDayCount} Half Day`} 
          icon={Users} 
          color="#16a34a" 
        />
        <StatsCard 
          title="Today's Wage Bill" 
          value={`₹${totalDailyWageBill.toLocaleString('en-IN')}`} 
          subtitle="Earned wages for marked date" 
          icon={IndianRupee} 
          color="#2563eb" 
        />
        <StatsCard 
          title="Cash Advances Given" 
          value={`₹${totalAdvances.toLocaleString('en-IN')}`} 
          subtitle="Disbursed at site today" 
          icon={IndianRupee} 
          color="#ea580c" 
        />
      </div>

      {labour.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Workers Registered"
          description="Add your mistris, masons, helpers, and plumbers to start marking daily site haazri."
          actionLabel="Add First Worker"
          onAction={() => setIsAddWorkerModalOpen(true)}
        />
      ) : (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Worker Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Trade / Role</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Daily Rate (₹)</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Today's Haazri</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Advance (₹)</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Earned Net (₹)</th>
                </tr>
              </thead>
              <tbody>
                {labour.map((worker) => {
                  const status = getAttendanceStatus(worker.id);
                  const adv = getAdvancePaid(worker.id);
                  const dailyWage = Number(worker.daily_wage || 0);
                  const earned = status === 'PRESENT' ? dailyWage : status === 'HALF_DAY' ? dailyWage / 2 : 0;
                  const netPay = Math.max(0, earned - adv);

                  return (
                    <tr key={worker.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{worker.name}</div>
                        {worker.phone && (
                          <div style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Phone size={11} /> {worker.phone}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: '14px 16px', color: '#334155' }}>
                        <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#f1f5f9', fontSize: '12px', fontWeight: '500' }}>
                          {worker.trade}
                        </span>
                      </td>

                      <td style={{ padding: '14px 16px', fontWeight: '600', color: '#0f172a' }}>
                        ₹{worker.daily_wage}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => markAttendance(worker.id, 'PRESENT', adv, selectedDate)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '700',
                              border: '1px solid',
                              borderColor: status === 'PRESENT' ? '#16a34a' : '#cbd5e1',
                              background: status === 'PRESENT' ? '#dcfce7' : '#ffffff',
                              color: status === 'PRESENT' ? '#15803d' : '#64748b',
                              cursor: 'pointer'
                            }}
                          >
                            P (Full)
                          </button>
                          <button
                            onClick={() => markAttendance(worker.id, 'HALF_DAY', adv, selectedDate)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '700',
                              border: '1px solid',
                              borderColor: status === 'HALF_DAY' ? '#d97706' : '#cbd5e1',
                              background: status === 'HALF_DAY' ? '#fef3c7' : '#ffffff',
                              color: status === 'HALF_DAY' ? '#b45309' : '#64748b',
                              cursor: 'pointer'
                            }}
                          >
                            HD (Half)
                          </button>
                          <button
                            onClick={() => markAttendance(worker.id, 'ABSENT', adv, selectedDate)}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '700',
                              border: '1px solid',
                              borderColor: status === 'ABSENT' ? '#dc2626' : '#cbd5e1',
                              background: status === 'ABSENT' ? '#fee2e2' : '#ffffff',
                              color: status === 'ABSENT' ? '#b91c1c' : '#64748b',
                              cursor: 'pointer'
                            }}
                          >
                            A (Absent)
                          </button>
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <input
                          type="number"
                          placeholder="0"
                          value={adv || ''}
                          onChange={(e) => markAttendance(worker.id, status === 'NOT_MARKED' ? 'PRESENT' : status, e.target.value, selectedDate)}
                          style={{
                            width: '90px',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #cbd5e1',
                            fontSize: '12.5px'
                          }}
                        />
                      </td>

                      <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: '700', color: netPay > 0 ? '#16a34a' : '#64748b' }}>
                        ₹{netPay.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Worker */}
      <Modal
        isOpen={isAddWorkerModalOpen}
        onClose={() => setIsAddWorkerModalOpen(false)}
        title="Register New Worker / Labour"
      >
        <form onSubmit={handleAddWorker} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Irfan Khan"
              value={newWorkerForm.name}
              onChange={(e) => setNewWorkerForm({ ...newWorkerForm, name: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 9822000000"
              value={newWorkerForm.phone}
              onChange={(e) => setNewWorkerForm({ ...newWorkerForm, phone: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Trade / Skill
              </label>
              <select
                value={newWorkerForm.trade}
                onChange={(e) => setNewWorkerForm({ ...newWorkerForm, trade: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
              >
                <option value="Mason Mistri">Mason Mistri (Head)</option>
                <option value="Mason">Mason (Karigar)</option>
                <option value="Helper">Helper (Beldar)</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpenter">Carpenter (Centering)</option>
                <option value="Bar Bender">Bar Bender (Fitter)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Daily Wage Rate (₹) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 850"
                value={newWorkerForm.daily_wage}
                onChange={(e) => setNewWorkerForm({ ...newWorkerForm, daily_wage: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsAddWorkerModalOpen(false)}
              style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#ffffff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Save Worker
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
