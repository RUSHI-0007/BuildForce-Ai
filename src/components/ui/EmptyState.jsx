import React from 'react';
import { PlusCircle } from 'lucide-react';

export function EmptyState({ 
  icon: Icon = PlusCircle, 
  title = "No items yet", 
  description = "Get started by creating your first entry.", 
  actionLabel = "Add New", 
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px dashed #cbd5e1',
      textAlign: 'center',
      maxWidth: '540px',
      margin: '24px auto'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: '#eff6ff',
        color: '#2563eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        <Icon size={28} />
      </div>

      <h3 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '8px'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '14px',
        color: '#64748b',
        maxWidth: '380px',
        lineHeight: 1.5,
        marginBottom: '20px'
      }}>
        {description}
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
          >
            <Icon size={16} />
            {actionLabel}
          </button>
        )}

        {onSecondaryAction && secondaryActionLabel && (
          <button
            onClick={onSecondaryAction}
            style={{
              padding: '10px 16px',
              background: '#f1f5f9',
              color: '#334155',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer'
            }}
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
