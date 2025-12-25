import React from 'react';

interface MatchScoreProps {
  homeScore: number;
  awayScore: number;
  showStats?: boolean;
}

const MatchScore: React.FC<MatchScoreProps> = ({ homeScore, awayScore, showStats = false }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 px-8 py-4 rounded-2xl">
        <div className="flex items-center gap-6 md:gap-10 text-6xl md:text-8xl font-mono font-bold text-white leading-none tracking-tighter">
          <span className="w-[1ch] text-center bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">{homeScore}</span>
          <span className="text-k-lime text-4xl md:text-5xl animate-pulse self-center mb-2">:</span>
          <span className="w-[1ch] text-center bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">{awayScore}</span>
        </div>
      </div>
      {showStats && (
        <div className="mt-4 flex gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-k-textMuted uppercase font-bold">Possession</span>
            <span className="text-sm font-mono font-bold text-k-lime">64%</span>
          </div>
          <div className="w-px h-8 bg-k-borderDim"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-k-textMuted uppercase font-bold">Shots</span>
            <span className="text-sm font-mono font-bold text-white">12</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchScore;
