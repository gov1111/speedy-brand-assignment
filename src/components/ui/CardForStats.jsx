import React, { memo } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const Card = memo(({ title, data, accessedFrom, TitleIcon, activeID, itemID }) => {
  return (
    <div
      className={`bg-black border border-gray-700 rounded-lg ${activeID === itemID && "animate-pop"} ${
        accessedFrom === "starArtist" ? "lg:min-w-[20rem]" : ""
      } mt-6`}
    >
      <div className="mb-4 px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="text-gray-400 mt-1">{title}</div>
          <TitleIcon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-white">{data[data.length - 1].value.toLocaleString()}</span>
          <span className="text-xs px-2 py-1 rounded bg-green-900 text-green-400">+2.5%</span>
        </div>
      </div>

      <div className={`${accessedFrom === "starArtist" ? "h-20" : "h-28"}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                <stop offset="30%" stopColor="#ffffff" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
              <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <XAxis dataKey="name" hide={true} />
            <YAxis hide={true} />
            <Tooltip
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-out"
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="bg-black px-2 py-1 rounded">
                      <span className="text-white text-sm">
                        {`${title}: ${payload[0].value.toLocaleString()} in ${payload[0].payload.name}`}
                      </span>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{
                stroke: "white",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              offset={0}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={false}
              activeDot={{
                r: 3,
                fill: "#fff",
                strokeWidth: 0,
              }}
              style={{ filter: "url(#glow)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
export default Card;

Card.displayName = "Card_stats";
