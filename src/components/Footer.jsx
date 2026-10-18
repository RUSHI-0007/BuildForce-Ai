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
            <span style={{ color: '#fff', fontWeight: 800 }}>BuildForce AI</span>
          </div>
          <p style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.6, maxWidth: 320, marginBottom: 16 }}>
            Operational software and intelligent assistance designed specifically for independent civil contractors, small residential builders, and trade specialists running 1 to 10 sites.
          </p>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            Built for small contractors across India.
          </div>
        </div>

        <div>
          <div className="footer-col-title">AI Agents</div>
          <ul className="footer-links">
            <li><a href="#cash" onClick={() => onLaunchPortal('cash')}>Cash & Bills AI (Live)</a></li>
            <li><a href="#procurement" onClick={() => onLaunchPortal('procurement')}>Procurement & RFQ AI (Live)</a></li>
            <li><a href="#scheduler" onClick={() => onLaunchPortal('scheduler')}>Site Scheduler & PM AI (Live)</a></li>
            <li><a href="#estimator" onClick={() => onLaunchPortal('estimator')}>Estimator & Takeoff (Building)</a></li>
            <li><a href="#quality" onClick={() => onLaunchPortal('quality')}>Quality & Snags (Building)</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Core Modules</div>
          <ul className="footer-links">
            <li><a href="#projects" onClick={() => onLaunchPortal('sites')}>Site Dashboard</a></li>
            <li><a href="#materials" onClick={() => onLaunchPortal('materials')}>Materials & Stock Inward</a></li>
            <li><a href="#labour" onClick={() => onLaunchPortal('labour')}>Daily Worker Haazri & Wages</a></li>
            <li><a href="#cashflow" onClick={() => onLaunchPortal('cashflow')}>12-Week Cashflow Planner</a></li>
            <li><a href="#invoices" onClick={() => onLaunchPortal('cash')}>3-Way Invoice Audit</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">System & Security</div>
          <ul className="footer-links">
            <li><a href="#security">Row Level Security (Supabase)</a></li>
            <li><a href="#privacy">Local Browser Storage Mode</a></li>
            <li><a href="#contact" onClick={onOpenDemoModal}>Contact Support</a></li>
          </ul>
        </div>
      </div>

      <div style={{ 
        maxWidth: 1160, 
        margin: '36px auto 0 auto', 
        paddingTop: 20, 
        borderTop: '1px solid #1e293b', 
        display: 'flex', 
        justifyContent: 'space-between',
        fontSize: 12,
        color: '#64748b',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>© {new Date().getFullYear()} BuildForce AI. Real site numbers, zero fake statistics.</div>
        <div>Designed for small civil contractors with 1 to 10 active sites.</div>
      </div>
    </footer>
  );
}
