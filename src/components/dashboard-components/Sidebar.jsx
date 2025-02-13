import React from "react";
import { BarChart3, Database, LineChart, PieChart, Users, Music, DollarSign, PlayCircle, Star } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useRouter } from "next/router";

export default function DashboardSidebar() {
  const router = useRouter();
  const sidebarData = [
    {
      label: "Key Metrics",
      items: [
        { icon: Users, text: "Total Users" },
        { icon: Users, text: "Active Users" },
        { icon: PlayCircle, text: "Total Streams" },
        { icon: DollarSign, text: "Revenue" },
        { icon: Star, text: "Top Artists" },
      ],
    },
    {
      label: "Data Visualization",
      items: [
        { icon: LineChart, text: "User Growth Chart" },
        { icon: PieChart, text: "Revenue Distribution" },
        { icon: BarChart3, text: "Top 5 Streamed Songs" },
      ],
    },
    {
      label: "Data Table",
      items: [
        { icon: Music, text: "Song Name" },
        { icon: Users, text: "Artist" },
        { icon: Database, text: "Stream Details" },
      ],
    },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarContent className="pt-1">
        {sidebarData.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel className="text-white text-sm">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent className="text-slate-400 !text-xs">
              <SidebarMenu>
                {group.items.map((item, itemIndex) => (
                  <SidebarMenuItem
                    className="!text-xs"
                    onClick={() => {
                      console.log(item.text);
                      const dataTableArray = ["Song Name", "Artist", "Stream Details"];

                      if (item.text === "Top Artists") {
                        router.push("/top-artist");
                      } else if (dataTableArray.some((i) => i === item.text)) {
                        router.push("/data-table");
                      } else {
                        router.push(
                          {
                            pathname: "/",
                            hash: `#${item.text.toLowerCase().replace(/ /g, "_")}`,
                          },
                          undefined,
                          { scroll: false }
                        );
                      }
                    }}
                    key={itemIndex}
                  >
                    <SidebarMenuButton>
                      <item.icon className="h-3 w-3" />
                      <span className="text-[13px]">{item.text}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
