import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, TrendingUp, AlertTriangle, CheckCircle, FileText, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

export function LandingHero({ onOpenDemoModal, onOpenVideoModal, onLaunchPortal }) {
  const [activeProjectMock, setActiveProjectMock] = useState('YC Tech Park');

  return (
    <section className="hero-section">
      <div className="hero-bg-blueprint"></div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <Sparkles size={16} />
          BUILT FOR SMALL CONTRACTORS & BUILDERS • 1 TO 10 SITES
        </div>

        <h1 className="hero-headline">
          EVERY SITE. EVERY WORKER. EVERY RUPEE.<br />
          Run your sites with AI. Zero corporate fluff.
        </h1>

        <p className="hero-subheadline">
          The all-in-one AI operating system designed specifically for independent civil contractors, residential builders, and trade specialists. Daily worker attendance, supervisor stock requisitions, 12-week cash runways, and 5 autonomous construction AI agents.
        </p>

        <div className="hero-cta-group">
          <button className="hero-btn-primary" onClick={onOpenDemoModal}>
            <span>Take Demo with Specialist</span>
            <ArrowRight size={17} />
          </button>
          
          <button className="hero-btn-workspace" onClick={onLaunchPortal}>
            <Sparkles size={16} style={{ color: '#eb4d4b' }} />
            <span>Launch Small Contractor Suite</span>
            <span style={{ fontSize: 11, background: '#2563eb', padding: '2px 8px', borderRadius: 4 }}>LIVE PORTAL</span>
          </button>

          <button 
            onClick={onOpenVideoModal}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8, 
              color: '#334155', 
              fontWeight: 600, 
              fontSize: 14,
              padding: '12px 18px',
              borderRadius: 6,
              background: '#ffffff',
              border: '1px solid #cbd5e1'
            }}
          >
            <div style={{ 
              width: 26, 
              height: 26, 
              borderRadius: '50%', 
              background: '#eb4d4b', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Play size={12} fill="white" style={{ marginLeft: 2 }} />
            </div>
            <span>Watch Film (2m)</span>
          </button>
        </div>

        {/* Interactive High-Fidelity Hero Dashboard Mockup - Small Contractor Reality */}
        <div className="hero-mockup-wrapper">
          {/* Mockup Top Window Bar */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingBottom: 16, 
            marginBottom: 20, 
            borderBottom: '1px solid #e2e8f0' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }}></div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ marginLeft: 8, fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                buildforce.ai/small-contractor-os
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                ● 2 SITES LIVE • 14 LABOUR
              </span>
              <span style={{ fontSize: 12, color: '#0f766e', fontWeight: 700 }}>
                Site A1: Kothrud Villa (G+2)
              </span>
            </div>
          </div>

          <div className="hero-mockup-grid">
            {/* Column 1: Pre-construction & S-Curve Variance */}
            <div className="hero-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div className="hero-card-header">
                  <span className="hero-card-title">Residential Takeoff & Bids</span>
                  <span style={{ fontSize: 11, color: '#0f766e', fontWeight: 700 }}>AI TAKEOFF</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ 
                    padding: '10px 12px', 
                    background: '#fff', 
                    borderRadius: 8, 
                    border: '1px solid #0f766e',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(15, 118, 110, 0.15)'
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Kothrud Residence Villa (G+2)</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>CAD Takeoff (3,400 sq.ft) • ₹18.50L BOQ</div>
                    </div>
                    <span style={{ fontSize: 11, background: '#0f766e', color: '#fff', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                      View BOQ ›
                    </span>
                  </div>

                  <div style={{ 
                    padding: '10px 12px', 
                    background: '#fff', 
                    borderRadius: 8, 
                    border: '1px solid #e2e8f0',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Katraj Commercial (6,800 sq.ft)</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>2nd Floor Slab Pour • ₹45.00L Contract</div>
                    </div>
                    <span style={{ fontSize: 11, background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                      Active Pour ›
                    </span>
                  </div>

                  <div style={{ 
                    padding: '10px 12px', 
                    background: '#fff', 
                    borderRadius: 8, 
                    border: '1px solid #e2e8f0',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Baner 3BHK Turnkey Interior</div>
                      <div style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>Quotation approved by Dr. Kulkarni</div>
                    </div>
                    <span style={{ fontSize: 11, background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                      APPROVED ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* S-Curve Planned vs Actual */}
              <div style={{ background: '#fff', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Site Progress vs Milestone</div>
                  <span style={{ fontSize: 11, background: '#fef2f2', color: '#dc2626', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                    3% variance (2 days lag)
                  </span>
                </div>
                
                {/* Visual S-Curve Graphic */}
                <div style={{ height: 75, position: 'relative', margin: '12px 0 6px' }}>
                  <svg width="100%" height="75" viewBox="0 0 300 75" preserveAspectRatio="none">
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="45" x2="300" y2="45" stroke="#f1f5f9" strokeWidth="1" />
                    <path d="M 0,65 Q 90,55 150,30 T 300,10" fill="none" stroke="#0f766e" strokeWidth="2.5" strokeDasharray="4 2" />
                    <path d="M 0,65 Q 80,60 145,42" fill="none" stroke="#eb4d4b" strokeWidth="3" />
                    <circle cx="145" cy="42" r="4.5" fill="#eb4d4b" />
                  </svg>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
                  <span>Planned: <strong style={{ color: '#0f766e' }}>65%</strong></span>
                  <span>Actual: <strong style={{ color: '#eb4d4b' }}>62% (-3%)</strong></span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>Reallocate 2 Masons ›</span>
                </div>
              </div>
            </div>

            {/* Column 2: Live Cashflow & Expense Breakdown */}
            <div className="hero-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="hero-card-header">
                  <span className="hero-card-title">12-Week Cashflow Runway</span>
                  <span style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>SAFE RUNWAY</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div style={{ background: '#fff', padding: 10, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 10, color: '#64748b' }}>Client Received</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a' }}>₹42.50 L</div>
                  </div>
                  <div style={{ background: '#fff', padding: 10, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 10, color: '#64748b' }}>Total Paid Out</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a' }}>₹36.80 L</div>
                  </div>
                </div>

                {/* Donut chart visualization */}
                <div style={{ 
                  background: '#fff', 
                  padding: 16, 
                  borderRadius: 8, 
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}>
                  <div style={{ position: 'relative', width: 70, height: 70 }}>
                    <svg width="70" height="70" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="3.8"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 14.8 21.8"
                        fill="none"
                        stroke="#0f766e"
                        strokeWidth="4"
                      />
                      <path
                        d="M32.8 23.8 a 15.9155 15.9155 0 0 1 -18.8 10.0"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="4"
                      />
                    </svg>
                    <div style={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      fontSize: 10,
                      fontWeight: 700
                    }}>
                      ₹6.50 L
                    </div>
                  </div>

                  <div style={{ fontSize: 11, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#0f766e', fontWeight: 600 }}>■ Material</span>
                      <strong>₹4.20 L</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>■ Labour Haazri</span>
                      <strong>₹1.85 L</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#f59e0b', fontWeight: 600 }}>■ Petty Cash/Rent</span>
                      <strong>₹0.45 L</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Capital Badge */}
              <div style={{ 
                background: '#ecfdf5', 
                border: '1px dashed #059669', 
                padding: '10px 12px', 
                borderRadius: 6,
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ fontSize: 11 }}>
                  <strong style={{ color: '#065f46' }}>₹15 Lakhs Revolving Credit</strong>
                  <div style={{ color: '#047857', fontSize: 10 }}>Instant UPI for Saturday wages</div>
                </div>
                <span style={{ fontSize: 11, background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                  DRAWDOWN
                </span>
              </div>
            </div>

            {/* Column 3: Mobile Site Update Stream (Exact match to supervisor field feed) */}
            <div className="hero-card" style={{ background: '#07142d', color: '#fff', border: '1px solid #152747' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }}></div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#34d399' }}>SUPERVISOR RUSHI (SITE A1)</span>
                </div>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>Today, 09:30 AM</span>
              </div>

              {/* Mobile Card Box */}
              <div style={{ 
                background: '#0d1f42', 
                borderRadius: 8, 
                padding: 12, 
                border: '1px solid #1a3366',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}>
                <div>
                  <div style={{ fontSize: 10, color: '#93c5fd' }}>Kothrud Site A1</div>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>First Floor Slab & Brickwork</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <div style={{ flex: 1, height: 5, background: '#1e3a6a', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: '68%', height: '100%', background: '#34d399' }}></div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700 }}>68%</span>
                    <span style={{ fontSize: 9, background: '#059669', padding: '1px 5px', borderRadius: 3 }}>ON TRACK</span>
                  </div>
                </div>

                <div style={{ fontSize: 11, color: '#cbd5e1', borderTop: '1px solid #1a3366', paddingTop: 8 }}>
                  <div><strong>Today's Haazri:</strong> 9 Workers (₹7,800 calculated)</div>
                  <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 2 }}>Supervisor photo synced via WhatsApp</div>
                </div>

                <div style={{ background: '#07142d', padding: 8, borderRadius: 6, fontSize: 10 }}>
                  <div style={{ color: '#93c5fd', fontWeight: 600, marginBottom: 2 }}>Material used:</div>
                  <div>• UltraTech Cement x 20 Bags (60 remaining)</div>
                  <div>• Red Bricks x 1,200 pieces</div>
                </div>

                <div style={{ 
                  background: '#2d1515', 
                  border: '1px solid #7f1d1d', 
                  borderRadius: 6, 
                  padding: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <AlertTriangle size={16} style={{ color: '#f87171' }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#fca5a5' }}>Requisition #req-1</div>
                    <div style={{ fontSize: 10, color: '#cbd5e1' }}>150 Cement bags requested for Tuesday pour</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={onLaunchPortal}
                style={{ 
                  marginTop: 12, 
                  width: '100%', 
                  background: '#0f766e', 
                  color: '#fff', 
                  padding: '9px 12px', 
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <span>Launch Contractor Command Center</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
