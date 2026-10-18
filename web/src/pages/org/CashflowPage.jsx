import React, {} from 'react';
import { 
  BadgeIndianRupee, TrendingDown, AlertTriangle, 
  Calendar, ShieldCheck, ArrowRight
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { StatsCard } from '../../components/ui/StatsCard';

export function CashflowPage() {
  const { payments, setCurrentView, setActiveAgentId } = useApp();

  const totalInflows = payments
    .filter(p => p.type === 'INCOME' && p.status === 'Received')
    .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const totalOutflows = payments
    .filter(p => p.type === 'EXPENSE')
    .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const netLiquidity = totalInflows - totalOutflows;
  const avgWeeklyBurn = 125000; // ~1.25L per week for labour + basic materials
  const runwayWeeks = netLiquidity > 0 ? (netLiquidity / avgWeeklyBurn).toFixed(1) : 0;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
            Cashflow Runway & Financial Planner
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Monitor cash runway, prevent weekly payroll defaults, and sync client milestone disbursements.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveAgentId('credit');
            setCurrentView('agents');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            background: '#10b981',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span>Ask AI Credit Advisor</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <StatsCard 
          title="Current Available Cash" 
          value={`₹${(netLiquidity / 100000).toFixed(2)} Lakhs`} 
          subtitle="Cleared balance across active accounts" 
          icon={BadgeIndianRupee} 
          color="#16a34a" 
        />
        <StatsCard 
          title="Estimated Runway" 
          value={`${runwayWeeks} Weeks`} 
          subtitle={`Based on ~₹1.25L weekly site burn`} 
          icon={Calendar} 
          color={Number(runwayWeeks) >= 4 ? '#2563eb' : '#dc2626'} 
        />
        <StatsCard 
          title="Total Outflows (Materials + Wages)" 
          value={`₹${(totalOutflows / 100000).toFixed(2)} Lakhs`} 
          subtitle="All recorded disbursements" 
          icon={TrendingDown} 
          color="#ea580c" 
        />
      </div>

      {/* Runway Alert Box */}
      <div style={{
        background: Number(runwayWeeks) >= 3 ? '#f0fdf4' : '#fffbeb',
        border: '1px solid',
        borderColor: Number(runwayWeeks) >= 3 ? '#bbf7d0' : '#fef08a',
        borderRadius: '12px',
        padding: '18px 22px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {Number(runwayWeeks) >= 3 ? (
            <ShieldCheck size={28} style={{ color: '#16a34a' }} />
          ) : (
            <AlertTriangle size={28} style={{ color: '#d97706' }} />
          )}
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>
              {Number(runwayWeeks) >= 3 
                ? 'Healthy Cashflow Status: Operations Fully Funded' 
                : 'Attention Needed: Client Milestone Billing Recommended'}
            </div>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              Your current working capital covers approximately {runwayWeeks} weeks of routine labour wages and urgent cement/steel procurements.
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('payments')}
          style={{
            padding: '8px 16px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            fontSize: '12.5px',
            fontWeight: '600',
            color: '#1e293b',
            cursor: 'pointer'
          }}
        >
          View Payment Schedule
        </button>
      </div>

      {/* 4-Week Cashflow Forecast Simulation */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '20px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
          Next 4 Weeks Projected Site Outflows & Inflows
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {[
            { week: 'Week 1 (Oct 19 - Oct 25)', inflow: '₹0', outflow: '₹48,500', note: 'Weekly labour haazri payment' },
            { week: 'Week 2 (Oct 26 - Nov 01)', inflow: '₹8,00,000', outflow: '₹1,20,000', note: '1st Floor Slab Client Milestone Due' },
            { week: 'Week 3 (Nov 02 - Nov 08)', inflow: '₹0', outflow: '₹1,85,000', note: 'Ready-mix concrete & pump hire' },
            { week: 'Week 4 (Nov 09 - Nov 15)', inflow: '₹3,50,000', outflow: '₹65,000', note: 'Brickwork stage advance' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
                  {item.week}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Expected Inflow:</span>
                  <span style={{ fontWeight: '700', color: item.inflow !== '₹0' ? '#16a34a' : '#94a3b8' }}>{item.inflow}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '10px' }}>
                  <span style={{ color: '#64748b' }}>Scheduled Outflow:</span>
                  <span style={{ fontWeight: '700', color: '#dc2626' }}>{item.outflow}</span>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
