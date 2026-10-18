import React, { useState } from 'react';
import { 
  CreditCard, Plus, IndianRupee, ArrowDownLeft, ArrowUpRight, 
  Calendar, CheckCircle2, Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from '../../components/ui/StatsCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';

export function PaymentsPage() {
  const { payments, activeProject, addPayment } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    milestone: '',
    amount: '',
    type: 'INCOME', // INCOME or EXPENSE
    status: 'Received',
    mode: 'NEFT/Bank',
    date: new Date().toISOString().split('T')[0]
  });

  const sitePayments = activeProject 
    ? payments.filter(p => p.project_id === activeProject.id)
    : payments;

  const totalReceived = sitePayments
    .filter(p => p.type === 'INCOME' && p.status === 'Received')
    .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const totalPending = sitePayments
    .filter(p => p.type === 'INCOME' && p.status !== 'Received')
    .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const totalExpenses = sitePayments
    .filter(p => p.type === 'EXPENSE')
    .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const netCashflow = totalReceived - totalExpenses;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.milestone.trim() || !formData.amount) return;
    addPayment({
      ...formData,
      project_id: activeProject?.id
    });
    setIsModalOpen(false);
    setFormData({
      milestone: '',
      amount: '',
      type: 'INCOME',
      status: 'Received',
      mode: 'NEFT/Bank',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Client Payments & Cashflow
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {activeProject ? `Payment ledger for ${activeProject.name}` : 'Stage payments received from clients and vendor expenses'}
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
          <span>Record Transaction</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <StatsCard 
          title="Received from Client" 
          value={`₹${(totalReceived / 100000).toFixed(2)} Lakhs`} 
          subtitle="Cleared bank deposits" 
          icon={ArrowDownLeft} 
          color="#16a34a" 
        />
        <StatsCard 
          title="Direct Site Expenses" 
          value={`₹${(totalExpenses / 100000).toFixed(2)} Lakhs`} 
          subtitle="Materials + labour payments" 
          icon={ArrowUpRight} 
          color="#ea580c" 
        />
        <StatsCard 
          title="Net Site Cash Balance" 
          value={`₹${(netCashflow / 100000).toFixed(2)} Lakhs`} 
          subtitle={netCashflow >= 0 ? "Cash surplus" : "Deficit / funded from credit"} 
          icon={CreditCard} 
          color={netCashflow >= 0 ? "#2563eb" : "#dc2626"} 
        />
      </div>

      {sitePayments.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No Transactions Recorded"
          description="Record an advance or milestone payment received from the client, or log a supplier payment."
          actionLabel="Record First Payment"
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
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Milestone / Description</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Payment Mode</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {sitePayments.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px', color: '#64748b' }}>
                      {p.date}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: '#0f172a' }}>
                      {p.milestone}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: p.type === 'INCOME' ? '#dcfce7' : '#fee2e2',
                        color: p.type === 'INCOME' ? '#15803d' : '#dc2626'
                      }}>
                        {p.type === 'INCOME' ? 'Client Receipt' : 'Expense / Paid'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      {p.mode}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: p.status === 'Received' || p.status === 'Paid' ? '#f0fdf4' : '#fffbeb',
                        color: p.status === 'Received' || p.status === 'Paid' ? '#16a34a' : '#d97706'
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{
                      padding: '14px 20px',
                      textAlign: 'right',
                      fontWeight: '700',
                      fontSize: '14px',
                      color: p.type === 'INCOME' ? '#16a34a' : '#dc2626'
                    }}>
                      {p.type === 'INCOME' ? '+' : '-'} ₹{Number(p.amount).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Client Payment or Expense"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Transaction Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'INCOME', status: 'Received' })}
                style={{
                  padding: '9px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: formData.type === 'INCOME' ? '#16a34a' : '#cbd5e1',
                  background: formData.type === 'INCOME' ? '#dcfce7' : '#ffffff',
                  color: formData.type === 'INCOME' ? '#15803d' : '#64748b'
                }}
              >
                + Client Payment Received
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'EXPENSE', status: 'Paid' })}
                style={{
                  padding: '9px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: formData.type === 'EXPENSE' ? '#dc2626' : '#cbd5e1',
                  background: formData.type === 'EXPENSE' ? '#fee2e2' : '#ffffff',
                  color: formData.type === 'EXPENSE' ? '#dc2626' : '#64748b'
                }}
              >
                - Site Expense / Paid Out
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Milestone / Purpose *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ground Floor Slab Completion Stage"
              value={formData.milestone}
              onChange={(e) => setFormData({ ...formData, milestone: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Amount (₹) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 500000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Payment Mode
              </label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
              >
                <option value="NEFT/Bank">NEFT / RTGS</option>
                <option value="UPI">UPI / GPay / PhonePe</option>
                <option value="Cheque">Bank Cheque</option>
                <option value="Cash">Cash Voucher</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '9px 18px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#ffffff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
            >
              Save Transaction
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
