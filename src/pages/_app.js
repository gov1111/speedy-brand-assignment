import "@/styles/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardSidebar from "@/components/dashboard-components/Sidebar";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ProgressBar height="4px" color="white" options={{ showSpinner: false }} shallowRouting />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar /> {/* Add the sidebar component here */}
          {/* <div className="relative">
            <div className="absolute">
              <SidebarTrigger />
            </div>
          </div> */}
          <Component {...pageProps} />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
