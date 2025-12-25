import React, { useState } from "react";
import { Trophy, Target, TrendingUp, Filter } from "lucide-react";

export interface LeagueTeam {
  position: number;
  name: string;
  points: number;
  played?: number;
}

const getPositionStyles = (position: number) => {
  if (position === 1) return { color: "#EF4444", label: "Champion" };
  if (position <= 4) return { color: "#22D3EE", label: "UCL" };
  if (position === 5) return { color: "#8B5CF6", label: "UEL" };
  if (position > 17) return { color: "#DC2626", label: "Relegation" };
  return { color: "#52525B", label: "Mid-table" };
};

interface LeagueRowProps {
  team: LeagueTeam;
}

const LeagueRow = ({ team }: LeagueRowProps) => {
  const styles = getPositionStyles(team.position);
  const wins = Math.floor(team.points / 3);
  const draws = team.points % 3;
  const losses = Math.max(0, (team.played || 10) - wins - draws);

  return (
    <a
      href="/"
      className="group relative grid grid-cols-12 items-center px-4 py-2.5 text-xs transition-all duration-200 hover:bg-white/[0.04] cursor-pointer border-l-[3px]"
      style={{ borderLeftColor: styles.color }}
      aria-label={`${team.name} team details`}
    >
      <div className="col-span-1 text-center font-mono font-bold text-zinc-400 group-hover:text-white">
        {team.position}
      </div>
      <div className="col-span-6 pl-2 flex items-center gap-3 overflow-hidden">
        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-zinc-400 border border-white/5 shrink-0">
          {team.name.substring(0, 1)}
        </div>
        <span className="font-semibold text-zinc-200 group-hover:text-white truncate">
          {team.name}
        </span>
      </div>
      <div className="col-span-3 grid grid-cols-3 text-center font-mono text-zinc-500 text-[11px]">
        <span className="group-hover:text-emerald-400">{wins}</span>
        <span className="group-hover:text-zinc-300">{draws}</span>
        <span className="group-hover:text-rose-400">{losses}</span>
      </div>
      <span className="col-span-2 text-right pr-2 font-mono font-bold text-white text-sm group-hover:text-[#bef264] transition-colors">
        {team.points}
      </span>
    </a>
  );
};

interface LeagueTableProps {
  teams?: LeagueTeam[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ teams = [] }) => {
  const [activeTab, setActiveTab] = useState<"table" | "scorers" | "form">(
    "table",
  );

  const defaultTeams: LeagueTeam[] = [
    {
      position: 1,
      name: "Liverpool",
      points: 24,
      played: 10,
    },
    {
      position: 2,
      name: "Man City",
      points: 16,
      played: 10,
    },
    {
      position: 3,
      name: "Arsenal",
      points: 15,
      played: 10,
    },
    {
      position: 4,
      name: "Leicester",
      points: 14,
      played: 10,
    },
    {
      position: 5,
      name: "Chelsea",
      points: 14,
      played: 10,
    },
    {
      position: 6,
      name: "C. Palace",
      points: 14,
      played: 10,
    },
    {
      position: 7,
      name: "Burnley",
      points: 12,
      played: 10,
    },
    {
      position: 8,
      name: "West Ham",
      points: 11,
      played: 10,
    },
  ];

  const standingsContent = (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-12 px-4 py-2 border-b border-white/5 bg-white/[0.02] text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
        <span className="col-span-1 text-center">Pos</span>
        <span className="col-span-6 pl-2">Club</span>
        <div className="col-span-3 grid grid-cols-3 text-center opacity-70">
          <span>W</span>
          <span>D</span>
          <span>L</span>
        </div>
        <span className="col-span-2 text-right pr-2">Pts</span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {(teams.length > 0 ? teams : defaultTeams).map((team, idx) => (
          <LeagueRow key={idx} team={team} />
        ))}
      </div>
      <div className="px-4 py-3 border-t border-white/5 flex gap-3 text-[9px] text-zinc-500 font-medium uppercase tracking-wider overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>{" "}
          Champion
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"></span> UCL
        </div>
      </div>
    </div>
  );

  const topScorersContent = (
    <div className="flex flex-col h-full p-2 overflow-y-auto custom-scrollbar">
      <div className="space-y-2">
        {[
          { rank: 1, player: "M. Salah", team: "LIV", goals: 12 },
          { rank: 2, player: "E. Haaland", team: "MCI", goals: 11 },
          { rank: 3, player: "H. Kane", team: "BAY", goals: 9 },
        ].map((scorer, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#bef264]/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-mono font-bold w-6 text-center ${
                  i === 0 ? "text-[#bef264]" : "text-zinc-500"
                }`}
              >
                {scorer.rank}
              </span>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-[#bef264] transition-colors">
                  {scorer.player}
                </p>
                <p className="text-[10px] text-zinc-500">{scorer.team}</p>
              </div>
            </div>
            <span className="block text-lg font-mono font-bold text-white">
              {scorer.goals}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const formContent = (
    <div className="p-4 text-center text-zinc-500 text-xs">
      Form guide visualization...
    </div>
  );

  return (
    <article className="h-[520px] xl:col-span-4">
      <div className="glass-card group relative flex h-full min-h-[480px] flex-col overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full blur-[80px] bg-purple-500/5"></div>

        <div className="p-6 pb-2 flex-1 flex flex-col relative z-10">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#38003c] shadow-lg">
              <Trophy size={24} strokeWidth={2} className="text-[#00ff85]" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight text-white">
                Premier League
              </h3>
              <span className="text-xs text-zinc-400">Matchday 12</span>
            </div>
            <button
              className="ml-auto rounded-lg bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
              aria-label="Filter table"
            >
              <Filter size={16} />
            </button>
          </div>

          <div className="flex h-full flex-col">
            <nav className="mb-4 flex gap-1 rounded-lg bg-white/5 p-1">
              <button
                onClick={() => setActiveTab("table")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "table"
                    ? "bg-[#bef264] text-black shadow-lg"
                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                }`}
                aria-current={activeTab === "table" ? "page" : undefined}
              >
                <Trophy size={14} />
                Table
              </button>
              <button
                onClick={() => setActiveTab("scorers")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "scorers"
                    ? "bg-[#bef264] text-black shadow-lg"
                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                }`}
              >
                <Target size={14} />
                Scorers
              </button>
              <button
                onClick={() => setActiveTab("form")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "form"
                    ? "bg-[#bef264] text-black shadow-lg"
                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                }`}
              >
                <TrendingUp size={14} />
                Form
              </button>
            </nav>

            <div className="relative flex-1 overflow-hidden">
              <div className="flex h-full flex-col">
                {activeTab === "table" && standingsContent}
                {activeTab === "scorers" && topScorersContent}
                {activeTab === "form" && formContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LeagueTable;
