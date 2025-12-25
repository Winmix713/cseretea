import React, { useMemo, useState } from 'react';
import { Trophy, Target, TrendingUp, ChevronDown, Filter } from 'lucide-react';
import { LeagueTeam } from '../../types/matches'; // Feltételezzük, hogy ez létezik
import HeadlessTabs from '../ui/HeadlessTabs';

// --- SEGÉDFÜGGVÉNYEK ÉS KONSTANSOK ---

// Pozíció alapú színkódolás (A referencia HTML "color" attribútumai alapján modernizálva)
const getPositionStyles = (position: number) => {
  if (position === 1) return { color: '#EF4444', glow: 'rgba(239, 68, 68, 0.5)', label: 'Champion' }; // Red
  if (position === 2) return { color: '#22D3EE', glow: 'rgba(34, 211, 238, 0.5)', label: 'UCL' };      // Light Azure
  if (position === 3) return { color: '#F97316', glow: 'rgba(249, 115, 22, 0.5)', label: 'UCL' };      // Salmon
  if (position === 4) return { color: '#3B82F6', glow: 'rgba(59, 130, 246, 0.5)', label: 'UCL' };      // Azure
  if (position === 5) return { color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.5)', label: 'UEL' };      // Purple
  if (position > 17) return { color: '#DC2626', glow: 'rgba(220, 38, 38, 0.5)', label: 'Relegation' }; // Dark Red
  return { color: '#52525B', glow: 'rgba(82, 82, 91, 0.2)', label: 'Mid-table' };                      // Gray/Accent
};

// Mock data generator a W-D-L oszlopokhoz (mivel az eredeti típusban lehet, hogy nincs benne)
const enrichTeamData = (team: LeagueTeam) => {
  // Ez csak demonstráció, valós appban ezek az adatok jönnek a backendről
  const wins = Math.floor(team.points / 3);
  const draws = team.points % 3;
  const losses = Math.max(0, 8 - wins - draws); // Feltételezve 8 lejátszott meccset a screenshot alapján
  return { ...team, stats: { w: wins, d: draws, l: losses } };
};

// --- ALKOMPONENSEK ---

const TableHeader = () => (
  <div className="grid grid-cols-12 px-4 py-3 border-b border-white/5 bg-white/[0.02] text-[9px] font-bold text-zinc-500 uppercase tracking-widest select-none">
    <span className="col-span-1 text-center">Pos</span>
    <span className="col-span-6 pl-2">Club</span>
    <div className="col-span-3 grid grid-cols-3 text-center opacity-70">
      <span>W</span>
      <span>D</span>
      <span>L</span>
    </div>
    <span className="col-span-2 text-right pr-2 text-white opacity-90">Pts</span>
  </div>
);

const LeagueRow = ({ team, index }: { team: LeagueTeam; index: number }) => {
  const styles = getPositionStyles(team.position);
  const enrichedTeam = enrichTeamData(team);

  return (
    <div 
      className="group relative grid grid-cols-12 items-center px-4 py-3 text-xs transition-all duration-200 hover:bg-white/[0.04] cursor-pointer border-l-[3px]"
      style={{ borderLeftColor: styles.color }}
    >
      {/* Hover Glow Effect a sor mögött */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${styles.color}, transparent)` }}
      />

      {/* Position */}
      <span className="col-span-1 text-center font-mono font-bold text-zinc-400 group-hover:text-white transition-colors">
        {team.position}
      </span>

      {/* Team Name & Logo Placeholder */}
      <div className="col-span-6 pl-2 flex items-center gap-3 overflow-hidden">
        {/* Logo Placeholder - valós appban itt <img /> lenne */}
        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-400 border border-white/5 shrink-0">
          {team.name.substring(0, 1)}
        </div>
        <span className="font-semibold text-zinc-200 group-hover:text-white truncate transition-colors">
          {team.name}
        </span>
      </div>

      {/* W-D-L Stats */}
      <div className="col-span-3 grid grid-cols-3 text-center font-mono text-zinc-500 text-[11px]">
        <span className="group-hover:text-emerald-400 transition-colors">{enrichedTeam.stats.w}</span>
        <span className="group-hover:text-zinc-300 transition-colors">{enrichedTeam.stats.d}</span>
        <span className="group-hover:text-rose-400 transition-colors">{enrichedTeam.stats.l}</span>
      </div>

      {/* Points */}
      <span className="col-span-2 text-right pr-2 font-mono font-bold text-white text-sm tracking-tight group-hover:scale-110 transition-transform origin-right">
        {team.points}
      </span>
    </div>
  );
};

// --- FŐ KOMPONENS ---

const LeagueTable = ({ teams }: { teams: LeagueTeam[] }) => {
  const [filter, setFilter] = useState('all');

  // --- CONTENT: STANDINGS ---
  const standingsContent = (
    <div className="flex flex-col h-full">
      <TableHeader />
      <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
        <div className="py-1">
          {teams.map((team, idx) => (
            <LeagueRow key={team.position} team={team} index={idx} />
          ))}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="px-4 py-3 border-t border-white/5 flex gap-3 text-[9px] text-zinc-500 font-medium uppercase tracking-wider overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span> Champion
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"></span> UCL
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span> UEL
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span> Relegation
        </div>
      </div>
    </div>
  );

  // --- CONTENT: TOP SCORERS (Simplified for structure) ---
  const topScorersContent = (
    <div className="flex flex-col h-full p-4">
        <div className="space-y-3">
             {[
                { rank: 1, player: 'M. Salah', team: 'LIV', goals: 12, xg: 9.4 },
                { rank: 2, player: 'E. Haaland', team: 'MCI', goals: 11, xg: 10.2 },
                { rank: 3, player: 'H. Kane', team: 'BAY', goals: 9, xg: 8.1 },
             ].map((scorer, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#BEF264]/30 transition-all group">
                     <div className="flex items-center gap-3">
                         <span className={`text-sm font-mono font-bold w-6 text-center ${i === 0 ? 'text-[#BEF264]' : 'text-zinc-500'}`}>{scorer.rank}</span>
                         <div>
                             <p className="text-sm font-bold text-white group-hover:text-[#BEF264] transition-colors">{scorer.player}</p>
                             <p className="text-[10px] text-zinc-500">{scorer.team}</p>
                         </div>
                     </div>
                     <div className="text-right">
                         <span className="block text-lg font-mono font-bold text-white leading-none">{scorer.goals}</span>
                         <span className="text-[9px] text-zinc-500 uppercase">Goals</span>
                     </div>
                 </div>
             ))}
        </div>
    </div>
  );

  return (
    <div className="glass-card flex flex-col h-[480px] w-full relative group overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#BEF264]/5 blur-[80px] rounded-full pointer-events-none"></div>

      {/* --- HEADER SECTION --- */}
      <div className="p-6 pb-2 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          {/* League Logo Container */}
          <div className="w-12 h-12 rounded-xl bg-[#38003c] flex items-center justify-center shadow-lg border border-white/10 shrink-0">
            {/* Helyettesítő kép a Premier League oroszlánnak */}
            <Trophy className="w-6 h-6 text-[#00ff85]" /> 
          </div>

          <div>
            <h3 className="text-lg font-bold text-white leading-tight">
              English <span className="block text-zinc-400 text-xs font-normal tracking-wide">Premier League</span>
            </h3>
          </div>

          <div className="ml-auto">
             <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                 <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* --- TABS --- */}
        <HeadlessTabs
          tabs={[
            {
              name: 'Table',
              icon: <Trophy className="w-3.5 h-3.5" />,
              content: standingsContent
            },
            {
              name: 'Top Scorers',
              icon: <Target className="w-3.5 h-3.5" />,
              content: topScorersContent
            },
            {
              name: 'Form Guide',
              icon: <TrendingUp className="w-3.5 h-3.5" />,
              content: <div className="p-4 text-center text-zinc-500 text-xs">Form guide visualization here...</div>
            }
          ]}
        />
      </div>
    </div>
  );
};

export default LeagueTable;