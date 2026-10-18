import React from 'react';
import { ShieldCheck, Smartphone, Sliders, MessageSquare, Star, Zap, CheckCircle2, IndianRupee } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export function EnterpriseStats() {
  return (
    <>
      {/* Visual Live Picture Section - Tailored for Small Contractors */}
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
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>Daily Haazri & Overtime</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                Supervisors log worker attendance and overtime in 2 minutes. Saturday wage totals and advance cuts are 100% automated.
              </div>
            </div>

            <div style={{ textAlign: 'left', borderRight: '1px solid #e2e8f0', paddingRight: 16 }}>
              <div style={{ fontSize: 13, color: '#059669', fontWeight: 800 }}>02. STOP CASH BLEED</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>12-Week Cashflow Runway</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                Simulate homeowner payment delays before paying Saturday wages and local dealers. Never run out of cash on site.
              </div>
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, color: '#ea580c', fontWeight: 800 }}>03. ZERO UNPAID EXTRA WORK</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '8px 0' }}>WhatsApp Client Sign-offs</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                Homeowners approve extra false ceiling, tile or plumbing change orders directly on WhatsApp before work begins.
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
              No complex training. No weeks of setup. Your site team is up and running in 10 minutes directly on WhatsApp and mobile.
            </p>
          </div>

          <div className="enterprise-grid">
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                MOBILE-FIRST SIMPLICITY
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                Works on any Android phone or tablet on site, even with patchy 4G
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                WHATSAPP CONNECTED
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                Daily site photos, client sign-offs, and dealer POs dispatched via WhatsApp
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                ROLE-BASED VIEWS
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                Contractor has full financial control; supervisors see clean daily field tools
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>
                WORKING CAPITAL BUFFER
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                Instant ₹5L–₹50L credit line for emergency cement and Saturday wages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growing Every Small Builder: Stats */}
      <section className="stats-section">
        <h2 className="stats-title">Empowering 10,000+ Independent Builders & Trade Specialists</h2>
        
        <div className="stats-grid">
          <div>
            <div className="stat-item-number">12,400+</div>
            <div className="stat-item-label">
              Residential & Commercial Sites Delivered
            </div>
          </div>

          <div>
            <div className="stat-item-number">₹1.8 Cr+</div>
            <div className="stat-item-label">Daily Worker Wages Tracked & Disbursed</div>
          </div>

          <div>
            <div className="stat-item-number">98.4%</div>
            <div className="stat-item-label">Zero-Dispute Client Handover Rate</div>
          </div>
        </div>

        {/* Customer Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <div className="testimonial-quote">"{t.quote}"</div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
                <strong style={{ fontSize: 14, color: '#0f172a' }}>{t.author}</strong>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  {t.role}, {t.company} ({t.city})
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
