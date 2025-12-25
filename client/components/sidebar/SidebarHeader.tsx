import React from "react";
import { Sparkles } from "lucide-react";

const SidebarHeader = () => {
  return (
    <div className="px-6 py-6 pb-2 relative group cursor-default">
      {/* Ambient Glow behind logo */}
      <div className="absolute top-6 left-6 w-10 h-10 bg-[#BEF264] opacity-20 blur-[20px] group-hover:opacity-30 transition-opacity duration-500 rounded-full pointer-events-none" />

      <div className="flex items-center gap-4 relative z-10">
        {/* Logo Icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BEF264] to-[#aadd00] flex items-center justify-center shadow-[0_0_15px_rgba(190,242,100,0.25)] border border-[#ffffff]/20 group-hover:scale-105 transition-transform duration-300">
          <span className="font-extrabold text-black text-xl tracking-tighter drop-shadow-sm">
            W
          </span>
        </div>

        {/* Brand Name & Badge */}
        <div className="flex flex-col">
          <h1 className="text-white font-bold text-lg tracking-tight leading-none mb-1 group-hover:text-[#BEF264] transition-colors duration-300">
            WinMix
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-[#BEF264] uppercase tracking-wider bg-[#BEF264]/10 px-2 py-0.5 rounded-md border border-[#BEF264]/20 shadow-[0_0_10px_rgba(190,242,100,0.05)] flex items-center gap-1">
              <Sparkles className="w-2 h-2 fill-current" />
              Pro Tipster
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
