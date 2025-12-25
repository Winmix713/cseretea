import React, { useState } from 'react';
import { Sparkles, TrendingUp, ChevronRight, Target, Activity, Zap, TrendingDown, Info } from 'lucide-react';
import HeadlessDialog from '../ui/HeadlessDialog';

// Segédkomponens a "Stat Bar"-hoz a dialogon belül
const FactorBar = ({ label, value, color = 'bg-[#BEF264]' }: { label: string; value: string; color?: string }) => {
  const width = value.includes('%') ? value : '50%'; // Egyszerűsített logika a szélességhez

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">{label}</span>
        <span className="text-xs font-bold text-white font-mono">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-white/5 relative">
        <div 
          className={`h-full ${color} shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-out`} 
          style={{ width }} 
        />
      </div>
    </div>
  );
};

const WinProbabilityCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* --- MAIN CARD --- */}
      <div className="h-full glass-card group relative flex flex-col justify-between p-6 md:p-8 cursor-default">

        {/* Ambient Glow Effects (Background) */}
        <div className="absolute top-0 right-0 p-32 bg-[#BEF264] opacity-[0.02] blur-[80px] rounded-full pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500" />

        {/* HEADER SECTION */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#BEF264]/20 to-[#BEF264]/5 border border-[#BEF264]/20 flex items-center justify-center shadow-neon-xs group-hover:shadow-neon-md transition-all duration-300">
              <Sparkles className="w-6 h-6 text-[#BEF264] fill-[#BEF264]/20" />
            </div>

            {/* Live Indicator Badge */}
            <div className="flex flex-col items-end gap-1">
               <span className="live-pulse">
                AI Live
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">v2.1.0</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 leading-tight">Win Probability</h3>
          <p className="text-sm text-zinc-400 text-pretty leading-relaxed">
            Real-time outcome prediction based on xG momentum & field tilt.
          </p>
        </div>

        {/* DATA VISUALIZATION SECTION */}
        <div className="relative z-10 mt-8 space-y-5">

          {/* Main Percentage Display */}
          <div className="flex justify-between items-end">
            <div className="flex items-baseline gap-1.5">
              <span className="text-6xl font-bold text-white tracking-tighter font-mono shadow-black drop-shadow-lg">
                78
              </span>
              <span className="text-2xl text-[#BEF264] font-bold">%</span>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#BEF264]/10 border border-[#BEF264]/20 text-[#BEF264]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold tabular-nums">+4.2%</span>
            </div>
          </div>

          {/* The "Laser Beam" Progress Bar */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-[#0A0A0A] rounded-full p-0.5 border border-white/10 shadow-inner relative overflow-hidden">
              {/* Home Segment */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#BEF264] to-[#aadd00] shadow-[0_0_20px_rgba(190,242,100,0.4)] transition-all duration-1000 ease-out z-20"
                style={{ width: '78%', borderRadius: '99px 0 0 99px' }}
              >
                 <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white mix-blend-overlay"></div>
              </div>

              {/* Draw Segment (Middle) */}
              <div 
                className="absolute left-[78%] top-0 bottom-0 bg-zinc-700 transition-all duration-1000 ease-out z-10"
                style={{ width: '12%' }}
              />

              {/* Away Segment (implicit remainder, but styled for border) */}
            </div>

            {/* Legend Labels */}
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
              <span className="text-[#BEF264] drop-shadow-[0_0_8px_rgba(190,242,100,0.5)]">Home (78%)</span>
              <span className="text-zinc-400">Draw (12%)</span>
              <span className="text-zinc-600">Away (10%)</span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="w-full mt-8 py-3.5 px-4 rounded-xl bg-white/[0.03] hover:bg-[#BEF264] hover:text-black text-zinc-300 text-sm font-semibold transition-all duration-300 flex items-center justify-between group/btn border border-white/10 hover:border-[#BEF264] hover:shadow-[0_0_30px_rgba(190,242,100,0.3)]"
        >
          <span>View Detailed Model</span>
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>

      {/* --- DETAILED DIALOG --- */}
      <HeadlessDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="AI Prediction Model"
        size="lg"
      >
        <div className="space-y-8">

          {/* Top Cards: The 3 Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Home Card */}
            <div className="bg-gradient-to-b from-[#BEF264]/10 to-transparent border border-[#BEF264]/30 rounded-2xl p-5 relative overflow-hidden">
               <div className="absolute inset-0 bg-[#BEF264]/5 blur-xl"></div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-[#BEF264]" />
                    <span className="text-xs font-bold text-[#BEF264] uppercase tracking-wider">Home Win</span>
                  </div>
                  <div className="text-4xl font-mono font-bold text-white mb-1">78%</div>
                  <div className="text-xs text-[#BEF264]/80 font-medium">+4.2% momentum</div>
               </div>
            </div>

            {/* Draw Card */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Draw</span>
              </div>
              <div className="text-4xl font-mono font-bold text-zinc-300 mb-1">12%</div>
              <div className="text-xs text-zinc-500 font-medium">-1.5% stable</div>
            </div>

            {/* Away Card */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Away Win</span>
              </div>
              <div className="text-4xl font-mono font-bold text-zinc-300 mb-1">10%</div>
              <div className="text-xs text-rose-500 font-medium flex items-center gap-1">
                 <TrendingDown className="w-3 h-3" /> -2.7% drop
              </div>
            </div>
          </div>

          {/* Model Factors Section */}
          <div className="glass-card-sm p-6 rounded-2xl border border-white/5">
            <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#BEF264]" />
              Dominant Factors
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FactorBar label="Expected Goals (xG)" value="2.42 vs 0.87" />
              <FactorBar label="Possession Control" value="64%" />
              <FactorBar label="Shot Accuracy" value="89%" />
              <FactorBar label="Field Tilt (Attacking 3rd)" value="71%" />
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex flex-wrap gap-4 items-center justify-between text-xs text-zinc-500 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
             <div className="flex gap-6">
                <div>
                   <span className="block text-zinc-600 mb-0.5">Confidence</span>
                   <span className="text-[#BEF264] font-bold">High (94.7%)</span>
                </div>
                <div>
                   <span className="block text-zinc-600 mb-0.5">Model</span>
                   <span className="text-zinc-300 font-mono">Neural Net v2.1</span>
                </div>
                <div>
                   <span className="block text-zinc-600 mb-0.5">Features</span>
                   <span className="text-zinc-300 font-mono">1,247</span>
                </div>
             </div>
             <div className="flex items-center gap-1.5 text-zinc-400">
                <Info className="w-3.5 h-3.5" />
                <span>Updated real-time via WebSocket</span>
             </div>
          </div>

        </div>
      </HeadlessDialog>
    </>
  );
};

export default WinProbabilityCard;