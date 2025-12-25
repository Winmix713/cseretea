import React, { ReactNode, useEffect, useState, useId, useMemo } from "react";
import { TrendingUp, Info, TrendingDown } from "lucide-react";
import HeadlessPopover from "../ui/HeadlessPopover";
import StatCardPopover from "./StatCardPopover";
import { useStatMetrics } from "../../hooks/useStatMetrics";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  subLabel: string;
  percentage: number;
  icon: ReactNode;
  sparklineData?: number[];
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  subLabel,
  percentage,
  icon,
  sparklineData = [],
}) => {
  const metrics = useStatMetrics(title, value);
  const [displayedValue, setDisplayedValue] = useState(0);
  const uniqueId = useId(); // Fontos: egyedi ID generálás az SVG szűrőknek

  // Optimized Counter Animation
  useEffect(() => {
    if (typeof value !== "number") return;

    const end = value;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function: cubic-bezier(0.25, 0.46, 0.45, 0.94) implementation
      const easeOut = 1 - Math.pow(1 - progress, 4);

      setDisplayedValue(Math.floor(end * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayedValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  // Sparkline Normalization Logic
  const sparklinePoints = useMemo(() => {
    if (!sparklineData.length) return "";
    const width = 80;
    const height = 24;
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;

    return sparklineData.map((val, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(" ");
  }, [sparklineData]);

  // Confidence & Color Logic
  const getColors = (pct: number) => {
    if (pct >= 70) return { text: "text-[#BEF264]", stroke: "#BEF264", shadow: "rgba(190,242,100,0.5)" };
    if (pct >= 40) return { text: "text-[#FBBF24]", stroke: "#FBBF24", shadow: "rgba(251,191,36,0.5)" };
    return { text: "text-[#FB7185]", stroke: "#FB7185", shadow: "rgba(251,113,133,0.5)" };
  };

  const colors = getColors(percentage);

  return (
    <div
      className="glass-card p-6 h-full flex flex-col relative overflow-hidden group hover:border-white/10 transition-all duration-300"
      role="article"
    >
      {/* Background Sparkline (Absolute) */}
      {sparklineData.length > 0 && (
        <div className="absolute bottom-0 right-0 w-full h-24 opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none">
           <svg viewBox="0 0 80 24" preserveAspectRatio="none" className="w-full h-full">
             <defs>
               <linearGradient id={`grad-${uniqueId}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={colors.stroke} stopOpacity="0" />
               </linearGradient>
             </defs>
             <polygon points={`0,24 ${sparklinePoints} 80,24`} fill={`url(#grad-${uniqueId})`} />
             <polyline points={sparklinePoints} fill="none" stroke={colors.stroke} strokeWidth="1" vectorEffect="non-scaling-stroke" />
           </svg>
        </div>
      )}

      {/* Content Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex items-center gap-3">
           <div className={`w-10 h-10 rounded-xl flex items-center justify-center border bg-white/5 border-white/10 text-zinc-300 group-hover:text-white group-hover:border-[${colors.stroke}]/30 transition-colors shadow-inner`}>
             {icon}
           </div>
           <div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">{title}</p>
             <HeadlessPopover
                button={
                  <button className="flex items-center gap-1 text-[10px] text-zinc-600 hover:text-[#BEF264] transition-colors mt-0.5 focus:outline-none">
                    <Info className="w-3 h-3" /> Details
                  </button>
                }
                align="left"
                className="w-72"
             >
                <StatCardPopover title={title} metrics={metrics} />
             </HeadlessPopover>
           </div>
        </div>

        {/* Progress Circle */}
        <div className="relative w-14 h-14">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
             <path
               className="text-zinc-800"
               d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
               fill="none"
               stroke="currentColor"
               strokeWidth="3"
             />
             <path
               className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
               stroke={colors.stroke}
               strokeDasharray={`${percentage}, 100`}
               d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
               fill="none"
               strokeWidth="3"
               strokeLinecap="round"
             />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center text-[11px] font-bold ${colors.text}`}>
            {percentage}%
          </div>
        </div>
      </div>

      {/* Main Value Section */}
      <div className="mt-6 z-10">
        <h4 className="text-4xl lg:text-5xl font-mono font-bold text-white tracking-tighter tabular-nums drop-shadow-lg">
          {typeof value === 'number' ? displayedValue.toLocaleString() : value}
          {subValue && <span className="text-xl text-zinc-500 ml-1 font-normal">{subValue}</span>}
        </h4>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-4 flex items-center gap-2 border-t border-white/5 z-10">
        {percentage > 50 ? (
          <TrendingUp className={`w-3.5 h-3.5 ${colors.text}`} />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-zinc-500" />
        )}
        <span className="text-xs text-zinc-400 font-medium tracking-tight">
          {subLabel}
        </span>
      </div>
    </div>
  );
};

export default StatCard;