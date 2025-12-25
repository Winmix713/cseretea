import { Minus } from "lucide-react";

export default function BTTSChart() {
  return (
    <article className="h-[520px] xl:col-span-8">
      <div className="glass-card group relative flex h-full flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <header className="relative z-10 flex items-start justify-between p-6 md:p-8">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              BTTS Momentum
              <span className="font-mono text-[10px] tracking-wide rounded border border-white/10 bg-white/5 px-2 py-0.5 text-zinc-400">
                Last 30
              </span>
            </h3>
            <p className="mt-1 max-w-md text-xs text-zinc-500">
              Both Teams To Score frequency analysis using smoothed goal data points.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-800/50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">
              <Minus size={14} />
              <span>Stable</span>
            </div>
          </div>
        </header>

        <div className="relative z-10 flex-1 cursor-crosshair px-2 pb-4">
          {/* Complex Chart SVG */}
          <svg
            viewBox="0 0 100 40"
            className="h-full w-full overflow-visible drop-shadow-[0_0_10px_rgba(190,242,100,0.15)] filter"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bef264" stopOpacity="0.3"></stop>
                <stop offset="50%" stopColor="#bef264" stopOpacity="0.05"></stop>
                <stop offset="100%" stopColor="#bef264" stopOpacity="0"></stop>
              </linearGradient>
            </defs>

            {/* Grid line */}
            <line
              x1="0"
              y1="20"
              x2="100"
              y2="20"
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            ></line>

            {/* Filled area under curve */}
            <path
              d="M 0,7 C 0.57,8.16 2.29,11.08 3.44,14 C 4.59,16.91 5.74,23.33 6.89,24.5 C 8.04,25.66 9.19,23.33 10.34,21 C 11.49,18.66 12.64,10.5 13.79,10.5 C 14.94,10.5 16.09,18.66 17.24,21 C 18.39,23.33 19.54,23.33 20.68,24.5 C 21.83,25.66 22.98,26.83 24.13,28 C 25.28,29.16 26.43,32.66 27.58,31.5 C 28.73,30.33 29.88,23.33 31.03,21 C 32.18,18.66 33.33,16.91 34.48,17.5 C 35.63,18.08 36.78,25.66 37.93,24.5 C 39.08,23.33 40.22,11.08 41.37,10.5 C 42.52,9.91 43.67,20.41 44.82,21 C 45.97,21.58 47.12,12.25 48.27,14 C 49.42,15.75 50.57,30.33 51.72,31.5 C 52.87,32.66 54.02,20.41 55.17,21 C 56.32,21.58 57.47,36.16 58.62,35 C 59.77,33.83 60.91,15.16 62.06,14 C 63.21,12.83 64.36,28 65.51,28 C 66.66,28 67.81,14 68.96,14 C 70.11,14 71.26,29.16 72.41,28 C 73.56,26.83 74.71,7 75.86,7 C 77.01,7 78.16,23.33 79.31,28 C 80.45,32.66 81.60,37.91 82.75,35 C 83.90,32.08 85.05,12.83 86.20,10.5 C 87.35,8.16 88.50,20.41 89.65,21 C 90.80,21.58 91.95,16.33 93.10,14 C 94.25,11.66 95.40,5.25 96.55,7 C 97.70,8.75 99.42,21.58 100,24.5 L 100,40 L 0,40 Z"
              fill="url(#chartFill)"
              vectorEffect="non-scaling-stroke"
            ></path>

            {/* Line path */}
            <path
              d="M 0,7 C 0.57,8.16 2.29,11.08 3.44,14 C 4.59,16.91 5.74,23.33 6.89,24.5 C 8.04,25.66 9.19,23.33 10.34,21 C 11.49,18.66 12.64,10.5 13.79,10.5 C 14.94,10.5 16.09,18.66 17.24,21 C 18.39,23.33 19.54,23.33 20.68,24.5 C 21.83,25.66 22.98,26.83 24.13,28 C 25.28,29.16 26.43,32.66 27.58,31.5 C 28.73,30.33 29.88,23.33 31.03,21 C 32.18,18.66 33.33,16.91 34.48,17.5 C 35.63,18.08 36.78,25.66 37.93,24.5 C 39.08,23.33 40.22,11.08 41.37,10.5 C 42.52,9.91 43.67,20.41 44.82,21 C 45.97,21.58 47.12,12.25 48.27,14 C 49.42,15.75 50.57,30.33 51.72,31.5 C 52.87,32.66 54.02,20.41 55.17,21 C 56.32,21.58 57.47,36.16 58.62,35 C 59.77,33.83 60.91,15.16 62.06,14 C 63.21,12.83 64.36,28 65.51,28 C 66.66,28 67.81,14 68.96,14 C 70.11,14 71.26,29.16 72.41,28 C 73.56,26.83 74.71,7 75.86,7 C 77.01,7 78.16,23.33 79.31,28 C 80.45,32.66 81.60,37.91 82.75,35 C 83.90,32.08 85.05,12.83 86.20,10.5 C 87.35,8.16 88.50,20.41 89.65,21 C 90.80,21.58 91.95,16.33 93.10,14 C 94.25,11.66 95.40,5.25 96.55,7 C 97.70,8.75 99.42,21.58 100,24.5"
              fill="none"
              stroke="#bef264"
              strokeWidth="1"
              strokeLinecap="round"
              className="transition-all duration-300"
              vectorEffect="non-scaling-stroke"
            ></path>
          </svg>
        </div>
      </div>
    </article>
  );
}
