import React, { useState } from 'react';
import { 
  BadgeIndianRupee, Sparkles, CheckCircle2, ShieldCheck, 
  TrendingUp, CreditCard, AlertCircle, FileCheck, ArrowUpRight 
} from 'lucide-react';
import { CASHFLOW_METRICS } from '../../data/mockData';
import confetti from 'canvas-confetti';

export function AgentCreditCashflow({ activeProject }) {
  const [creditLimit] = useState(CASHFLOW_METRICS.creditLimitUnlocked); // 15 L
  const [drawnAmount, setDrawnAmount] = useState(CASHFLOW_METRICS.creditDrawn); // 4.5 L
  const [sliderAmount, setSliderAmount] = useState(2.5); // 2.5 L
  const [drawdownSuccess, setDrawdownSuccess] = useState(false);
  const [auditFilter, setAuditFilter] = useState('all');

  const availableBuffer = (creditLimit - drawnAmount).toFixed(2);

  const handleDrawdown = () => {
    setDrawnAmount(prev => +(prev + sliderAmount).toFixed(2));
    setDrawdownSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setDrawdownSuccess(false), 4000);
  };

  const invoiceAudits = [
    {
      id: "INV-9921",
      supplier: "UltraTech Cement Dealer",
      amount: "₹1,44,000",
      poNumber: "PO-2026-8841",
      challanNumber: "DC-0482",
      status: "3-Way Matched ✓",
      isMatched: true,
      discrepancy: "None (Qty & Tax Rate 100% aligned)"
    },
    {
      id: "INV-9918",
      supplier: "Sharma Steel Traders",
      amount: "₹3,48,200",
      poNumber: "PO-2026-8790",
      challanNumber: "DC-0465",
      status: "Tax Discrepancy Flagged",
      isMatched: false,
      discrepancy: "Billed 18% GST instead of contracted 12% concessional rate (Saving: ₹20,892)"
    },
    {
      id: "INV-9890",
      supplier: "Supreme PVC Fittings",
      amount: "₹42,800",
      poNumber: "PO-2026-8712",
      challanNumber: "DC-0440",
      status: "3-Way Matched ✓",
      isMatched: true,
      discrepancy: "None (Gate inward quantity verified)"
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Agent Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)', 
        borderRadius: 12, 
        padding: '24px', 
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
              AGENT 05
            </span>
            <span style={{ fontSize: 13, color: '#bae6fd', fontWeight: 600 }}>Liquidity & Financial Compliance AI</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 4 }}>
            Contractor Credit & Working Capital AI
          </h2>
          <p style={{ fontSize: 14, color: '#e0f2fe', maxWidth: 650, marginTop: 4 }}>
            Maintains multi-site cashflow health, conducts automated 3-way invoice audits (PO vs Challan vs Invoice), and provides instant ₹15 Lakh interest-free revolving credit for urgent cement/steel orders.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
          <div style={{ fontSize: 11, color: '#e0f2fe' }}>Available Revolving Buffer:</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>₹{availableBuffer} Lakhs</div>
        </div>
      </div>

      {/* Main Grid: Cashflow Balance + Working Capital Credit Line */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
        
        {/* Left Column: BuildForce Capital Drawdown Simulator */}
        <div className="agent-workspace-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <strong style={{ fontSize: 16, color: '#0f172a' }}>BuildForce Capital: Instant Working Capital</strong>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                Pre-approved 0% interest credit line for 30 days
              </div>
            </div>
            <span style={{ fontSize: 11, background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: 4, fontWeight: 800 }}>
              APPROVED FOR {activeProject.name}
            </span>
          </div>

          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: 18, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#0369a1', fontWeight: 600 }}>Choose Drawdown Amount:</span>
              <strong style={{ fontSize: 18, color: '#0284c7' }}>₹{sliderAmount} Lakhs</strong>
            </div>

            <input 
              type="range" 
              min="0.5" 
              max={availableBuffer > 0 ? availableBuffer : 1} 
              step="0.5"
              value={sliderAmount}
              onChange={(e) => setSliderAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0284c7', margin: '8px 0' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 4 }}>
              <span>Min: ₹0.5 L</span>
              <span>Available Limit: ₹{availableBuffer} L</span>
            </div>

            {/* Terms Pill */}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #e0f2fe', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span>Interest: <strong style={{ color: '#059669' }}>0% for 30 Days</strong></span>
              <span>Processing Fee: <strong>Nil</strong></span>
              <span>Disbursement: <strong>Instant to Vendor</strong></span>
            </div>
          </div>

          <button
            onClick={handleDrawdown}
            style={{ 
              width: '100%', 
              background: drawdownSuccess ? '#10b981' : '#0284c7', 
              color: '#fff', 
              padding: '12px 20px', 
              borderRadius: 8, 
              fontWeight: 800, 
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer'
            }}
          >
            {drawdownSuccess ? (
              <>
                <CheckCircle2 size={18} />
                <span>₹{sliderAmount} Lakhs Disbursed to Vendor!</span>
              </>
            ) : (
              <>
                <CreditCard size={18} />
                <span>Draw ₹{sliderAmount} Lakhs to Pay Upcoming Cement PO</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Project Cashflow Breakdown */}
        <div className="agent-workspace-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>Live Project Cashflow</strong>
            <span style={{ fontSize: 11, color: '#64748b' }}>Cumulative YTD</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: 11, color: '#64748b' }}>Client Milestone Bills Received:</span>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#059669' }}>₹{CASHFLOW_METRICS.totalReceived} L</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>Total Site Expenditure:</span>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>₹{CASHFLOW_METRICS.totalPaid} L</div>
              </div>
            </div>

            <div style={{ padding: 12, background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1e40af', marginBottom: 6 }}>
                Current Month Burn Breakdown (₹6.50 Lakhs):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>• Material Procurement</span>
                  <strong>₹{CASHFLOW_METRICS.materialExpense} Lakhs (46%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>• Subcontractor & Labor Wages</span>
                  <strong>₹{CASHFLOW_METRICS.manpowerExpense} Lakhs (11%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>• Plant & Machinery Diesel</span>
                  <strong>₹{CASHFLOW_METRICS.machineryExpense} Lakhs (6%)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Way Match Invoice & GST Auditor */}
      <div className="agent-workspace-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>3-Way Invoice & GST Auditor</strong>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              Auto-matches Purchase Order vs Gate Inward Delivery Challan vs Vendor Tax Invoice
            </div>
          </div>

          <span style={{ fontSize: 11, background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: 4, fontWeight: 800 }}>
            AUTO-AUDITED BY AI
          </span>
        </div>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Supplier</th>
                <th>Invoice Amount</th>
                <th>Linked PO</th>
                <th>Gate Challan</th>
                <th>Audit Status</th>
                <th>AI Findings</th>
              </tr>
            </thead>
            <tbody>
              {invoiceAudits.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 700, color: '#0284c7' }}>{inv.id}</td>
                  <td style={{ fontWeight: 600 }}>{inv.supplier}</td>
                  <td style={{ fontWeight: 800 }}>{inv.amount}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{inv.poNumber}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{inv.challanNumber}</td>
                  <td>
                    <span style={{ 
                      fontSize: 11, 
                      fontWeight: 800,
                      background: inv.isMatched ? '#ecfdf5' : '#fef2f2',
                      color: inv.isMatched ? '#059669' : '#dc2626',
                      padding: '2px 8px',
                      borderRadius: 4
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: inv.isMatched ? '#475569' : '#b91c1c' }}>
                    {inv.discrepancy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
