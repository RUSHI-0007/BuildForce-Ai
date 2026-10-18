import React, { useState } from 'react';
import { 
  IndianRupee, TrendingUp, AlertTriangle, ShieldCheck, 
  RotateCcw, Sliders, Calendar, Sparkles, ArrowRight, ArrowDownRight, ArrowUpRight 
} from 'lucide-react';
import { CASHFLOW_RUNWAY_METRICS } from '../../data/mockData';

export function CashflowRunwayPlanner({ onOpenAgent }) {
  const [openingBalance, setOpeningBalance] = useState(CASHFLOW_RUNWAY_METRICS.openingCashReserve);
  const [clientDelayDays, setClientDelayDays] = useState(0);
  const [wageVariation, setWageVariation] = useState(0);
  const [materialInflation, setMaterialInflation] = useState(0);
  const [crewSizeVariation, setCrewSizeVariation] = useState(0);

  // Dynamic calculations based on sliders
  const wageImpact = 1 + (wageVariation / 100);
  const materialImpact = 1 + (materialInflation / 100);
  const crewImpact = 1 + (crewSizeVariation / 100);
  const adjustedOutflow = Math.round(CASHFLOW_RUNWAY_METRICS.outflows12Week * ((wageImpact * 0.45 * crewImpact) + (materialImpact * 0.55)));
  
  // Late client payment reduces expected early buffer
  const latePaymentPenalty = Math.round(clientDelayDays * 22000);
  const projectedMinBalance = Math.round(CASHFLOW_RUNWAY_METRICS.min12WeekBalance - latePaymentPenalty - ((adjustedOutflow - CASHFLOW_RUNWAY_METRICS.outflows12Week) * 0.3));
  const safeWithdrawal = Math.max(0, Math.round((projectedMinBalance * 0.4)));
  const isShortfallRisk = projectedMinBalance < 0;

  const handleResetSliders = () => {
    setClientDelayDays(0);
    setWageVariation(0);
    setMaterialInflation(0);
    setCrewSizeVariation(0);
  };

  // Generate SVG path points for the 12-week trajectory
  const generateTrajectoryPoints = (isPessimistic = false) => {
    const weeks = 12;
    const points = [];
    const baseW = 750 / (weeks - 1);
    const height = 180;
    
    // Starting balance
    let cur = openingBalance;
    for (let i = 0; i < weeks; i++) {
      const x = i * baseW;
      // Inflow milestones around week 4, 8, 11
      let inflow = 0;
      if (isPessimistic) {
        // Delayed inflow
        if (i === 6) inflow = 1250000;
        if (i === 10) inflow = 1500000;
      } else {
        if (i === 4) inflow = 1250000;
        if (i === 8) inflow = 1500000;
        if (i === 11) inflow = 1000000;
      }

      // Weekly outflow (wages + material)
      const weeklyOut = (adjustedOutflow / 12) * (isPessimistic ? 1.15 : 1);
      cur = cur + inflow - weeklyOut;

      // Scale to canvas height (max 36L, min -5L)
      const maxVal = 3600000;
      const normalizedY = Math.max(10, Math.min(height - 10, height - ((cur + 500000) / (maxVal + 500000)) * height));
      points.push({ x, y: normalizedY, balance: cur });
    }
    return points;
  };

  const expectedPoints = generateTrajectoryPoints(false);
  const pessimisticPoints = generateTrajectoryPoints(true);

  const pointsToPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const pointsToArea = (pts) => `${pointsToPath(pts)} L 750 180 L 0 180 Z`;

  return (
    <div className="agent-container">
      {/* Top Banner Card */}
      <div style={{ 
        background: 'linear-gradient(135deg, #071530 0%, #0b2545 100%)', 
        borderRadius: 12, 
        padding: '24px 28px', 
        color: '#ffffff',
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20
      }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: '#34d399', marginBottom: 8 }}>
            <ShieldCheck size={13} />
            TRANSPARENT RULE-BASED PLANNING AID • NO HIDDEN PREDICTIONS
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: '4px 0 8px' }}>
            Cash-Flow Planner & Working Capital Runway
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: 13.5, lineHeight: 1.5 }}>
            Tells you <strong>WHEN</strong> client money arrives, <strong>WHEN</strong> to pay wages, <strong>WHEN</strong> to order materials, and <strong>WHAT</strong> is safe to withdraw for your business profit.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>OPENING CASH RESERVE</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
              ₹{openingBalance.toLocaleString()}
            </div>
            <span style={{ fontSize: 11, color: '#38bdf8' }}>Bank + Petty Cash</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>FORECAST ACCURACY</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981', margin: '4px 0 2px' }}>
              92%
            </div>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>Median tracking</span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="agent-metric-card" style={{ borderColor: isShortfallRisk ? '#fecdd3' : '#e2e8f0', background: isShortfallRisk ? '#fff1f2' : '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: isShortfallRisk ? '#e11d48' : '#0f766e', fontSize: 11, fontWeight: 700 }}>
            <span>12-WEEK MIN BALANCE</span>
            <TrendingUp size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: isShortfallRisk ? '#e11d48' : '#0f172a', margin: '6px 0 2px' }}>
            {projectedMinBalance < 0 ? `-₹${Math.abs(projectedMinBalance).toLocaleString()}` : `₹${projectedMinBalance.toLocaleString()}`}
          </div>
          <div style={{ fontSize: 11, color: isShortfallRisk ? '#be123c' : '#64748b' }}>
            {isShortfallRisk ? '⚠️ Cash buffer deficit risk' : 'Lowest point around Week 4'}
          </div>
        </div>

        <div className="agent-metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: isShortfallRisk ? '#e11d48' : '#059669', fontSize: 11, fontWeight: 700 }}>
            <span>FIRST SHORTFALL DATE</span>
            <AlertTriangle size={16} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: isShortfallRisk ? '#e11d48' : '#059669', margin: '6px 0 2px' }}>
            {isShortfallRisk ? 'In 24 Days' : 'None Detected'}
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>
            {isShortfallRisk ? 'Client payment delay impact' : '12-week runway is fully funded (84d)'}
          </div>
        </div>

        <div className="agent-metric-card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534', fontSize: 11, fontWeight: 700 }}>
            <span>SAFE TO WITHDRAW</span>
            <ShieldCheck size={16} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#166534', margin: '6px 0 2px' }}>
            ₹{safeWithdrawal.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: '#15803d' }}>
            Surplus buffer above wage & stock
          </div>
        </div>

        <div className="agent-metric-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb', fontSize: 11, fontWeight: 700 }}>
            <span>12-WEEK CASH IN / OUT</span>
            <IndianRupee size={16} />
          </div>
          <div style={{ fontSize: 13, color: '#059669', fontWeight: 700, marginTop: 4 }}>
            Inflows: ₹{(CASHFLOW_RUNWAY_METRICS.inflows12Week / 100000).toFixed(1)}L
          </div>
          <div style={{ fontSize: 13, color: '#e11d48', fontWeight: 700 }}>
            Outflows: ₹{(adjustedOutflow / 100000).toFixed(1)}L
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
            Net: +₹{((CASHFLOW_RUNWAY_METRICS.inflows12Week - adjustedOutflow) / 100000).toFixed(1)}L
          </div>
        </div>
      </div>

      {/* What-If Scenario Sliders (Exact replication from KritiSphere) */}
      <div className="agent-workspace-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sliders size={18} style={{ color: '#0f766e' }} />
            <div>
              <strong style={{ fontSize: 15, color: '#0f172a' }}>What-If Scenario Sliders</strong>
              <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>Simulate contractor stress tests in real time</span>
            </div>
          </div>

          <button 
            onClick={handleResetSliders}
            style={{ 
              background: '#f1f5f9', 
              color: '#475569', 
              border: '1px solid #cbd5e1', 
              padding: '6px 12px', 
              borderRadius: 6, 
              fontSize: 12, 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6,
              cursor: 'pointer' 
            }}
          >
            <RotateCcw size={13} />
            <span>Reset Sliders</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {/* Slider 1: Client Pays Late */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Client Pays Late</span>
              <strong style={{ color: clientDelayDays > 0 ? '#e11d48' : '#0f766e' }}>
                +{clientDelayDays} days
              </strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              step="5"
              value={clientDelayDays}
              onChange={e => setClientDelayDays(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0f766e' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
              <span>On Time (0d)</span>
              <span>15 days</span>
              <span>30 days late</span>
            </div>
          </div>

          {/* Slider 2: Wage Rate Variation */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Wage Rate Variation</span>
              <strong style={{ color: wageVariation > 0 ? '#e11d48' : wageVariation < 0 ? '#059669' : '#0f766e' }}>
                {wageVariation > 0 ? `+${wageVariation}%` : `${wageVariation}%`}
              </strong>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="30" 
              step="5"
              value={wageVariation}
              onChange={e => setWageVariation(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0f766e' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
              <span>-10%</span>
              <span>Normal (0%)</span>
              <span>+30% hike</span>
            </div>
          </div>

          {/* Slider 3: Material Price Inflation */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Material Price Inflation</span>
              <strong style={{ color: materialInflation > 0 ? '#e11d48' : '#0f766e' }}>
                {materialInflation > 0 ? `+${materialInflation}%` : `${materialInflation}%`}
              </strong>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="30" 
              step="5"
              value={materialInflation}
              onChange={e => setMaterialInflation(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0f766e' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
              <span>-10%</span>
              <span>Standard (0%)</span>
              <span>+30% surge</span>
            </div>
          </div>

          {/* Slider 4: Site Crew Size */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Site Crew Size</span>
              <strong style={{ color: crewSizeVariation > 0 ? '#d97706' : '#0f766e' }}>
                {crewSizeVariation > 0 ? `+${crewSizeVariation}%` : `${crewSizeVariation}%`}
              </strong>
            </div>
            <input 
              type="range" 
              min="-30" 
              max="50" 
              step="10"
              value={crewSizeVariation}
              onChange={e => setCrewSizeVariation(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0f766e' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
              <span>-30% crew</span>
              <span>Current (0%)</span>
              <span>+50% ramp-up</span>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Week Daily Balance Trajectory Graph (Recreation from KritiSphere Canvas) */}
      <div className="agent-workspace-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <strong style={{ fontSize: 16, color: '#0f172a' }}>12-Week Daily Balance Trajectory</strong>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              Comparison: <strong style={{ color: '#0f766e' }}>Expected Flow</strong> vs <strong style={{ color: '#d97706' }}>Pessimistic Scenario</strong> (late client payments, unchanged wage commitments)
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, fontSize: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0f766e' }}></div>
              <span style={{ fontWeight: 600, color: '#334155' }}>Expected Balance</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }}></div>
              <span style={{ fontWeight: 600, color: '#334155' }}>Pessimistic Balance</span>
            </div>
          </div>
        </div>

        {/* SVG Curve Canvas */}
        <div style={{ width: '100%', height: 220, position: 'relative', background: '#f8fafc', borderRadius: 8, padding: '16px 20px', border: '1px solid #e2e8f0' }}>
          {/* Y Axis Grid Lines */}
          <div style={{ position: 'absolute', left: 10, top: 20, fontSize: 10, color: '#94a3b8' }}>₹36.0L</div>
          <div style={{ position: 'absolute', left: 10, top: 80, fontSize: 10, color: '#94a3b8' }}>₹24.0L</div>
          <div style={{ position: 'absolute', left: 10, top: 140, fontSize: 10, color: '#94a3b8' }}>₹12.0L</div>
          <div style={{ position: 'absolute', left: 10, bottom: 20, fontSize: 10, color: '#ef4444', fontWeight: 700 }}>₹0k (Zero Buffer)</div>

          <svg viewBox="0 0 750 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Zero Buffer Threshold Red Line */}
            <line x1="0" y1="160" x2="750" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="700" y="155" fill="#ef4444" fontSize="10" fontWeight="bold">Zero Buffer</text>

            {/* Expected Balance Area & Path */}
            <path d={pointsToArea(expectedPoints)} fill="rgba(15, 118, 110, 0.12)" />
            <path d={pointsToPath(expectedPoints)} fill="none" stroke="#0f766e" strokeWidth="3" />

            {/* Pessimistic Balance Area & Path */}
            <path d={pointsToArea(pessimisticPoints)} fill="rgba(245, 158, 11, 0.15)" />
            <path d={pointsToPath(pessimisticPoints)} fill="none" stroke="#f59e0b" strokeWidth="2.5" />

            {/* Data points */}
            {expectedPoints.map((p, i) => (
              <circle key={`exp-${i}`} cx={p.x} cy={p.y} r="3.5" fill="#0f766e" />
            ))}
            {pessimisticPoints.map((p, i) => (
              <circle key={`pes-${i}`} cx={p.x} cy={p.y} r="3.5" fill="#f59e0b" />
            ))}
          </svg>
        </div>

        {/* AI Working Capital Safeguard */}
        {isShortfallRisk && (
          <div style={{ 
            marginTop: 16, 
            background: '#fff1f2', 
            border: '1px solid #fecdd3', 
            borderRadius: 8, 
            padding: '14px 18px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div>
              <strong style={{ color: '#9f1239', fontSize: 14 }}>
                ⚠️ Cashflow Alert: Projected shortfall of ₹{Math.abs(projectedMinBalance).toLocaleString()} detected
              </strong>
              <div style={{ fontSize: 12, color: '#be123c', marginTop: 2 }}>
                Client payment delay exceeds your site cash buffer. Use BuildForce Working Capital Credit to fund wages and cement orders without halting work.
              </div>
            </div>
            <button 
              onClick={() => onOpenAgent && onOpenAgent('credit')}
              style={{ 
                background: '#e11d48', 
                color: '#ffffff', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: 6, 
                fontSize: 12.5, 
                fontWeight: 700, 
                cursor: 'pointer' 
              }}
            >
              Draw ₹10L Credit Line (0% Interest) →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
