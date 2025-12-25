import React from 'react';
import { Home, Shield, Activity, Zap } from 'lucide-react';
import HeadlessDialog from '../ui/HeadlessDialog';
import MatchScore from './MatchScore';
import TeamDisplay from './TeamDisplay';
import MatchStats from './MatchStats';

interface MatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  homeScore: number;
  awayScore: number;
}

const MatchDialog: React.FC<MatchDialogProps> = ({ isOpen, onClose, homeScore, awayScore }) => {
  const matchStats = [
    { label: 'Possession', home: 64, away: 36, homeLabel: '64%', awayLabel: '36%' },
    { label: 'Shots', home: 18, away: 7, homeLabel: '18', awayLabel: '7' },
    { label: 'Shots on Target', home: 6, away: 3, homeLabel: '6', awayLabel: '3' },
    { label: 'Pass Accuracy', home: 91, away: 78, homeLabel: '91%', awayLabel: '78%' },
  ];

  const advancedMetrics = [
    { label: 'Expected Goals (xG)', value: '2.42 - 0.87' },
    { label: 'Corners', value: '8 - 3' },
    { label: 'Fouls', value: '9 - 14' },
    { label: 'Offsides', value: '2 - 5' },
    { label: 'Yellow Cards', value: '1 - 3' },
    { label: 'Red Cards', value: '0 - 0' },
  ];

  const timeline = [
    { time: '72:43', event: 'Liverpool attacking in final third', active: true },
    { time: '65:12', event: 'M. Salah shot saved by goalkeeper', active: false },
    { time: '58:34', event: 'Goal! M. Salah ⚽', active: false },
    { time: '45:00', event: 'Second Half begins', active: false },
  ];

  return (
    <HeadlessDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Match Analysis - Liverpool vs Real Madrid"
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <TeamDisplay
            name="LIV"
            icon={<Home className="w-12 h-12 text-white" />}
            position="home"
            large
          />

          <div className="flex flex-col items-center justify-center">
            <MatchScore homeScore={homeScore} awayScore={awayScore} />
            <div className="mt-2 flex items-center gap-2 px-4 py-1 rounded-full bg-k-limeLight border border-k-limeBorder text-k-lime text-sm font-bold font-mono">
              <span className="animate-pulse">●</span> 72:43
            </div>
          </div>

          <TeamDisplay
            name="RMA"
            icon={<Shield className="w-12 h-12 text-white" />}
            position="away"
            large
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-k-surfaceHighlight border border-k-borderLight rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-k-lime" />
              Match Statistics
            </h4>
            <MatchStats stats={matchStats} />
          </div>

          <div className="bg-k-surfaceHighlight border border-k-borderLight rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-k-lime" />
              Advanced Metrics
            </h4>
            <div className="space-y-3">
              {advancedMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{metric.label}</span>
                  <span className="text-sm font-bold text-white">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-k-surfaceHighlight border border-k-borderLight rounded-xl p-5">
          <h4 className="text-sm font-bold text-white mb-4">Match Timeline</h4>
          <div className="space-y-3">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-12 text-xs font-mono font-bold ${item.active ? 'text-k-lime' : 'text-gray-400'}`}>
                  {item.time}
                </div>
                <div className={`flex-1 text-sm ${item.active ? 'text-white' : 'text-gray-400'}`}>
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HeadlessDialog>
  );
};

export default MatchDialog;
