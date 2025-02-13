import React, { memo } from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { topArtistDataChart, topArtistPieGraphData } from "@/data/dummyDataForCharts";

const TopArtistStatsCard = memo(() => {
  const geographyData = [
    { country: "Australia", percentage: 72 },
    { country: "USA", percentage: 62 },
    { country: "RSA", percentage: 92 },
    { country: "Brazil", percentage: 7 },
    { country: "Thailand", percentage: 50 },
  ];

  return (
    <div className="w-full bg-black flex gap-20 lg:pl-7 pl-1 mt-6 items-start flex-wrap lg:mb-16 mb-10">
      <div className="lg:w-[38%] bg-black text-gray-300 p-6 rounded-xl border border-gray-800">
        <div className="p-0">
          <div className="grid grid-cols-1 gap-8">
            <div className="block">
              <img src={`/map.png`} alt="World Map" className="w-full h-full object-contain " />
            </div>

            <div className="space-y-2 w-full">
              {geographyData.map((item) => (
                <div key={item.country} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-xs">{item.country}</span>
                      <span className="text-gray-300 text-sm">{item.percentage}%</span>
                    </div>
                    <div className="group w-full bg-gray-900 cursor-pointer rounded-full h-2">
                      <div
                        className="bg-gray-800 h-2 rounded-full transition-all ease-in-out duration-300 group-hover:bg-white"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Sheeran&apos;s contribution to platform&apos;s revenue</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={topArtistDataChart} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={topArtistPieGraphData} dataKey="revenueInMil" nameKey="month" innerRadius={60} strokeWidth={2}>
                {topArtistPieGraphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={topArtistDataChart[entry.month].color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col flex gap-2 text-sm">
          <div className="">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 45.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <ul className="mt-4 text-gray-400 list-disc ml-4 text-sm space-y-1">
                <li>Sharp increase in revenue post the release of the new album</li>
                <li>A significant 56% increase in viewership and streams compared to last album</li>
                <li>The new album performed 70% better than all other drops</li>
                <li>Average daily listener count peaked at 2.8M during launch week</li>
                <li>Engagement rate on platform increased by 43% post-release</li>
                <li>Hit #1 in 28 markets within first 24 hours</li>
                <li>Collaboration tracks outperformed solo tracks by 32%</li>
                <li>Mobile streaming accounted for 76% of total plays</li>
                <li>First week streams surpassed previous record by 1.2M plays</li>
                <li>International markets showed 85% higher engagement rates</li>
              </ul>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
});

export default TopArtistStatsCard;
TopArtistStatsCard.displayName = "TopArtistStatsCard";
