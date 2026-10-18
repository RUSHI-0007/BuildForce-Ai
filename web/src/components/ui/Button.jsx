import React from 'react';

/**
 * Reusable Button Primitive
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'|'success'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ElementType} [props.icon]
 * @param {React.ReactNode} props.children
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon: Icon,
  disabled = false,
  type = 'button',
  children,
  onClick,
  style = {},
  className = '',
  ...rest
}) {
  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '12px', height: '32px' },
    md: { padding: '8px 16px', fontSize: '13.5px', height: '38px' },
    lg: { padding: '12px 20px', fontSize: '15px', height: '46px' }
  }[size] || { padding: '8px 16px', fontSize: '13.5px', height: '38px' };

  const variantStyles = {
    primary: {
      background: 'var(--color-primary, #2563eb)',
      color: '#ffffff',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'var(--color-bg-subtle, #f1f5f9)',
      color: 'var(--color-text-main, #0f172a)',
      border: '1px solid var(--color-border, #e2e8f0)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-text-main, #0f172a)',
      border: '1px solid var(--color-border, #e2e8f0)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-main, #0f172a)',
      border: '1px solid transparent'
    },
    danger: {
      background: 'var(--color-danger, #ef4444)',
      color: '#ffffff',
      border: '1px solid transparent'
    },
    success: {
      background: 'var(--color-success, #10b981)',
      color: '#ffffff',
      border: '1px solid transparent'
    }
  }[variant] || {};

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-md, 8px)',
    fontWeight: '600',
    fontFamily: 'inherit',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.65 : 1,
    transition: 'all 0.15s ease',
    width: fullWidth ? '100%' : 'auto',
    lineHeight: 1,
    outline: 'none',
    boxSizing: 'border-box',
    ...sizeStyles,
    ...variantStyles,
    ...style
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={baseStyle}
      className={`bf-button bf-button-${variant} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      ) : null}
      {children}
    </button>
  );
}

export default Button;
