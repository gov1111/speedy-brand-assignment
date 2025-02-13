import React, { useEffect, useState } from "react";
import { XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Button } from "../ui/button";
import { Bar, BarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users, Music, DollarSign } from "lucide-react";
import {
  activeData,
  chartConfig,
  chartData,
  data,
  dataForTopStreamedSongs,
  revenueData,
  revenueDataForPieChart,
  streamsData,
  usersData,
} from "@/data/dummyDataForCharts";
import Link from "next/link";
import Card from "../ui/CardForStats";
import { useRouter } from "next/router";

const KeyMetrics = () => {
  const router = useRouter();
  const [activeID, setActiveID] = useState(false);

  useEffect(() => {
    setActiveID(router.asPath.split("#")[1]);
  }, [router.asPath]);

  return (
    <div className="w-full h-full pr-5 pl-5 pt-12">
      <div>
        <p className="text-2xl font-semibold pl-6">Hey, welcome back 👋</p>
      </div>
      <StatsCards activeID={activeID} />
      <DataViz activeID={activeID} />
    </div>
  );
};

export default KeyMetrics;

const StatsCards = ({ activeID }) => {
  const ArtistCard = () => {
    return (
      <div
        className={`bg-black border border-gray-700 rounded-lg lg:min-w-[28rem] mt-6 h-[213px] ${
          activeID === "top_artists" && "animate-pop"
        }`}
      >
        <div className="mb-4 px-6 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-white">Top Artists</span>
            <Link href={"/top-artist"}>
              <Button variant={""} className="rounded-3xl">
                See In Detail
              </Button>
            </Link>
          </div>
        </div>

        <div className="h-32">
          <ChartContainer className={"h-32 w-full"} config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              {/* <CartesianGrid vertical={false} /> */}
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar isAnimationActive={false} minPointWidth={1} dataKey="Ed Sheeran" fill="white" radius={4} />

              <Bar
                isAnimationActive={false}
                minPointWidth={1}
                dataKey="Coldplay"
                fill="var(--color-Coldplay)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="md:p-6 p-1 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <Card activeID={activeID} itemID={"total_users"} title="Total Users" data={usersData} TitleIcon={Users} />
        <Card activeID={activeID} itemID={"active_users"} title="Active Users" data={activeData} TitleIcon={Users} />
        <Card activeID={activeID} itemID={"total_streams"} title="Total Streams" data={streamsData} TitleIcon={Music} />
        <Card activeID={activeID} itemID={"revenue"} title="Revenue" data={revenueData} TitleIcon={DollarSign} />
        <ArtistCard />
      </div>
    </div>
  );
};

const DataViz = ({ activeID }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);
  return (
    <>
      <UserGrowthViz isClient={isClient} activeID={activeID} />
      <RevenueDistributionViz activeID={activeID} />
      <TopStreamedSongsViz isClient={isClient} activeID={activeID} />
    </>
  );
};

const UserGrowthViz = ({ isClient, activeID }) => {
  return (
    <div className="">
      <div className="flex mt-36 items-center gap-3">
        <p className="lg:text-2xl md:text-lg text-sm pl-8">Important data Visualization metrics</p> <BookIcon />
      </div>
      <div
        className={`lg:flex lg:flex-row flex-col gap-8 md:p-6 p-1 bg-black text-white flex-wrap ${
          activeID === "user_growth_chart" && "animate-pop-mini"
        }`}
      >
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                stroke="#666"
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                label={false}
                tick={false}
                className="govind"
                stroke="#666"
                width={isClient && window.innerWidth < 700 ? 0 : 20}
                //   tick={{ fill: "#666", fontSize: 10 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  padding: "8px",
                }}
                itemStyle={{ color: "#fff", fontSize: "12px" }}
                labelStyle={{ color: "#999", fontSize: "12px" }}
              />
              <Line type="monotone" dataKey="totalUsers" stroke="#fff" strokeWidth={2} dot={false} fill="url(#total)" />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="#bec0c2"
                strokeWidth={2}
                dot={false}
                fill="url(#active)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-semibold">User Growth Analysis</h2>
          <p className="text-gray-300 text-sm">
            Our platform shows exceptional growth with consistent user retention and engagement. Monthly metrics
            indicate strong adoption rates and healthy user activity patterns across all segments.
          </p>
          <ul className="text-gray-400 text-sm space-y-2 list-disc pl-3">
            <li>Total users: 100k → 330k with 55% retention rate</li>
            <li>Monthly cohorts demonstrate 8% consistent growth</li>
            <li>Active users maintain strong platform engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const RevenueDistributionViz = ({ activeID }) => {
  const COLORS = ["#FFFFFF", "#bec0c2", "#787878", "#9ca3af", "#9ca3af"];

  return (
    <div className="mt-28">
      <div
        className={`lg:flex lg:flex-row flex-col items-center gap-8 p-6 bg-black text-white ${
          activeID === "revenue_distribution" && "animate-pop-mini"
        }`}
      >
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                {COLORS.map((color, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.2} />
                  </linearGradient>
                ))}
              </defs>
              <Pie data={revenueDataForPieChart} innerRadius={60} outerRadius={130} paddingAngle={2} dataKey="value">
                {revenueDataForPieChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} stroke="#000" strokeWidth={1} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  padding: "8px",
                }}
                itemStyle={{ color: "#fff", fontSize: "12px" }}
                labelStyle={{ color: "#999", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-semibold">Revenue Distribution</h2>
          <p className="text-gray-300 text-sm">
            Analysis shows diversified revenue streams with strong performance across all channels. Subscription model
            leads growth while maintaining balanced income from multiple sources.
          </p>
          <ul className="text-gray-400 text-sm space-y-2 list-disc pl-3">
            <li>Subscriptions contribute 45% of total revenue</li>
            <li>Advertising delivers 25% of overall income</li>
            <li>Events and licensing make up remaining 30%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const TopStreamedSongsViz = ({ isClient, activeID }) => {
  return (
    <div className="mt-28">
      <div
        className={`lg:flex lg:flex-row flex-col items-center gap-8 p-6 bg-black text-white ${
          activeID === "top_5_streamed_songs" && "animate-pop-mini"
        }`}
      >
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataForTopStreamedSongs} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#fff" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                stroke="#666"
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={isClient && window?.innerWidth < 700 && 0}
                label={false}
                tick={false}
                stroke="#666"
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  padding: "8px",
                }}
                itemStyle={{ color: "#fff", fontSize: "12px" }}
                labelStyle={{ color: "#999", fontSize: "12px" }}
                formatter={(value) => `${(value / 1000000).toFixed(1)}M streams`}
              />
              <Bar
                dataKey="streams"
                fill="url(#barGradient)"
                activeBar={{ fill: "url(#barGradient)" }}
                radius={[14, 14, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-semibold">Top Streamed Songs</h2>
          <p className="text-gray-300 text-sm">
            Streaming metrics demonstrate robust engagement with trending content. User preferences show strong
            alignment with curated playlists and recommended tracks.
          </p>
          <ul className="text-gray-400 text-sm space-y-2 list-disc pl-3">
            <li>&quot;Shape of You&quot; leads with 2.8M monthly streams</li>
            <li>Top 5 tracks exceed 10M combined streams</li>
            <li>Pop and indie genres show highest engagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const BookIcon = () => {
  return (
    <svg height="26" stroke-linejoin="round" viewBox="0 0 16 16" width="26">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1H0.75H5C6.2267 1 7.31583 1.58901 8 2.49963C8.68417 1.58901 9.7733 1 11 1H15.25H16V1.75V13V13.75H15.25H10.7426C10.1459 13.75 9.57361 13.9871 9.15165 14.409L8.53033 15.0303H7.46967L6.84835 14.409C6.42639 13.9871 5.8541 13.75 5.25736 13.75H0.75H0V13V1.75V1ZM7.25 4.75C7.25 3.50736 6.24264 2.5 5 2.5H1.5V12.25H5.25736C5.96786 12.25 6.65758 12.4516 7.25 12.8232V4.75ZM8.75 12.8232V4.75C8.75 3.50736 9.75736 2.5 11 2.5H14.5V12.25H10.7426C10.0321 12.25 9.34242 12.4516 8.75 12.8232Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
