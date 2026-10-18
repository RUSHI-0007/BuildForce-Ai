import React from 'react';

export function StatsCard({ title, value, subtitle, icon: Icon, color = '#2563eb', trend }) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '10px',
      padding: '18px 20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: '220px',
      flex: 1
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div>
        <div style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          {value}
        </div>
        {(subtitle || trend) && (
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {trend && (
              <span style={{ fontWeight: '600', color: trend.positive ? '#16a34a' : '#dc2626' }}>
                {trend.value}
              </span>
            )}
            <span>{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}
