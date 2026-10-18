import React from 'react';

/**
 * Reusable Badge Primitive
 * @param {Object} props
 * @param {'neutral'|'primary'|'success'|'warning'|'danger'|'info'} [props.variant='neutral']
 * @param {'sm'|'md'} [props.size='sm']
 * @param {boolean} [props.dot=false]
 * @param {React.ReactNode} props.children
 */
export function Badge({
  variant = 'neutral',
  size = 'sm',
  dot = false,
  children,
  style = {},
  className = '',
  ...rest
}) {
  const variantStyles = {
    neutral: {
      background: 'var(--color-bg-subtle, #f1f5f9)',
      color: 'var(--color-text-muted, #475569)',
      border: '1px solid var(--color-border, #e2e8f0)',
      dotColor: '#94a3b8'
    },
    primary: {
      background: 'var(--color-primary-light, #eff6ff)',
      color: 'var(--color-primary, #2563eb)',
      border: '1px solid #bfdbfe',
      dotColor: '#2563eb'
    },
    success: {
      background: 'var(--color-success-bg, #ecfdf5)',
      color: 'var(--color-success, #059669)',
      border: '1px solid var(--color-success-border, #a7f3d0)',
      dotColor: '#10b981'
    },
    warning: {
      background: 'var(--color-warning-bg, #fffbeb)',
      color: '#b45309',
      border: '1px solid var(--color-warning-border, #fde68a)',
      dotColor: '#f59e0b'
    },
    danger: {
      background: 'var(--color-danger-bg, #fef2f2)',
      color: 'var(--color-danger, #ef4444)',
      border: '1px solid var(--color-danger-border, #fecaca)',
      dotColor: '#ef4444'
    },
    info: {
      background: 'var(--color-info-bg, #f0f9ff)',
      color: 'var(--color-info, #0284c7)',
      border: '1px solid var(--color-info-border, #bae6fd)',
      dotColor: '#0284c7'
    }
  }[variant] || {};

  const sizeStyles = {
    sm: { padding: '2px 8px', fontSize: '11px', height: '22px' },
    md: { padding: '4px 10px', fontSize: '12.5px', height: '26px' }
  }[size] || { padding: '2px 8px', fontSize: '11px', height: '22px' };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: 'var(--radius-full, 9999px)',
    fontWeight: '700',
    lineHeight: 1,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    boxSizing: 'border-box',
    ...sizeStyles,
    ...variantStyles,
    ...style
  };

  return (
    <span
      style={baseStyle}
      className={`bf-badge bf-badge-${variant} ${className}`}
      {...rest}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: variantStyles.dotColor || 'currentColor',
            display: 'inline-block'
          }}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
