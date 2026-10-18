import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, 
  Clock, AlertTriangle, TrendingUp, DollarSign, Building2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function FeaturesGrid({ onLaunchPortalWithAgent }) {
  const [procurementOrdered, setProcurementOrdered] = useState(false);

  const handlePlaceOrder = (e) => {
    e.stopPropagation();
    setProcurementOrdered(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section className="features-grid-section">
      <div className="features-grid-header">
        <h2 className="features-grid-title">
          Everything small contractors need to run 1 to 10 sites with 100% control
        </h2>
        <p style={{ color: '#64748b', fontSize: 16, marginTop: 12 }}>
          EVERY SITE. EVERY WORKER. EVERY RUPEE. Powered by 5 construction AI workforce agents and rugged site tools.
        </p>
      </div>

      <div className="bento-grid">
        {/* Card 1: Large Span 2 - ALL-IN-ONE MOBILE & DESKTOP APP */}
        <div className="bento-card-large">
          <div>
            <div className="bento-category">FIELD APP FOR CONTRACTORS & SUPERVISORS</div>
            <h3 className="bento-title">
              Get real-time site actuals and keep your cashflow and milestones on-track
            </h3>
            <p style={{ color: '#475569', fontSize: 14.5, lineHeight: 1.6, marginBottom: 24 }}>
              Empower your site supervisors with a simple mobile interface to log daily haazri, cement/sand counts, and progress photos—auto-collated into instant alerts for the contractor.
            </p>
            <button 
              className="btn-coral"
              onClick={() => onLaunchPortalWithAgent('project_manager')}
            >
              <span>Explore Contractor Field App</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Interactive Identified Issues Preview Card */}
          <div style={{ 
            background: '#ffffff', 
            borderRadius: 12, 
            border: '1px solid #cbd5e1', 
            padding: 20, 
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <strong style={{ fontSize: 13, color: '#0f172a' }}>Site A1 Kothrud Alerts</strong>
              <span style={{ fontSize: 11, background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                ● 3 days delay risk on 1st Floor Slab
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
              {/* Issue 1 */}
              <div style={{ background: '#f8fafc', padding: 10, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>Mason productivity lag on 1st Floor Brickwork</span>
                  <span style={{ color: '#dc2626' }}>×</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>
                  Planned: 65% • Actual: 58% <span style={{ color: '#dc2626', fontWeight: 600 }}>(7% lag)</span> • Mixer downtime
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11 }}>
                  <span style={{ color: '#0f766e', cursor: 'pointer', fontWeight: 700 }}>Transfer 2 Masons from Katraj</span>
                  <span style={{ color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>Accept revised date</span>
                </div>
              </div>

              {/* Issue 2 */}
              <div style={{ background: '#f8fafc', padding: 10, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>Low Stock Alert: Tuesday Slab Pour</span>
                  <span style={{ color: '#dc2626' }}>×</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, fontSize: 10, marginTop: 4, color: '#64748b' }}>
                  <span>MATERIAL</span>
                  <span>CURRENT</span>
                  <span>REQUIRED</span>
                  <span>DEFICIT</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, fontSize: 11, marginTop: 2 }}>
                  <span>UltraTech Cement</span>
                  <span>60 Bags</span>
                  <span>120 Bags</span>
                  <strong style={{ color: '#dc2626' }}>60 Bags</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, fontSize: 11, marginTop: 2 }}>
                  <span>Red Bricks</span>
                  <span>1,800 pcs</span>
                  <span>4,000 pcs</span>
                  <strong style={{ color: '#dc2626' }}>2,200 pcs</strong>
                </div>
                <span 
                  onClick={() => onLaunchPortalWithAgent('procurement')}
                  style={{ display: 'inline-block', marginTop: 6, color: '#0f766e', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
                >
                  Order Material via Local RFQ ›
                </span>
              </div>

              {/* Ask BuildForce AI input box */}
              <div style={{ 
                background: '#eff6ff', 
                border: '1px solid #bfdbfe', 
                borderRadius: 6, 
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#1e40af',
                fontSize: 12
              }}>
                <span>Ask BuildForce AI: "How much cement is needed for 280 sqm slab?"</span>
                <Sparkles size={14} style={{ color: '#2563eb' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: EXPERT ESTIMATION (Bungalow BOQ) */}
        <div className="bento-card-regular">
          <div>
            <div className="bento-category">RESIDENTIAL TAKEOFF AI</div>
            <h3 className="bento-title">
              Quote tenders 10x faster with automated CAD floor plan takeoffs
            </h3>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
              AI scans residential bungalow and commercial drawings to draft detailed Bills of Quantities (BOQ) with source geometry citations.
            </p>

            {/* Table Mockup */}
            <div style={{ 
              background: '#fff', 
              borderRadius: 8, 
              border: '1px solid #e2e8f0', 
              overflow: 'hidden', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              fontSize: 11 
            }}>
              <div style={{ 
                background: '#eff6ff', 
                padding: '6px 12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderBottom: '1px solid #bfdbfe'
              }}>
                <span style={{ fontWeight: 700, color: '#1e40af' }}>Kothrud Residence (3,400 sq.ft)</span>
                <span style={{ color: '#64748b' }}>4.2 min AI scan</span>
              </div>
              <div style={{ padding: '6px 12px', background: '#f8fafc', color: '#0f172a', fontWeight: 600, borderBottom: '1px solid #e2e8f0' }}>
                Quantity take-off and estimations are ready on your BOQ
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#64748b' }}>
                    <th style={{ padding: '6px 10px' }}>DWG #</th>
                    <th style={{ padding: '6px 10px' }}>DESCRIPTION</th>
                    <th style={{ padding: '6px 10px' }}>QTY</th>
                    <th style={{ padding: '6px 10px' }}>RATE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>A-3</td>
                    <td style={{ padding: '6px 10px' }}>5" Concrete slab & beams</td>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>48 cum</td>
                    <td style={{ padding: '6px 10px' }}>₹6,800</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>A-3</td>
                    <td style={{ padding: '6px 10px' }}>9" External red brickwork</td>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>112 cum</td>
                    <td style={{ padding: '6px 10px' }}>₹5,200</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>S-02</td>
                    <td style={{ padding: '6px 10px' }}>Fe550D TMT Steel Rebar</td>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>4.8 MT</td>
                    <td style={{ padding: '6px 10px' }}>₹62,500</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>A-4</td>
                    <td style={{ padding: '6px 10px' }}>Internal Neeru Plaster</td>
                    <td style={{ padding: '6px 10px', fontWeight: 600 }}>680 sqm</td>
                    <td style={{ padding: '6px 10px' }}>₹340</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button 
            onClick={() => onLaunchPortalWithAgent('estimation')}
            style={{ 
              marginTop: 16, 
              color: '#0f766e', 
              fontWeight: 700, 
              fontSize: 13, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6 
            }}
          >
            <span>Open Takeoff Agent</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 3: END-TO-END LOCAL PROCUREMENT */}
        <div className="bento-card-regular">
          <div>
            <div className="bento-category">LOCAL HARDWARE DEPOT RFQ</div>
            <h3 className="bento-title">
              Compare 3 local dealer quotes. Save on cement, steel & pipes
            </h3>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
              Compare rates across local suppliers, secure contractor credit terms, and dispatch POs directly via WhatsApp.
            </p>

            {/* Vendor Quote Matrix Mockup */}
            <div style={{ 
              background: '#fff', 
              borderRadius: 8, 
              border: '1px solid #e2e8f0', 
              overflow: 'hidden', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              fontSize: 11 
            }}>
              <div style={{ 
                background: '#eff6ff', 
                padding: '6px 12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderBottom: '1px solid #bfdbfe'
              }}>
                <span style={{ fontWeight: 700, color: '#1e40af' }}>Local Hardware RFQ (Kothrud)</span>
                <span style={{ color: '#64748b' }}>Quote Comparison</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#64748b' }}>
                    <th style={{ padding: '6px 8px' }}>MATERIAL</th>
                    <th style={{ padding: '6px 8px' }}>QTY</th>
                    <th style={{ padding: '6px 8px', color: '#0f766e', fontWeight: 800 }}>MAHALAXMI</th>
                    <th style={{ padding: '6px 8px' }}>BALAJI</th>
                    <th style={{ padding: '6px 8px' }}>PUNE MART</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 8px', fontWeight: 600 }}>UltraTech 53 Cement</td>
                    <td style={{ padding: '6px 8px' }}>150 Bags</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: '#059669' }}>₹365</td>
                    <td style={{ padding: '6px 8px' }}>₹372</td>
                    <td style={{ padding: '6px 8px' }}>₹385</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 8px', fontWeight: 600 }}>CPVC Pipes 1" (3m)</td>
                    <td style={{ padding: '6px 8px' }}>60 pcs</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: '#059669' }}>₹85</td>
                    <td style={{ padding: '6px 8px' }}>₹88</td>
                    <td style={{ padding: '6px 8px' }}>₹92</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 8px', fontWeight: 600 }}>Delivery SLA</td>
                    <td style={{ padding: '6px 8px' }}>-</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>Today (3 hrs)</td>
                    <td style={{ padding: '6px 8px' }}>Tomorrow AM</td>
                    <td style={{ padding: '6px 8px' }}>In 2 days</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 8px', fontWeight: 600 }}>Credit Terms</td>
                    <td style={{ padding: '6px 8px' }}>-</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700, color: '#0f766e' }}>15 Days Credit</td>
                    <td style={{ padding: '6px 8px' }}>7 Days Credit</td>
                    <td style={{ padding: '6px 8px' }}>100% Adv</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ 
                padding: '8px 12px', 
                background: '#f8fafc', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderTop: '1px solid #e2e8f0'
              }}>
                <div>
                  <span style={{ fontSize: 10, color: '#64748b' }}>Order Amount: </span>
                  <strong style={{ fontSize: 13, color: '#0f172a' }}>₹54,750</strong>
                  <span style={{ marginLeft: 6, fontSize: 10, background: '#ecfdf5', color: '#059669', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>
                    Saving ₹4,500
                  </span>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  style={{ 
                    background: procurementOrdered ? '#10b981' : '#0f766e', 
                    color: '#fff', 
                    padding: '5px 12px', 
                    borderRadius: 4, 
                    fontWeight: 700,
                    fontSize: 11
                  }}
                >
                  {procurementOrdered ? 'PO Dispatched ✓' : 'Dispatch PO'}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onLaunchPortalWithAgent('procurement')}
            style={{ 
              marginTop: 16, 
              color: '#0f766e', 
              fontWeight: 700, 
              fontSize: 13, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6 
            }}
          >
            <span>Open Procurement Agent</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 4: REVOLVING CREDIT FOR SMALL CONTRACTORS */}
        <div className="bento-card-regular">
          <div>
            <div className="bento-category">CONTRACTOR WORKING CAPITAL</div>
            <h3 className="bento-title">
              Instant UPI credit line to pay Saturday labour & suppliers
            </h3>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
              Never let delayed homeowner checks halt your masons. Draw instant liquidity directly into your contractor bank account.
            </p>

            <div style={{ 
              background: '#ecfdf5', 
              border: '1px solid #a7f3d0', 
              borderRadius: 10, 
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: '#065f46', fontWeight: 700 }}>CONTRACTOR CREDIT LINE</span>
                <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>Instant UPI Available</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>
                Unlocked <span style={{ color: '#059669' }}>₹15 Lakhs credit facility</span> for your active sites
              </div>
              <div style={{ fontSize: 11, color: '#475569' }}>
                • 0% interest for first 30 days<br />
                • 1-click UPI payout for Saturday labour haazri<br />
                • Repay seamlessly when client milestone check clears
              </div>
            </div>
          </div>

          <button 
            onClick={() => onLaunchPortalWithAgent('credit_cashflow')}
            style={{ 
              marginTop: 16, 
              color: '#0f766e', 
              fontWeight: 700, 
              fontSize: 13, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6 
            }}
          >
            <span>Manage Working Capital</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 5: WHATSAPP-NATIVE ONBOARDING */}
        <div className="bento-card-regular">
          <div>
            <div className="bento-category">RUGGED SITE ADOPTION</div>
            <h3 className="bento-title">
              Field-tested for supervisors. Zero typing required
            </h3>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
              Supervisors can use simple WhatsApp voice notes, photo uploads, and 1-tap check-in buttons in Hindi, Marathi, and English.
            </p>

            <div style={{ 
              background: '#ffffff', 
              border: '1px solid #e2e8f0', 
              borderRadius: 10, 
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#1e293b' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Supervisors onboarded in 10 minutes directly on their phone</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#1e293b' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Daily worker haazri logged with single-tap present/absent</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#1e293b' }}>
                <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                <span>Automated Sunday PDF summary sent to contractor WhatsApp</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onLaunchPortalWithAgent('project_manager')}
            style={{ 
              marginTop: 16, 
              color: '#0f766e', 
              fontWeight: 700, 
              fontSize: 13, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 6 
            }}
          >
            <span>Explore Supervisor Tools</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
