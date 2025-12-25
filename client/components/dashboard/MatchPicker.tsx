import { useState, useCallback, useMemo } from "react";
import { X, Sparkles } from "lucide-react";

interface Match {
  id: number;
  home: string;
  away: string;
}

const SAMPLE_TEAMS = [
  "Liverpool",
  "Man City",
  "Arsenal",
  "Chelsea",
  "Man United",
  "Newcastle",
  "Brighton",
  "Tottenham",
  "Aston Villa",
  "West Ham",
  "Fulham",
  "Brentford",
  "Crystal Palace",
  "Everton",
  "Leicester",
  "Wolverhampton",
];

export default function MatchPicker() {
  const [matches, setMatches] = useState<Match[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      home: "",
      away: "",
    })),
  );

  const completedMatches = useMemo(
    () => matches.filter((m) => m.home && m.away).length,
    [matches],
  );
  const fillPercentage = (completedMatches / 8) * 100;

  const updateMatch = useCallback(
    (id: number, field: "home" | "away", value: string) => {
      setMatches((prev) =>
        prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
      );
    },
    [],
  );

  const resetMatches = useCallback(() => {
    setMatches(
      Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        home: "",
        away: "",
      })),
    );
  }, []);

  const getExcludedTeams = useCallback(
    (matchId: number) => {
      const match = matches.find((m) => m.id === matchId);
      return match ? [match.home, match.away].filter(Boolean) : [];
    },
    [matches],
  );

  return (
    <section
      className="grid grid-cols-1 xl:grid-cols-3 text-left gap-x-6 gap-y-6 items-start justify-center"
      aria-labelledby="match-picker-heading"
    >
      {/* MATCH PICKER COLUMN (Span 2) */}
      <div className="glass-card col-span-1 min-h-[24rem] overflow-hidden xl:col-span-2 text-left">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#BEF26422,_transparent_55%)]"></div>
        </div>

        {/* Header for Match Picker */}
        <header className="relative z-10 flex h-16 items-center justify-between border-b border-white/5 bg-[#090a0b]/80 px-4 backdrop-blur-md md:h-20 md:px-6">
          <div className="flex items-center gap-4">
            <div>
              <h2
                id="match-picker-heading"
                className="text-base font-semibold tracking-tight text-white md:text-lg"
              >
                Forduló <span className="text-[#bef264]">Kiválasztása</span>
              </h2>
              <p className="mt-1 hidden text-xs tracking-tight text-zinc-500 md:block">
                2024/25 • Szezon
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-white/20"
                type="button"
                aria-expanded="false"
                aria-haspopup="listbox"
                aria-label="Select language"
              >
                🇬🇧
                <span className="hidden sm:inline">Angol</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down transition-transform"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </div>

            {/* Progress summary */}
            <div className="hidden flex-col items-center sm:flex">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                Kész
              </span>
              <span className="font-mono text-sm font-semibold text-[#bef264]">
                {completedMatches}
                <span className="mx-1 text-zinc-500">/</span>8
              </span>
            </div>
          </div>
        </header>

        {/* Body of Match Picker */}
        <div className="flex-1 overflow-y-auto">
          <div className="relative z-10 space-y-6 p-4 md:p-6">
            {/* Fill level */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-400">
                    Kitöltöttség
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#bef264]">
                    {Math.round(fillPercentage)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-900">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#bef264] to-[#bef264]/80 transition-all duration-500"
                    style={{ width: `${fillPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Match slots grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="glass-card relative flex items-center gap-2 p-3 transition-all duration-300 hover:border-white/10"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-white/5 bg-zinc-800/50 text-[10px] font-bold font-mono text-zinc-500">
                    {match.id}
                  </div>
                  <div className="grid flex-1 grid-cols-[1fr,auto,1fr] items-center gap-2">
                    <div className="min-w-0">
                      <label className="mb-1.5 ml-1 block text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                        Hazai
                      </label>
                      <div className="relative">
                        <button
                          className="group relative flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-zinc-900/50 px-3 text-zinc-500 transition-all duration-200 hover:border-white/20 hover:bg-white/5"
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded="false"
                          aria-label="Select home team"
                        >
                          <div className="flex items-center overflow-hidden gap-2.5">
                            <span className="truncate text-sm">
                              {match.home || "Válassz..."}
                            </span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down h-4 w-4 text-zinc-500 transition-transform duration-300"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center pt-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-[9px] font-black tracking-tighter text-zinc-600 transition-all duration-500">
                        VS
                      </div>
                    </div>
                    <div className="min-w-0">
                      <label className="mb-1.5 ml-1 block text-right text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                        Vendég
                      </label>
                      <div className="relative">
                        <button
                          className="group relative flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-zinc-900/50 px-3 text-zinc-500 transition-all duration-200 hover:border-white/20 hover:bg-white/5"
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded="false"
                          aria-label="Select away team"
                        >
                          <div className="flex items-center overflow-hidden gap-2.5">
                            <span className="truncate text-sm">
                              {match.away || "Válassz..."}
                            </span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down h-4 w-4 text-zinc-500 transition-transform duration-300"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <footer className="relative z-10 shrink-0 border-t border-white/5 bg-[#090a0b]/80 p-4 backdrop-blur-md md:p-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-x-4 sm:gap-y-4">
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 rounded-lg border border-white/5 bg-zinc-900/50 px-3 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-900 hover:text-rose-400"
                title="Összes törlése"
                aria-label="Clear all selections"
                onClick={() => {
                  setMatches(
                    matches.map((m) => ({ ...m, home: "", away: "" })),
                  );
                }}
              >
                <X size={14} />
                <span className="hidden sm:inline">Törlés</span>
              </button>
            </div>

            <button
              disabled={completedMatches === 0}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                completedMatches === 0
                  ? "cursor-not-allowed bg-zinc-800 text-zinc-500 opacity-50"
                  : "bg-[#bef264] text-black hover:bg-[#bef264]/90"
              }`}
              aria-disabled={completedMatches === 0}
            >
              <Sparkles size={16} />
              Predikciók futtatása
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
