import React from 'react';

interface ProgressBarProps {
  percentage: number;
  color?: 'lime' | 'white' | 'success' | 'danger';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  color = 'lime',
  height = 'md',
  showLabel = false,
  label
}) => {
  const colorClasses = {
    lime: 'bg-k-lime',
    white: 'bg-white',
    success: 'bg-success',
    danger: 'bg-danger',
  };

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {showLabel && label && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">{label}</span>
          <span className="text-white font-bold">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-black rounded-full overflow-hidden border border-white/10 ${heightClasses[height]}`}>
        <div
          className={`${colorClasses[color]} ${heightClasses[height]} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
