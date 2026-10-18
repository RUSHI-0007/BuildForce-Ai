import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Building2, Phone, User } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DemoRequestModal({ isOpen, onClose, onLaunchPortal }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    projectCount: '3-10 Projects'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: 8, 
              background: '#eb4d4b', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
                Take Demo with Construction AI Expert
              </h3>
              <p style={{ fontSize: 12, color: '#64748b' }}>
                For civil contractors and small builders running 1 to 10 active sites
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ fontSize: 22, color: '#64748b' }}>×</button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ 
              width: 60, 
              height: 60, 
              borderRadius: '50%', 
              background: '#ecfdf5', 
              color: '#059669', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px' 
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h4 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
              Demo Booked Successfully!
            </h4>
            <p style={{ color: '#475569', fontSize: 14, maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.5 }}>
              A BuildForce Construction Intelligence Specialist will contact you within 15 minutes to run your real CAD drawings through the 5 AI agents.
            </p>

            <button
              onClick={() => {
                onClose();
                onLaunchPortal();
              }}
              style={{ 
                background: '#2563eb', 
                color: '#fff', 
                padding: '12px 28px', 
                borderRadius: 8, 
                fontWeight: 700, 
                fontSize: 14,
                cursor: 'pointer' 
              }}
            >
              Explore Live 5 Agents Portal Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                Your Name *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#94a3b8' }} />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Mobile Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#94a3b8' }} />
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Company Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Apex Infra Pvt Ltd"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 4 }}>
                Active Construction Sites
              </label>
              <select 
                value={formData.projectCount}
                onChange={e => setFormData({ ...formData, projectCount: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, background: '#fff' }}
              >
                <option>1-2 Projects</option>
                <option>3-10 Projects</option>
                <option>10-25 Projects</option>
                <option>25+ Enterprise Projects</option>
              </select>
            </div>

            <div style={{ background: '#f8fafc', padding: 12, borderRadius: 6, fontSize: 12, color: '#475569' }}>
              ✓ Instant access to 5 AI agents • ₹50 Lakh working capital pre-qualification • 24x7 dedicated onboarding KAM
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
              <button 
                type="button" 
                onClick={onClose}
                style={{ padding: '10px 18px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, fontWeight: 600, fontSize: 13 }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={{ padding: '10px 24px', background: '#eb4d4b', color: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 14 }}
              >
                Confirm & Request Expert Walkthrough
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function VideoPlayerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 860, padding: 20, background: '#071530' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, background: '#eb4d4b', color: '#fff', padding: '2px 8px', borderRadius: 4, fontWeight: 800 }}>
              OFFICIAL FILM
            </span>
            <strong style={{ color: '#fff', fontSize: 16 }}>BuildForce - Introducing Construction AI Workforce</strong>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8', fontSize: 24, cursor: 'pointer' }}>×</button>
        </div>

        {/* Embedded YouTube Player */}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8 }}>
          <iframe 
            src="https://www.youtube.com/embed/QMVW19dqEPo?autoplay=1" 
            title="BuildForce - Introducing Construction AI Workforce" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </div>

        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#cbd5e1', fontSize: 12 }}>
          <span>Learn how 5 domain-trained AI agents eliminate project delays & protect margins.</span>
          <a 
            href="https://youtu.be/QMVW19dqEPo" 
            target="_blank" 
            rel="noreferrer"
            style={{ color: '#60a5fa', fontWeight: 600 }}
          >
            Open in YouTube ↗
          </a>
        </div>
      </div>
    </div>
  );
}
