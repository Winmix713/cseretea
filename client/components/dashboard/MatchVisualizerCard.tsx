import { useState } from "react";
import { Home, Shield, Maximize2, Trophy } from "lucide-react";
import TeamDisplay from "../match/TeamDisplay";
import MatchScore from "../match/MatchScore";
import MatchDialog from "../match/MatchDialog";

interface MatchVisualizerCardProps {
  homeScore: number;
  awayScore: number;
}

const MatchVisualizerCard: React.FC<MatchVisualizerCardProps> = ({
  homeScore,
  awayScore,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="glass-card lg:col-span-2 min-h-[340px] flex flex-col cursor-pointer group hover:border-[#BEF264]/30 relative overflow-hidden transition-all duration-500"
        role="button"
        tabIndex={0}
        aria-label="Open Match Details"
      >
        {/* --- ATMOSPHERE LAYERS --- */}

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none z-0" />

        {/* Dynamic Glows */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#BEF264] blur-[120px] opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700 z-0 animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#6EE7B7] blur-[100px] opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-700 z-0" />

        {/* --- CONTENT --- */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">

          {/* Header Row */}
          <div className="flex justify-between items-start w-full">

            {/* League Badge */}
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md shadow-lg group-hover:border-[#BEF264]/20 transition-colors">
                <Trophy className="w-3.5 h-3.5 text-[#BEF264]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Champions League</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono ml-1">Group B • Round 4</span>
            </div>

            {/* Live Timer & Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-[#BEF264]/30 shadow-[0_0_15px_rgba(190,242,100,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BEF264] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BEF264]"></span>
                </span>
                <span className="text-sm font-mono font-bold text-[#BEF264] tabular-nums tracking-wide drop-shadow-sm">
                  72:43
                </span>
              </div>

              <button
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-300 group/btn"
                aria-label="Expand match view"
              >
                <Maximize2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Match Action Center - 3D Perspective Container */}
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 mt-6 lg:px-8">

            {/* Home Team */}
            <div className="transform transition-transform duration-500 group-hover:translate-x-2">
              <TeamDisplay
                name="LIV"
                icon={<Home className="w-16 h-16 lg:w-20 lg:h-20 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" strokeWidth={1.5} />}
                position="home"
              />
            </div>

            {/* Score Board */}
            <div className="relative z-20 transform group-hover:scale-105 transition-transform duration-500">
               <MatchScore
                 homeScore={homeScore}
                 awayScore={awayScore}
                 showStats
               />
               <div className="text-center mt-3">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">In Play</span>
               </div>
            </div>

            {/* Away Team */}
            <div className="transform transition-transform duration-500 group-hover:-translate-x-2">
              <TeamDisplay
                name="RMA"
                icon={<Shield className="w-16 h-16 lg:w-20 lg:h-20 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" strokeWidth={1.5} />}
                position="away"
              />
            </div>
          </div>
        </div>
      </div>

      <MatchDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        homeScore={homeScore}
        awayScore={awayScore}
      />
    </>
  );
};

export default MatchVisualizerCard;