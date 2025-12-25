import React from 'react';

interface LiveIndicatorProps {
  time?: string;
  label?: string;
  variant?: 'default' | 'small';
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  time,
  label = 'LIVE',
  variant = 'default'
}) => {
  if (variant === 'small') {
    return (
      <div className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-danger animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-k-limeLight border border-k-limeBorder text-k-lime text-sm font-bold font-mono">
      <span className="animate-pulse">●</span>
      {time || label}
    </div>
  );
};

export default LiveIndicator;
