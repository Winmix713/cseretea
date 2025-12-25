import React, { useMemo, useState, useRef } from 'react';
import { BTTSData } from '../../types/matches';
import { TrendingUp } from 'lucide-react';

interface BttsChartProps {
  data: BTTSData[];
}

const BttsChart: React.FC<BttsChartProps> = ({ data }) => {
  const [hoverData, setHoverData] = useState<{ x: number, y: number, value: number, index: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Méretek
  const width = 100;
  const height = 40;

  // Bezier görbe generáló logika (Smooth Line)
  const getPath = (points: {x: number, y: number}[]) => {
    if (points.length === 0) return "";

    // Kezdőpont
    let d = `M ${points[0].x},${points[0].y}`;

    // Görbék számítása
    for (let i = 0; i < points.length - 1; i++) {
      const x0 = i > 0 ? points[i - 1].x : points[0].x;
      const y0 = i > 0 ? points[i - 1].y : points[0].y;
      const x1 = points[i].x;
      const y1 = points[i].y;
      const x2 = points[i + 1].x;
      const y2 = points[i + 1].y;
      const x3 = i !== points.length - 2 ? points[i + 2].x : x2;
      const y3 = i !== points.length - 2 ? points[i + 2].y : y2;

      const cp1x = x1 + (x2 - x0) / 6;
      const cp1y = y1 + (y2 - y0) / 6;
      const cp2x = x2 - (x3 - x1) / 6;
      const cp2y = y2 - (y3 - y1) / 6;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
    }
    return d;
  };

  // Adatok feldolgozása
  const { pathString, areaPath, points } = useMemo(() => {
    if (!data.length) return { pathString: '', areaPath: '', points: [] };

    const maxVal = Math.max(...data.map(d => d.bttsCount), 1); // Kerüljük a 0-val osztást
    const minVal = 0;

    // Pontok normalizálása 0-100 és 0-40 közé (kis paddinggal)
    const normalizedPoints = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((d.bttsCount - minVal) / (maxVal - minVal)) * (height * 0.7) - 5, // 5 egység padding alulról
      value: d.bttsCount,
      originalIndex: i
    }));

    const line = getPath(normalizedPoints);
    // Area lezárása alul
    const area = `${line} L ${width},${height} L 0,${height} Z`;

    return { pathString: line, areaPath: area, points: normalizedPoints };
  }, [data]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !points.length) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const relX = (x / rect.width) * width;

    // Legközelebbi pont keresése
    const closest = points.reduce((prev, curr) => 
      Math.abs(curr.x - relX) < Math.abs(prev.x - relX) ? curr : prev
    );

    setHoverData({ ...closest, index: closest.originalIndex });
  };

  return (
    <div className="glass-card flex flex-col h-full relative group overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <div className="p-6 md:p-8 relative z-10 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            BTTS Momentum
            <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-zinc-400 font-mono">Last 30</span>
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-md">
            Both Teams To Score frequency analysis using smoothed goal data points.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#BEF264]/5 border border-[#BEF264]/20">
             <TrendingUp className="w-3.5 h-3.5 text-[#BEF264]" />
             <span className="text-xs font-bold text-[#BEF264] uppercase tracking-wide">High Trend</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div 
        ref={containerRef}
        className="flex-1 w-full relative z-10 cursor-crosshair px-2 pb-4"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverData(null)}
      >
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible filter drop-shadow-[0_0_10px_rgba(190,242,100,0.15)]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BEF264" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#BEF264" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#BEF264" stopOpacity="0" />
            </linearGradient>

            {/* Pattern for the area */}
            <pattern id="gridPattern" width="4" height="4" patternUnits="userSpaceOnUse">
               <circle cx="1" cy="1" r="0.5" fill="#BEF264" fillOpacity="0.2" />
            </pattern>
          </defs>

          {/* Reference Lines (Average) */}
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="white" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Area Fill */}
          <path d={areaPath} fill="url(#chartFill)" />

          {/* Main Smoothed Line */}
          <path 
            d={pathString} 
            fill="none" 
            stroke="#BEF264" 
            strokeWidth="0.8" 
            strokeLinecap="round" 
            className="transition-all duration-300"
          />

          {/* Interactive Elements */}
          {hoverData && (
            <g>
              {/* Vertical Line */}
              <line 
                x1={hoverData.x} y1="0" 
                x2={hoverData.x} y2={height} 
                stroke="white" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="1 1"
              />

              {/* Pulsing Dot */}
              <circle cx={hoverData.x} cy={hoverData.y} r="2" fill="#BEF264" className="animate-pulse" />
              <circle cx={hoverData.x} cy={hoverData.y} r="1" fill="white" />

              {/* Tooltip Label (SVG text for simplicity in scalable view) */}
              <foreignObject x={Math.min(hoverData.x + 2, width - 25)} y={0} width="25" height="15">
                 <div className="bg-zinc-900/90 border border-white/10 rounded px-1 py-0.5 text-[6px] text-center text-white font-mono shadow-xl backdrop-blur-md">
                    {hoverData.value} Goals
                 </div>
              </foreignObject>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default BttsChart;