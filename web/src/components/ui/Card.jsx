import React from 'react';

/**
 * Reusable Card Primitive
 * @param {Object} props
 * @param {'default'|'bordered'|'subtle'|'elevated'} [props.variant='default']
 * @param {string|number} [props.padding='20px']
 * @param {React.ReactNode} props.children
 */
export function Card({
  variant = 'default',
  padding = '20px',
  children,
  onClick,
  style = {},
  className = '',
  ...rest
}) {
  const variantStyles = {
    default: {
      background: 'var(--color-bg-surface, #ffffff)',
      border: '1px solid var(--color-border, #e2e8f0)',
      boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.03))'
    },
    bordered: {
      background: 'var(--color-bg-surface, #ffffff)',
      border: '1px solid var(--color-border, #e2e8f0)',
      boxShadow: 'none'
    },
    subtle: {
      background: 'var(--color-bg-app, #f8fafc)',
      border: '1px solid var(--color-border, #e2e8f0)',
      boxShadow: 'none'
    },
    elevated: {
      background: 'var(--color-bg-surface, #ffffff)',
      border: '1px solid var(--color-border, #e2e8f0)',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))'
    }
  }[variant] || {};

  const baseStyle = {
    borderRadius: 'var(--radius-lg, 12px)',
    padding,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    cursor: onClick ? 'pointer' : 'default',
    ...variantStyles,
    ...style
  };

  return (
    <div
      onClick={onClick}
      style={baseStyle}
      className={`bf-card bf-card-${variant} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, style = {}, className = '', ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        ...style
      }}
      className={`bf-card-header ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, style = {}, className = '', ...rest }) {
  return (
    <h3
      style={{
        margin: 0,
        fontSize: '16px',
        fontWeight: '700',
        color: 'var(--color-text-main, #0f172a)',
        ...style
      }}
      className={`bf-card-title ${className}`}
      {...rest}
    >
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({ children, style = {}, className = '', ...rest }) {
  return (
    <p
      style={{
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: 'var(--color-text-muted, #64748b)',
        ...style
      }}
      className={`bf-card-description ${className}`}
      {...rest}
    >
      {children}
    </p>
  );
};

Card.Content = function CardContent({ children, style = {}, className = '', ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        ...style
      }}
      className={`bf-card-content ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, style = {}, className = '', ...rest }) {
  return (
    <div
      style={{
        marginTop: 'auto',
        paddingTop: '16px',
        borderTop: '1px solid var(--color-border, #e2e8f0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style
      }}
      className={`bf-card-footer ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
