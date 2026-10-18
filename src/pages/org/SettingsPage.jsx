import React, { useState } from 'react';
import { Settings, Database, Building2, User, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export function SettingsPage() {
  const { org, setOrg, user } = useAuth();
  const { resetToCleanWorkspace } = useApp();

  const [companyName, setCompanyName] = useState(org?.name || 'Omkar Infra & Builders');
  const [ownerName, setOwnerName] = useState(user?.name || 'Omkar Patil');
  const [city, setCity] = useState('Pune, Maharashtra');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setOrg(prev => ({ ...prev, name: companyName }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
          Organisation & System Settings
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Manage your construction firm profile, backend database credentials, and workspace preferences.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Business Profile */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} style={{ color: '#2563eb' }} />
            Contractor Company Profile
          </h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Firm / Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Contractor / Proprietor Name
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Primary Operating City / Region
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <button
                type="submit"
                style={{
                  padding: '9px 20px',
                  background: '#2563eb',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Save Profile
              </button>
              {saved && (
                <span style={{ fontSize: '13px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  <Check size={16} /> Saved!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Database & Supabase Status */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={18} style={{ color: '#10b981' }} />
            PostgreSQL & Backend Connection
          </h3>

          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
            The Express backend with full PostgreSQL Supabase schema is ready in <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#0f172a' }}>/Users/rushi/Projects/buildforce</code>.
            Once you paste your Supabase Project URL and Key into <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#0f172a' }}>.env</code>, all sites, tasks, and materials sync in real-time.
          </p>

          <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12.5px', color: '#334155' }}>
            <strong>Local Storage Status:</strong> Active & Persistent (Your contractor data is saved immediately in your browser, even without an active internet or database connection).
          </div>
        </div>

        {/* Workspace Reset */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #fee2e2',
          padding: '20px 24px'
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#dc2626', marginBottom: '8px' }}>
            Reset Workspace
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>
            Clear all sample data and start with an entirely clean, blank workspace for your actual projects.
          </p>
          <button
            onClick={() => {
              if (window.confirm('Reset all sites and data to start completely fresh?')) {
                resetToCleanWorkspace();
              }
            }}
            style={{
              padding: '8px 16px',
              background: '#fee2e2',
              color: '#dc2626',
              fontSize: '12.5px',
              fontWeight: '600',
              borderRadius: '6px',
              border: '1px solid #fca5a5',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} />
            <span>Reset to Clean Workspace</span>
          </button>
        </div>
      </div>
    </div>
  );
}
