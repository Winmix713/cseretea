import React, { ReactNode } from 'react';

interface TeamDisplayProps {
  name: string;
  icon: ReactNode;
  position: 'home' | 'away';
  large?: boolean;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ name, icon, position, large = false }) => {
  const iconSize = large ? 'w-24 h-24' : 'w-20 h-20 md:w-24 md:h-24';
  const fontSize = large ? 'text-4xl' : 'text-2xl md:text-4xl';
  const animationClass = position === 'home'
    ? 'group-hover:translate-x-2'
    : 'group-hover:-translate-x-2';

  return (
    <div className={`flex flex-col items-center gap-4 w-1/3 ${animationClass} transition-transform duration-500`}>
      <div className={`${iconSize} rounded-full bg-gradient-to-br from-k-surfaceHighlight to-black border-2 border-k-borderDim flex items-center justify-center shadow-2xl relative transform hover:scale-110 transition-all duration-300`}>
        {icon}
        <div className="absolute -bottom-3 bg-k-surface border border-k-borderDim px-3 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
          {position}
        </div>
      </div>
      <h2 className={`${fontSize} font-extrabold text-white tracking-tight`}>{name}</h2>
    </div>
  );
};

export default TeamDisplay;
