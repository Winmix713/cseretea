import Layout from "@/components/Layout";
import MatchPicker from "@/components/dashboard/MatchPicker";
import StatsCard from "@/components/dashboard/StatsCard";
import BTTSChart from "@/components/dashboard/BTTSChart";
import LeagueTable from "@/components/dashboard/LeagueTable";
import { Activity, Target, Zap, BarChart2 } from "lucide-react";

export default function Index() {
  const mockBTTSData = [
    { matchId: "1", bttsCount: 6, date: "2024-01-01" },
    { matchId: "2", bttsCount: 7, date: "2024-01-02" },
    { matchId: "3", bttsCount: 5, date: "2024-01-03" },
    { matchId: "4", bttsCount: 8, date: "2024-01-04" },
    { matchId: "5", bttsCount: 6, date: "2024-01-05" },
    { matchId: "6", bttsCount: 9, date: "2024-01-06" },
    { matchId: "7", bttsCount: 7, date: "2024-01-07" },
    { matchId: "8", bttsCount: 8, date: "2024-01-08" },
  ];

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
              details={{
                current: "64%",
                average: "52%",
                lastMatch: "68%",
                insight:
                  "Team is controlling the match with above-average possession",
              }}
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
              details={{
                current: "2.42",
                average: "1.62",
                lastMatch: "2.85",
                insight:
                  "Creating high-quality chances with strong finishing potential",
              }}
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
              details={{
                current: "91%",
                average: "85%",
                lastMatch: "89%",
                insight:
                  "Excellent passing accuracy indicates strong team coordination",
              }}
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
              details={{
                current: "18",
                average: "16",
                lastMatch: "22",
                insight:
                  "Slightly fewer shots but maintaining good accuracy on target",
              }}
            />
          </article>

          {/* BIG CHART: BTTS Momentum */}
          <article className="h-[520px] xl:col-span-8">
            <BTTSChart data={mockBTTSData} />
          </article>

          {/* TABLE: Premier League */}
          <LeagueTable />
        </section>
      </div>
    </Layout>
  );
}
