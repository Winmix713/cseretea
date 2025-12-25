import { useState } from "react";
import { LucideIcon, TrendingUp, Minus, TrendingDown, X } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  percentage: number;
  trendText: string;
  gradientId: string;
  themeColor: string;
  trend?: "up" | "down" | "stable";
  details?: {
    current: string;
    average: string;
    lastMatch: string;
    insight: string;
  };
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  percentage,
  trendText,
  gradientId,
  themeColor,
  trend = "up",
  details,
}: StatsCardProps) {
  const [showPopover, setShowPopover] = useState(false);

  const getTrendIcon = () => {
    switch (trend) {
      case "down":
        return <TrendingDown size={12} />;
      case "stable":
        return <Minus size={12} />;
      default:
        return <TrendingUp size={12} />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "down":
        return "text-rose-400";
      case "stable":
        return "text-zinc-400";
      default:
        return `text-[${themeColor}]`;
    }
  };

  return (
    <article className="h-full">
      <div
        className="glass-card group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-500 hover:border-white/20"
        style={{ "--theme-color": themeColor } as React.CSSProperties}
      >
        <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-full mix-blend-screen opacity-[0.15] transition-opacity duration-500 group-hover:opacity-[0.25]">
          {/* Chart SVG background for visual effect */}
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={themeColor} stopOpacity="0.6"></stop>
                <stop offset="100%" stopColor={themeColor} stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <polygon
              points="0,30 0,30 11.11,25.26 22.22,18.94 33.33,14.21 44.44,6.31 55.55,9.47 66.66,3.15 77.77,0 88.88,4.73 100,0 100,30"
              fill={`url(#${gradientId})`}
            ></polygon>
          </svg>
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 group-hover:text-white">
              <Icon size={20} strokeWidth={2} />
            </div>
            <div className="">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-colors group-hover:text-zinc-400">
                {title}
              </p>
              <button className="mt-0.5 text-[10px] text-zinc-600 underline decoration-dotted decoration-zinc-700 underline-offset-2 transition-colors hover:text-[#bef264]" aria-label={`View ${title} Details`}>
                Details
              </button>
            </div>
          </div>
          {/* Circular Progress */}
          <div className="relative h-12 w-12 flex-shrink-0" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-white/5"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              ></path>
              <path
                className="ease-out transition-all duration-1000"
                stroke={themeColor}
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(${themeColor} 0px 0px 2px)` }}
              ></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color: themeColor }}>
              {percentage}%
            </div>
          </div>
        </div>

        <div className="z-10 mt-5">
          <h4 className="drop-shadow-sm flex items-baseline gap-1 font-mono text-4xl font-bold tracking-tighter tabular-nums text-white lg:text-5xl">
            {value}
            {typeof value === "number" && value < 100 && (
              <span className="font-sans text-lg font-normal opacity-60 lg:text-xl text-zinc-500">%</span>
            )}
          </h4>
        </div>

        <div className="z-10 mt-auto flex items-center gap-2 border-t border-white/5 pt-4">
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/5 bg-white/5" style={{ color: themeColor }}>
            {getTrendIcon()}
          </div>
          <span className="text-xs font-medium tracking-tight text-zinc-400 transition-colors group-hover:text-zinc-300">
            {trendText}
          </span>
        </div>
      </div>
    </article>
  );
}
