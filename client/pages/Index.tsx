import Layout from "@/components/Layout";
import MatchPicker from "@/components/dashboard/MatchPicker";
import StatsCard from "@/components/dashboard/StatsCard";
import BTTSChart from "@/components/dashboard/BTTSChart";
import LeagueTable from "@/components/dashboard/LeagueTable";
import { Activity, Target, Zap, BarChart2 } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <div className="mx-auto max-w-[1920px] space-y-8 p-4 pb-24 md:p-6 lg:p-8">
        {/* SECTION 1: Match Picker */}
        <MatchPicker />

        {/* SECTION 2: Stats & Details */}
        <section
          className="auto-rows-[minmax(0,auto)] grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12 gap-x-6 gap-y-6"
          aria-labelledby="stats-details-heading"
        >
          <h2 id="stats-details-heading" className="sr-only">
            Statistics and Details
          </h2>

          {/* CARD 1: Possession */}
          <article className="h-full xl:col-span-3 md:col-span-1">
            <StatsCard
              title="Possession"
              value="64"
              icon={Activity}
              percentage={64}
              trendText="Dominating Midfield"
              gradientId="grad-possession-card"
              themeColor="#fbbf24"
              trend="up"
            />
          </article>

          {/* CARD 2: Expected Goals (xG) */}
          <article className="h-full xl:col-span-3 md:col-span-1">
            <StatsCard
              title="Expected Goals (xG)"
              value="2.42"
              icon={Target}
              percentage={82}
              trendText="+0.8 vs Avg"
              gradientId="grad-xg-card"
              themeColor="#bef264"
              trend="up"
            />
          </article>

          {/* CARD 3: Pass Accuracy */}
          <article className="h-full xl:col-span-3 md:col-span-1">
            <StatsCard
              title="Pass Accuracy"
              value="91"
              icon={Zap}
              percentage={91}
              trendText="428 Completed"
              gradientId="grad-pass-accuracy-card"
              themeColor="#bef264"
              trend="up"
            />
          </article>

          {/* CARD 4: Total Shots */}
          <article className="h-full xl:col-span-3 md:col-span-1">
            <StatsCard
              title="Total Shots"
              value="18"
              icon={BarChart2}
              percentage={45}
              trendText="6 On Target"
              gradientId="grad-total-shots-card"
              themeColor="#fbbf24"
              trend="down"
            />
          </article>

          {/* BIG CHART: BTTS Momentum */}
          <BTTSChart />

          {/* TABLE: Premier League */}
          <LeagueTable />
        </section>
      </div>
    </Layout>
  );
}
