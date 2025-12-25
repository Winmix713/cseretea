import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'lime';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-surface-glass text-secondary border-border-dim',
    success: 'bg-emerald/15 text-emerald border-emerald/30',
    warning: 'bg-amber/15 text-amber border-amber/30',
    danger: 'bg-rose/15 text-rose border-rose/30',
    lime: 'bg-lime/20 text-lime-glow border-lime-glow/40',
  };

  const sizeClasses = {
    sm: 'text-[9px] px-2 py-0.75 h-5',
    md: 'text-[11px] px-2.5 py-1 h-6',
    lg: 'text-xs px-3.5 py-1.5 h-8',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.1em] rounded-full border backdrop-blur-sm shadow-neon-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-glow/50 focus:ring-offset-1 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
