import React from 'react';

export function EnterpriseStats() {
  return (
    <>
      {/* Realities for Small Contractors */}
      <section style={{ 
        background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', 
        padding: '80px 24px', 
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #cbd5e1'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ 
            textDecoration: 'line-through', 
            color: '#64748b', 
            fontSize: 17, 
            fontWeight: 600,
            marginBottom: 8 
          }}>
            lost diary entries, Saturday wage disputes, unpaid extra work
          </div>
          <h2 style={{ 
            fontSize: 36, 
            fontWeight: 800, 
            color: '#071530', 
            letterSpacing: -0.5,
            lineHeight: 1.25,
            marginBottom: 32
          }}>
            Total site control in your pocket. Built for contractors with 1 to 10 sites.
          </h2>

          <div style={{ 
            background: '#ffffff', 
            borderRadius: 16, 
            padding: '36px 24px', 
            border: '1px solid #cbd5e1', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24
          }}>
            <div style={{ textAlign: 'left', borderRight: '1px solid #e2e8f0', paddingRight: 16 }}>
              <div style={{ fontSize: 13, color: '#0f766e', fontWeight: 800 }}>01. ZERO POCKET DIARIES</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>Daily Haazri & Advances</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                Supervisors log worker attendance in 2 minutes. Saturday wage payouts and daily chai/kharcha deductions are automated.
              </div>
            </div>

            <div style={{ textAlign: 'left', borderRight: '1px solid #e2e8f0', paddingRight: 16 }}>
              <div style={{ fontSize: 13, color: '#059669', fontWeight: 800 }}>02. STOP CASH BLEED</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>12-Week Cashflow Runway</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                Simulate client payment delays before committing to dealer payables and Saturday wages. Never run out of cash on site.
              </div>
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, color: '#ea580c', fontWeight: 800 }}>03. ZERO DISCREPANCIES</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>3-Way Invoice Matching</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                Check billed quantity against gate delivery challans and PO rates before approving dealer payments.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field-Built Simplicity Section */}
      <section style={{ padding: '60px 24px', background: '#fff' }}>
        <div className="enterprise-section">
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#0f766e', letterSpacing: 1, textTransform: 'uppercase' }}>
              BUILT FOR THE FIELD • ZERO CORPORATE FLUFF
            </div>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginTop: 6 }}>
              Simple for Supervisors. Powerful for Contractors.
            </h3>
            <p style={{ color: '#475569', fontSize: 15, marginTop: 8 }}>
              No complex training. No enterprise bloat. Keep supervisors focused on daily site actuals while you maintain financial control.
            </p>
          </div>

          <div className="enterprise-grid">
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                MOBILE-FRIENDLY ENTRY
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                Quick entry forms for daily worker attendance, material inward, and site snags
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                WHATSAPP READY
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                One-tap RFQ requests and client progress summaries formatted for WhatsApp
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                CONTRACTOR VISIBILITY
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                See active sites, critical task float, and supplier payables in one dashboard
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                CREDIT READINESS AUDIT
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                Structured invoice matching, muster rolls, and cash records for future bank readiness
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflow Pillars */}
      <section className="stats-section">
        <h2 className="stats-title">The Three Live Operating Pillars</h2>
        
        <div className="stats-grid">
          <div>
            <div className="stat-item-number" style={{ color: '#10b981' }}>12 Weeks</div>
            <div className="stat-item-label">
              Day-by-Day Cash & Wage Runway Simulation
            </div>
          </div>

          <div>
            <div className="stat-item-number" style={{ color: '#fb923c' }}>3-Way</div>
            <div className="stat-item-label">PO vs Delivery Challan vs Invoice Verification</div>
          </div>

          <div>
            <div className="stat-item-number" style={{ color: '#38bdf8' }}>CPM</div>
            <div className="stat-item-label">Critical Path Schedule & Float Analysis</div>
          </div>
        </div>
      </section>
    </>
  );
}
