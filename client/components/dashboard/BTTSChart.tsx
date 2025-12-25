import React, { useMemo, useState, useRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface BTTSData {
  matchId: string;
  bttsCount: number; // vagy date, value, stb.
  date?: string;
}

interface BttsChartProps {
  data: BTTSData[];
}

const BttsChart: React.FC<BttsChartProps> = ({ data = [] }) => {
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    value: number;
    index: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Méretek
  const width = 100;
  const height = 40;

  // Bezier görbe generáló logika (Smooth Line)
  const getPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[0];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i !== points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  // Adatok feldolgozása
  const { pathString, areaPath, points, trend } = useMemo(() => {
    if (!data || !data.length)
      return { pathString: "", areaPath: "", points: [], trend: "neutral" };

    const maxVal = Math.max(...data.map((d) => d.bttsCount), 1);
    const minVal = 0; // Fix bázis a 0-hoz

    // Pontok normalizálása
    const normalizedPoints = data.map((d, i) => ({
      x: (i / (data.length - 1)) * width,
      y:
        height -
        ((d.bttsCount - minVal) / (maxVal - minVal)) * (height * 0.7) -
        5,
      value: d.bttsCount,
      originalIndex: i,
    }));

    const line = getPath(normalizedPoints);
    const area = `${line} L ${width},${height} L 0,${height} Z`;

    // Trend számítás (utolsó 5 elem átlaga vs első 5)
    const recent =
      data.slice(-5).reduce((acc, c) => acc + c.bttsCount, 0) /
      Math.min(5, data.length);
    const prev =
      data.slice(0, 5).reduce((acc, c) => acc + c.bttsCount, 0) /
      Math.min(5, data.length);
    const trendDir =
      recent > prev * 1.05 ? "up" : recent < prev * 0.95 ? "down" : "neutral";

    return {
      pathString: line,
      areaPath: area,
      points: normalizedPoints,
      trend: trendDir,
    };
  }, [data]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !points.length) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const relX = (x / rect.width) * width; // Skálázás SVG koordinátákra

    const closest = points.reduce((prev, curr) =>
      Math.abs(curr.x - relX) < Math.abs(prev.x - relX) ? curr : prev,
    );

    setHoverData({ ...closest, index: closest.originalIndex });
  };

  if (!data.length) {
    return (
      <div className="glass-card h-full flex items-center justify-center text-zinc-500 text-xs">
        No Data Available
      </div>
    );
  }

  return (
    <div className="glass-card flex flex-col h-full relative group overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header */}
      <div className="p-6 md:p-8 relative z-10 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            BTTS Momentum
            <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-zinc-400 font-mono">
              Last {data.length}
            </span>
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-md">
            Both Teams To Score frequency analysis using smoothed goal data
            points.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wide ${trend === "up"
                ? "bg-[#BEF264]/5 border-[#BEF264]/20 text-[#BEF264]"
                : trend === "down"
                  ? "bg-rose-500/5 border-rose-500/20 text-rose-500"
                  : "bg-zinc-800/50 border-white/10 text-zinc-400"
              }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : trend === "down" ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>
              {trend === "up"
                ? "High Trend"
                : trend === "down"
                  ? "Cooling"
                  : "Stable"}
            </span>
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
          </defs>

          {/* Reference Lines */}
          <line
            x1="0"
            y1={height * 0.5}
            x2={width}
            y2={height * 0.5}
            stroke="white"
            strokeOpacity="0.05"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* Area & Line */}
          <path
            d={areaPath}
            fill="url(#chartFill)"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={pathString}
            fill="none"
            stroke="#BEF264"
            strokeWidth="1"
            strokeLinecap="round"
            className="transition-all duration-300"
            vectorEffect="non-scaling-stroke"
          />

          {/* Interactive Tooltip (Native SVG) */}
          {hoverData && (
            <g>
              <line
                x1={hoverData.x}
                y1="0"
                x2={hoverData.x}
                y2={height}
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="0.5"
                strokeDasharray="1 1"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={hoverData.x}
                cy={hoverData.y}
                r="1.5"
                fill="#BEF264"
                className="animate-pulse"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={hoverData.x}
                cy={hoverData.y}
                r="0.8"
                fill="white"
                vectorEffect="non-scaling-stroke"
              />

              {/* Tooltip Label logic: avoid overflow on right side */}
              <g
                transform={`translate(${hoverData.x > width - 20 ? hoverData.x - 25 : hoverData.x + 2}, 0)`}
              >
                <rect
                  width="24"
                  height="12"
                  rx="2"
                  fill="#09090b"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                  fillOpacity="0.9"
                />
                <text
                  x="12"
                  y="8"
                  textAnchor="middle"
                  fontSize="5"
                  fill="white"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {hoverData.value}
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default BttsChart;
