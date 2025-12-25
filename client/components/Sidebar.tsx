import { LayoutDashboard, Activity, BarChart3 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/5 bg-[#0a0a0a]/90 shadow-[5px_0_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl lg:relative lg:block lg:flex-shrink-0">
      <div className="absolute bottom-0 right-0 top-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

      {/* Brand / Logo */}
      <div className="flex-none p-6 pb-2">
        <a href="/" className="group relative cursor-pointer px-6 py-6 pb-2">
          <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 rounded-full bg-[#bef264] blur-[20px] opacity-20 transition-opacity duration-500 group-hover:opacity-30"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffffff]/20 bg-gradient-to-br from-[#bef264] to-[#aadd00] shadow-[0_0_15px_rgba(190,242,100,0.25)] transition-transform duration-300 group-hover:scale-105">
              <span className="text-xl font-extrabold tracking-tighter text-black drop-shadow-sm">
                W
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="mb-1 text-base font-semibold leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-[#bef264]">
                WinMix
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1 rounded-md border border-[#bef264]/20 bg-[#bef264]/10 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#bef264] shadow-[0_0_10px_rgba(190,242,100,0.05)]">
                  Pro Tipster
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 pt-2">
        <div className="space-y-2 px-3 py-4">
          {/* Overview Section */}
          <section className="mb-6">
            <h2 className="mb-1 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Overview
            </h2>
            <ul className="space-y-0.5">
              <li>
                <a
                  href="/"
                  className="group relative flex w-full select-none items-center rounded-xl py-3 px-4 text-sm font-medium tracking-wide text-white outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[#bef264]/50"
                  aria-current="page"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#bef264]/10 to-transparent opacity-100 transition-all duration-300"></div>
                  <div className="absolute left-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-r-full bg-[#bef264] shadow-[0_0_12px_rgba(190,242,100,0.6)]"></div>
                  <span className="relative z-10 mr-3 flex h-5 w-5 items-center justify-center scale-110 text-[#bef264] drop-shadow-[0_0_8px_rgba(190,242,100,0.5)] transition-all duration-300">
                    <LayoutDashboard size={20} strokeWidth={1.5} />
                  </span>
                  <span className="relative z-10 flex-1 truncate text-left transition-colors duration-300">
                    Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="group relative flex w-full select-none items-center rounded-xl py-3 px-4 text-sm font-medium tracking-wide text-zinc-400 outline-none transition-all duration-300 ease-out hover:text-white"
                >
                  <span className="relative z-10 mr-3 flex h-5 w-5 items-center justify-center transition-all duration-300 group-hover:text-zinc-200">
                    <Activity size={20} strokeWidth={1.5} />
                  </span>
                  <span className="relative z-10 flex-1 truncate text-left transition-colors duration-300">
                    Live Odds
                  </span>
                  <div className="ml-auto pl-2">
                    <div className="flex items-center gap-1.5 rounded border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                      </span>
                      <span className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-rose-500">
                        Live
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </section>

          {/* Intelligence Section */}
          <section className="mb-6">
            <h2 className="mb-1 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Intelligence
            </h2>
            <ul className="space-y-0.5">
              <li>
                <a
                  href="/"
                  className="group relative flex w-full select-none items-center rounded-xl py-3 px-4 text-sm font-medium tracking-wide text-zinc-400 outline-none transition-all duration-300 ease-out hover:text-white"
                >
                  <span className="relative z-10 mr-3 flex h-5 w-5 items-center justify-center transition-all duration-300 group-hover:text-zinc-200">
                    <BarChart3 size={20} strokeWidth={1.5} />
                  </span>
                  <span className="relative z-10 flex-1 truncate text-left transition-colors duration-300">
                    Stats Hub
                  </span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </nav>

      {/* User Profile */}
      <div className="relative z-20 mt-auto flex-none border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent p-4">
        <div className="relative z-20 p-4">
          <button
            className="group flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-left outline-none transition-all duration-300 hover:bg-white/[0.06]"
            aria-label="User Profile"
          >
            <div className="relative shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#bef264] to-transparent p-[1px]">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-black bg-zinc-900">
                  <img
                    src="https://ui-avatars.com/api/?name=Win+Mix&background=111&color=BEF264"
                    alt="WinMix User Avatar"
                    className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-sm font-semibold text-white transition-colors group-hover:text-[#bef264]">
                WinMix User
              </div>
              <div className="flex items-center gap-1.5 truncate text-[0.6rem] font-medium text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Premium Plan
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
