import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-x-4 gap-y-4 border-b border-white/5 bg-[#090a0b]/80 px-4 backdrop-blur-xl lg:h-20 lg:px-8">
      <div className="flex flex-1 items-center gap-4">
        {/* Global search */}
        <div className="group relative hidden w-full max-w-md items-center md:flex">
          <label htmlFor="global-search" className="sr-only">
            Search
          </label>
          <Search
            size={16}
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-[#bef264]"
          />
          <input
            id="global-search"
            type="text"
            placeholder="Search matches, teams, stats..."
            className="w-full rounded-xl border border-white/5 bg-[#020617] py-2 pl-10 pr-12 text-sm text-white placeholder-zinc-600 transition-all focus:border-[#bef264]/30 focus:outline-none focus:ring-1 focus:ring-[#bef264]/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <button
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-white/5 text-zinc-400 transition-all duration-200 hover:border-[#bef264]/20 hover:bg-[#bef264]/10 hover:text-[#bef264]"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-[#111] bg-[#bef264]"></span>
        </button>
      </div>
    </header>
  );
}
