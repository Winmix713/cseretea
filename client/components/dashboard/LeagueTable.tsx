import { Trophy, Filter } from "lucide-react";
import { useState } from "react";

interface TeamRow {
  position: number;
  name: string;
  abbreviation: string;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  color: string;
}

const TEAMS: TeamRow[] = [
  {
    position: 1,
    name: "Liverpool",
    abbreviation: "L",
    wins: 8,
    draws: 0,
    losses: 2,
    points: 24,
    color: "rgb(239, 68, 68)",
  },
  {
    position: 2,
    name: "Man City",
    abbreviation: "M",
    wins: 5,
    draws: 1,
    losses: 4,
    points: 16,
    color: "rgb(34, 211, 238)",
  },
  {
    position: 3,
    name: "Arsenal",
    abbreviation: "A",
    wins: 5,
    draws: 0,
    losses: 5,
    points: 15,
    color: "rgb(34, 211, 238)",
  },
  {
    position: 4,
    name: "Leicester",
    abbreviation: "L",
    wins: 4,
    draws: 2,
    losses: 4,
    points: 14,
    color: "rgb(34, 211, 238)",
  },
  {
    position: 5,
    name: "Chelsea",
    abbreviation: "C",
    wins: 4,
    draws: 2,
    losses: 4,
    points: 14,
    color: "rgb(139, 92, 246)",
  },
  {
    position: 6,
    name: "C. Palace",
    abbreviation: "C",
    wins: 4,
    draws: 2,
    losses: 4,
    points: 14,
    color: "rgb(82, 82, 91)",
  },
  {
    position: 7,
    name: "Burnley",
    abbreviation: "B",
    wins: 4,
    draws: 0,
    losses: 6,
    points: 12,
    color: "rgb(82, 82, 91)",
  },
  {
    position: 8,
    name: "West Ham",
    abbreviation: "W",
    wins: 3,
    draws: 2,
    losses: 5,
    points: 11,
    color: "rgb(82, 82, 91)",
  },
];

export default function LeagueTable() {
  const [activeTab, setActiveTab] = useState<"table" | "scorers" | "form">(
    "table"
  );

  return (
    <article className="h-[520px] xl:col-span-4">
      <div className="glass-card group relative flex h-full min-h-[480px] flex-col overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full blur-[80px] bg-purple-500/5"></div>

        <header className="relative z-10 flex flex-1 flex-col p-6 pb-2">
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
            {/* Tab Navigation */}
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
                Form
              </button>
            </nav>

            <div className="relative flex-1 overflow-hidden">
              <div className="flex h-full flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-12 border-b border-white/5 bg-white/[0.02] px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                  <span className="col-span-1 text-center">Pos</span>
                  <span className="col-span-6 pl-2">Club</span>
                  <div className="col-span-3 grid grid-cols-3 text-center opacity-70">
                    <span>W</span>
                    <span>D</span>
                    <span>L</span>
                  </div>
                  <span className="col-span-2 pr-2 text-right">Pts</span>
                </div>

                {/* Table Body */}
                <div className="custom-scrollbar flex-1 overflow-y-auto">
                  {TEAMS.map((team) => (
                    <a
                      key={team.position}
                      href="/"
                      className="group relative grid grid-cols-12 items-center border-l-[3px] px-4 py-2.5 text-xs transition-all duration-200 hover:bg-white/[0.04]"
                      style={{ borderLeftColor: team.color }}
                      aria-label={`${team.name} team details`}
                    >
                      <div className="col-span-1 text-center font-mono font-bold text-zinc-400 group-hover:text-white">
                        {team.position}
                      </div>
                      <div className="col-span-6 flex items-center gap-3 overflow-hidden pl-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/5 bg-zinc-800 text-[9px] font-bold text-zinc-400">
                          {team.abbreviation}
                        </div>
                        <span className="truncate font-semibold text-zinc-200 group-hover:text-white">
                          {team.name}
                        </span>
                      </div>
                      <div className="col-span-3 grid grid-cols-3 text-center font-mono text-[11px] text-zinc-500">
                        <span className="group-hover:text-emerald-400">
                          {team.wins}
                        </span>
                        <span className="group-hover:text-zinc-300">
                          {team.draws}
                        </span>
                        <span className="group-hover:text-rose-400">
                          {team.losses}
                        </span>
                      </div>
                      <span className="col-span-2 pr-2 text-right font-mono text-sm font-bold text-white transition-colors group-hover:text-[#bef264]">
                        {team.points}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Legend Footer */}
        <footer className="flex gap-3 overflow-x-auto border-t border-white/5 px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-zinc-500 no-scrollbar">
          <div className="flex items-center whitespace-nowrap gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]"></span> Champion
          </div>
          <div className="flex items-center whitespace-nowrap gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]"></span> UCL
          </div>
        </footer>
      </div>
    </article>
  );
}
