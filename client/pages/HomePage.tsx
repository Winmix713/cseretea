import { Target, Activity, Zap, BarChart2 } from "lucide-react";
import { useMatchData } from "../hooks/useMatchData";
import SkeletonLoader from "../components/ui/SkeletonLoader";

// Senior komponensek importálása
import HeroSection from "../components/dashboard/HeroSection";
import StatCard from "../components/dashboard/StatCard";
import BttsChart from "../components/dashboard/BttsChart";
import LeagueTable from "../components/dashboard/LeagueTable";

// Mock adatok a Sparkline grafikonokhoz (hogy a Stat kártyák "éljenek")
const mockSparklines = {
  possession: [45, 48, 52, 55, 60, 58, 62, 64, 61, 64],
  xg: [0.5, 0.8, 1.2, 0.9, 1.5, 1.8, 2.1, 1.9, 2.3, 2.42],
  pass: [82, 85, 84, 88, 89, 90, 88, 91, 92, 91],
  shots: [5, 8, 7, 12, 10, 14, 15, 12, 16, 18],
};

const HomePage = () => {
  // Meglévő hookok használata
  const { loading, bttsData, leagueTable } = useMatchData();

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- HERO SECTION --- */}
      <HeroSection />

      {/* MASTER GRID LAYOUT - Stats Below */}
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 auto-rows-[minmax(0,auto)]">
        {/* --- ROW 2: STATS STRIP --- */}
        {/* Mindegyik kártya 3/12 szélességű, így 4 db tölti ki a sort */}

        <div className="xl:col-span-3 md:col-span-1 h-full">
          <StatCard
            title="Possession"
            value="64"
            subValue="%"
            subLabel="Dominating Midfield"
            percentage={64}
            icon={<Activity className="w-5 h-5 text-white" />}
            sparklineData={mockSparklines.possession}
          />
        </div>

        <div className="xl:col-span-3 md:col-span-1 h-full">
          <StatCard
            title="Expected Goals (xG)"
            value="2.42"
            subLabel="+0.8 vs Avg"
            percentage={82}
            icon={<Target className="w-5 h-5 text-white" />}
            sparklineData={mockSparklines.xg}
          />
        </div>

        <div className="xl:col-span-3 md:col-span-1 h-full">
          <StatCard
            title="Pass Accuracy"
            value="91"
            subValue="%"
            subLabel="428 Completed"
            percentage={91}
            icon={<Zap className="w-5 h-5 text-white" />}
            sparklineData={mockSparklines.pass}
          />
        </div>

        <div className="xl:col-span-3 md:col-span-1 h-full">
          <StatCard
            title="Total Shots"
            value="18"
            subLabel="6 On Target"
            percentage={45}
            icon={<BarChart2 className="w-5 h-5 text-white" />}
            sparklineData={mockSparklines.shots}
          />
        </div>

        {/* --- ROW 3: DEEP DIVE --- */}

        {/* BTTS Chart: 8/12 szélesség, fix magassággal a tökéletes igazításhoz */}
        <div className="xl:col-span-8 h-[520px]">
          <BttsChart data={bttsData} />
        </div>

        {/* League Table: 4/12 szélesség, ugyanazzal a magassággal */}
        <div className="xl:col-span-4 h-[520px]">
          <LeagueTable teams={leagueTable} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
