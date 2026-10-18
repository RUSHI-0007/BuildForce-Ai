import React, { useState } from 'react';
import { Building2, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function LoginPage({ onLoginSuccess }) {
  const { signInWithGoogle, loginAsContractor } = useAuth();
  const [contractorName, setContractorName] = useState('Omkar Patil');
  const [companyName, setCompanyName] = useState('Omkar Infra & Builders');
  const [isQuickLoggingIn, setIsQuickLoggingIn] = useState(false);

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      onLoginSuccess?.();
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuickLogin = (e) => {
    e.preventDefault();
    setIsQuickLoggingIn(true);
    loginAsContractor({ name: contractorName, company: companyName });
    setTimeout(() => {
      setIsQuickLoggingIn(false);
      onLoginSuccess?.();
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0b1528 0%, #0f1d3b 100%)',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '440px',
        padding: '36px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
        }}>
          <Building2 size={28} />
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
          Welcome to BuildSite
        </h2>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 24px 0', lineHeight: 1.4 }}>
          The operating system for small builders & contractors. Track sites, materials, and daily haazri.
        </p>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogle}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            marginBottom: '20px'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.44 7.35 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.43l4.03-3.14z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.56 1.25 6.57l4.03 3.14c.95-2.83 3.6-4.96 6.72-4.96z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 20px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '11.5px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Or instant access</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        {/* Quick Access form */}
        <form onSubmit={handleQuickLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
              Your Name
            </label>
            <input
              type="text"
              required
              value={contractorName}
              onChange={(e) => setContractorName(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
              Firm / Contractor Company
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13px'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isQuickLoggingIn}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px',
              background: '#2563eb',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            <span>{isQuickLoggingIn ? 'Opening Portal...' : 'Open Contractor Command Center'}</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11.5px', color: '#64748b' }}>
          <ShieldCheck size={14} style={{ color: '#16a34a' }} />
          <span>Local database sync ready • 100% private</span>
        </div>
      </div>
    </div>
  );
}
