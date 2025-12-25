import React from 'react';
import { StatMetrics } from '../../hooks/useStatMetrics';
import { TrendingUp, Activity, Calendar, Zap } from 'lucide-react';

interface StatCardPopoverProps {
  title: string;
  metrics: StatMetrics;
}

const StatCardPopover: React.FC<StatCardPopoverProps> = ({ title, metrics }) => {
  return (
    <div className="glass-card-sm p-1 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Popover Header */}
      <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
        <h4 className="text-xs font-bold text-white uppercase tracking-widest">{title} Analysis</h4>
        <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-pulse"></span>
      </div>

      {/* Data Grid */}
      <div className="p-4 space-y-4">

        <div className="grid grid-cols-2 gap-3">
           <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-white/5">
              <div className="flex items-center gap-1.5 mb-1 text-zinc-500 text-[10px] uppercase font-bold">
                 <Zap className="w-3 h-3" /> Current
              </div>
              <div className="text-lg font-mono font-bold text-white">{metrics.current}</div>
           </div>

           <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-white/5">
              <div className="flex items-center gap-1.5 mb-1 text-zinc-500 text-[10px] uppercase font-bold">
                 <Activity className="w-3 h-3" /> Avg
              </div>
              <div className="text-lg font-mono font-bold text-zinc-300">{metrics.average}</div>
           </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/5">
           <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 flex items-center gap-2">
                 <Calendar className="w-3 h-3" /> Last Match
              </span>
              <span className="font-mono text-white">{metrics.lastMatch}</span>
           </div>

           <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 flex items-center gap-2">
                 <TrendingUp className="w-3 h-3" /> Trend Direction
              </span>
              <span className="font-bold text-[#BEF264] bg-[#BEF264]/10 px-1.5 py-0.5 rounded">
                 {metrics.trend}
              </span>
           </div>
        </div>

        {/* Insight Box */}
        <div className="bg-gradient-to-r from-zinc-900 to-transparent p-3 rounded-lg border-l-2 border-[#BEF264]">
           <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
              <span className="text-white font-bold block mb-0.5 text-[10px] uppercase opacity-70">AI Insight</span>
              {metrics.insight}
           </p>
        </div>

      </div>
    </div>
  );
};

export default StatCardPopover;