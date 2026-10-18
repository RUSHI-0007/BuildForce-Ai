import React from 'react';
import { Sparkles, ArrowRight, LayoutDashboard, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';

export function Navbar({ currentView, setCurrentView, onOpenDemoModal, onOpenVideoModal }) {
  return (
    <>
      {/* Top Notification Announcement Banner */}
      <div className="top-banner">
        <span className="top-banner-badge">NEW</span>
        <span>
          <strong>BuildForce for Small Contractors:</strong> EVERY SITE. EVERY WORKER. EVERY RUPEE. Powered by 5 construction AI agents.
        </span>
        <button 
          className="top-banner-btn"
          onClick={onOpenVideoModal}
          title="Watch the introducing video"
        >
          ▶ Watch Launch Video
        </button>
      </div>

      {/* Main Navbar */}
      <header className="navbar">
        {/* Brand Logo */}
        <div className="nav-brand" onClick={() => setCurrentView('landing')}>
          <div className="buildforce-logo-mark">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="#0B1C3E" />
              <path d="M12 9L29 20L12 31V9Z" fill="#2563EB" />
              <path d="M17 13L29 20L17 27V13Z" fill="#60A5FA" opacity="0.9" />
              <circle cx="28.5" cy="20" r="3.5" fill="#EB4D4B" />
            </svg>
          </div>
          <div className="nav-brand-text">
            <span>BuildForce</span>
            <span className="nav-brand-ai-pill">AI</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <div className="nav-item">
            Browse by Teams <ChevronDown size={14} />
          </div>
          <div className="nav-item">
            Solutions <ChevronDown size={14} />
          </div>
          <div 
            className="nav-item"
            style={{ color: currentView === 'portal' ? '#2563eb' : 'inherit', fontWeight: 600 }}
            onClick={() => setCurrentView('portal')}
          >
            <Sparkles size={15} style={{ color: '#eb4d4b', marginRight: 4 }} />
            5 AI Agents
          </div>
          <div className="nav-item">
            Resources <ChevronDown size={14} />
          </div>
          <div className="nav-item" onClick={onOpenVideoModal}>
            Video Tour
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {currentView === 'landing' ? (
            <button 
              className="btn-portal-toggle"
              onClick={() => setCurrentView('portal')}
              title="Open the BuildForce Small Contractor Workspace Portal"
            >
              <LayoutDashboard size={15} />
              <span>Contractor Portal</span>
              <span style={{ fontSize: 11, background: '#0f766e', padding: '1px 6px', borderRadius: 10 }}>LIVE</span>
            </button>
          ) : (
            <button 
              className="btn-secondary"
              onClick={() => setCurrentView('landing')}
            >
              ← Back to Overview
            </button>
          )}

          <button 
            className="btn-secondary"
            onClick={() => setCurrentView('portal')}
          >
            Login
          </button>

          <button 
            className="btn-coral"
            onClick={onOpenDemoModal}
          >
            <span>Take demo with Expert</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </header>
    </>
  );
}
