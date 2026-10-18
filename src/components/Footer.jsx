import React from 'react';

export function Footer({ onOpenDemoModal, onLaunchPortal }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="#17336B" />
              <path d="M12 9L29 20L12 31V9Z" fill="#2563EB" />
              <path d="M17 13L29 20L17 27V13Z" fill="#60A5FA" />
              <circle cx="28.5" cy="20" r="3.5" fill="#EB4D4B" />
            </svg>
            <span style={{ color: '#fff', fontWeight: 800 }}>BuildForce</span>
          </div>
          <p style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.6, maxWidth: 320, marginBottom: 16 }}>
            BuildForce is India's leading autonomous construction intelligence & AI workforce platform. Trusted by 40,000+ builders, contractors, and developers across India.
          </p>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            Headquarters: Sector 2, HSR Layout, Bengaluru, Karnataka 560102
          </div>
        </div>

        <div>
          <div className="footer-col-title">5 AI Agents</div>
          <ul className="footer-links">
            <li><a href="#estimation" onClick={onLaunchPortal}>Estimation & Takeoff AI</a></li>
            <li><a href="#project-manager" onClick={onLaunchPortal}>Project Manager & Quality AI</a></li>
            <li><a href="#planning-schedule" onClick={onLaunchPortal}>Planning & Schedule AI</a></li>
            <li><a href="#procurement" onClick={onLaunchPortal}>Procurement & Vendor AI</a></li>
            <li><a href="#credit" onClick={onLaunchPortal}>Credit & Working Capital AI</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Platform</div>
          <ul className="footer-links">
            <li><a href="#projects">Project Dashboard</a></li>
            <li><a href="#drawings">CAD & Drawing Viewer</a></li>
            <li><a href="#snags">Snags & Quality Inspection</a></li>
            <li><a href="#cashflow">Financials & Payments</a></li>
            <li><a href="#capital">BuildForce Capital (0% Credit)</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><a href="#about">Our Story</a></li>
            <li><a href="#careers">Careers (We're Hiring!)</a></li>
            <li><a href="#security">Security & ISO 27001</a></li>
            <li><a href="#contact" onClick={onOpenDemoModal}>Contact Sales</a></li>
            <li><a href="#privacy">Privacy & Terms</a></li>
          </ul>
        </div>
      </div>

      <div style={{ 
        maxWidth: 1160, 
        margin: '0 auto', 
        paddingTop: 24, 
        borderTop: '1px solid #1e293b', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        fontSize: 12,
        color: '#64748b'
      }}>
        <div>
          © {new Date().getFullYear()} BuildForce AI Technologies Private Limited. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <span>ISO 27001:2013 Certified</span>
          <span>SOC 2 Type II Aligned</span>
          <span>100% Indian Data Sovereignty</span>
        </div>
      </div>
    </footer>
  );
}
