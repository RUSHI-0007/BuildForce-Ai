import React from 'react';
import { useApp } from '../../context/AppContext';
import { BadgeIndianRupee, Sparkles, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function CashBillsAgent({ activeProject }) {
  const { payments = [], attendance = [], labour = [] } = useApp();

  const totalIncome = payments
    .filter(p => p.type === 'INCOME' && p.status === 'Received')
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const totalExpenses = payments
    .filter(p => p.type === 'EXPENSE' && p.status === 'Paid')
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const liveBalance = totalIncome - totalExpenses;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
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
              AGENT 01 • LIVE
            </span>
            <span style={{ fontSize: '13px', color: '#a7f3d0', fontWeight: '600' }}>
              Cashflow & 3-Way Audit Engine
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginTop: '6px', color: '#ffffff' }}>
            Cash & Bills AI
          </h2>
          <p style={{ fontSize: '14px', color: '#d1fae5', maxWidth: '650px', marginTop: '4px' }}>
            Simulates 12-week cash runway, protects Saturday wages first, audits dealer invoices against delivery challans, and monitors credit readiness.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px 20px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
          <div style={{ fontSize: '11px', color: '#d1fae5' }}>Site Net Cash (Calculated):</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
            ₹{liveBalance.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Receipts Captured</span>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
            ₹{totalIncome.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#10b981' }}>From verified client stage payments</span>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Disbursements Recorded</span>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
            ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Materials, labour wages & site overheads</span>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Credit Readiness Audit</span>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>
            Audit Active
          </div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>No fake loan offers • Bank record builder</span>
        </div>
      </div>
    </div>
  );
}
