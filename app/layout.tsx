import "./globals.css";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import BackgroundVideo from "../components/BackgroundVideo";
import FloatingPlayer from "../components/FloatingPlayer";



const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel" });

export const metadata = {
  title: "McGoblins — 666 PFP Card Collection",
  description: "Explore the 666-piece McGoblins PFP card collection on OpenSea.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${pixel.variable}`}>
      <body className="min-h-screen overflow-x-hidden overflow-y-auto xl:overflow-y-hidden">
        <BackgroundVideo />
        <FloatingPlayer />
        {children}
      </body>

    </html>
  );
}
