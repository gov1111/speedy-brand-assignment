import Image from "next/image";
import { Inter } from "next/font/google";
import KeyMetrics from "@/components/dashboard-components/KeyMetrics";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`min-h-screen  w-full ${inter.className}`}>
      <KeyMetrics />
    </div>
  );
}
