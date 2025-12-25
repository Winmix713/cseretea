import React from 'react';

interface StatBar {
  label: string;
  home: number;
  away: number;
  homeLabel: string;
  awayLabel: string;
}

interface MatchStatsProps {
  stats: StatBar[];
}

const MatchStats: React.FC<MatchStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-4">
      {stats.map((stat, index) => {
        const total = stat.home + stat.away;
        const homePercentage = (stat.home / total) * 100;
        const awayPercentage = (stat.away / total) * 100;

        return (
          <div key={index}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{stat.label}</span>
              <span className="text-white font-bold">{stat.homeLabel} - {stat.awayLabel}</span>
            </div>
            <div className="flex h-2 bg-black rounded-full overflow-hidden">
              <div className="bg-k-lime" style={{ width: `${homePercentage}%` }}></div>
              <div className="bg-gray-600" style={{ width: `${awayPercentage}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchStats;
