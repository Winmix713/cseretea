import React from 'react';

interface StatusDotProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const StatusDot: React.FC<StatusDotProps> = ({
  status,
  size = 'md',
  animate = true
}) => {
  const statusColors = {
    online: 'bg-success',
    offline: 'bg-gray-500',
    away: 'bg-warning',
    busy: 'bg-danger',
  };

  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const animateClass = animate && status === 'online' ? 'animate-pulse' : '';

  return (
    <span
      className={`inline-block rounded-full ${statusColors[status]} ${sizeClasses[size]} ${animateClass}`}
    />
  );
};

export default StatusDot;
