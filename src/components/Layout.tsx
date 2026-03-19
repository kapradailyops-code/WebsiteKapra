import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PropsWithChildren } from "react";
import { Home, Layers, Briefcase, Mail } from "lucide-react";
import { GlobalLighting } from "./GlobalLighting";
import { NavBar } from "./NavBar";
import { ChatWidget } from "./ChatWidget";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Services", url: "/services", icon: Layers },
  { name: "Careers", url: "/careers", icon: Briefcase },
  { name: "Contact", url: "/contact", icon: Mail },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights /> 
      </body>
    </html>
  );
}
export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-brand-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_42%),radial-gradient(circle_at_80%_20%,_rgba(56,189,248,0.08),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_18%)]" />
        <GlobalLighting className="opacity-[0.82]" />
        <div className="absolute inset-0 bg-grid [background-size:72px_72px] opacity-[0.18]" />
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-accent-500/15 blur-[120px]" />
        <div className="absolute bottom-0 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-accent-400/10 blur-[140px]" />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-brand-950"
      >
        Skip to content
      </a>

      <NavBar items={navItems} />

      <main id="main" className="relative">
        {children}
      </main>
      <ChatWidget />
    </div>
  );
}
