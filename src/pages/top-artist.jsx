import { Star, TrendingUp } from "lucide-react";
import React, { memo } from "react";
import { Users, Music } from "lucide-react";
import { activeData, streamsData, usersData } from "@/data/dummyDataForCharts";
import Card from "@/components/ui/CardForStats";
import TopArtistStatsCard from "@/components/dashboard-components/top-artist/StatsForTopArtist";

const TopArtistIndexPage = () => {
  return (
    <div className="w-full h-full pr-5 pl-5 pt-12">
      <div>
        <div className="flex items-center gap-2">
          <p className="lg:text-3xl text-2xl font-semibold lg:pl-6 md:pl-3 pl-2">Star artist of the month </p>
          <Star className="fill-white" />
        </div>
      </div>
      <div>
        <BasicIngoOFArtist />
      </div>
    </div>
  );
};

export default TopArtistIndexPage;

const BasicIngoOFArtist = memo(() => {
  return (
    <div className="lg:mt-10 mt-10 md:mt-12">
      <div className="flex items-center justify-evenly lg:flex-nowrap flex-wrap">
        <img
          src="https://wallpapers.com/images/hd/simple-portrait-ed-sheeran-my1srfk9q2l2rj9m.jpg"
          className="lg:w-56 lg:h-56 w-80 h-80 rounded-xl object-cover"
        />
        <StatsCards />
      </div>
      <p className="text-gray-500 lg:w-[80%] lg:pl-8 pl-2 mt-2 lg:text-base text-sm w-full">
        Ed Sheeran is a British singer-songwriter who burst onto the music scene in 2011. Known for his distinctive
        voice and heartfelt lyrics, he has dominated Spotify&apos;s streaming charts and earned multiple Grammy Awards. His
        blend of acoustic pop, folk, and R&B has made him one of the most successful artists of his generation.
      </p>
      <div className="mt-20">
        <div className="flex pl-8 items-center gap-2">
          <p className="text-xl font-semibold">Top Streaming locations</p>
          <TrendingUp className="w-8 h-8" />
        </div>
        <p className="pl-8 text-sm text-gray-400">Based on number of streams</p>
        <TopArtistStatsCard />
      </div>
    </div>
  );
});
BasicIngoOFArtist.displayName = "BasicIngoOFArtist";

const StatsCards = memo(() => {
  return (
    <div className="md:p-6 p-1 space-y-6 w-full md:w-fit">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <Card title="Total Users" accessedFrom={"starArtist"} data={usersData} TitleIcon={Users} />
        <Card title="Active Users" accessedFrom={"starArtist"} data={activeData} TitleIcon={Users} />
        <Card title="Total Streams" accessedFrom={"starArtist"} data={streamsData} TitleIcon={Music} />
      </div>
    </div>
  );
});

StatsCards.displayName = "StatsCards";
