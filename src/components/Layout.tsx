import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsWithChildren } from "react";
import { Home, Layers, Briefcase, Mail, Info } from "lucide-react";
import { GlobalLighting } from "./GlobalLighting";
import { NavBar } from "./NavBar";
import { AboutModal } from "./AboutModal";

const ChatWidget = dynamic(
  () => import("./ChatWidget").then((module) => module.ChatWidget),
  { ssr: false }
);

export function Layout({ children }: PropsWithChildren) {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Services", url: "/services", icon: Layers },
    { name: "Careers", url: "/careers", icon: Briefcase },
    { name: "Contact", url: "/contact", icon: Mail },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at top, var(--accent-glow-1), transparent 42%), radial-gradient(circle at 80% 20%, var(--accent-glow-2), transparent 28%), linear-gradient(180deg, var(--overlay), transparent 18%)",
          }}
        />
        <GlobalLighting className="opacity-[0.82]" />
        <div className="absolute inset-0 bg-grid [background-size:72px_72px] opacity-[0.18]" />
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-accent-500/15 blur-[120px]" />
        <div className="absolute bottom-0 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-accent-400/10 blur-[140px]" />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      {/* Main Logo Container */}
      <div className="absolute top-6 sm:top-8 left-0 w-full z-50 pointer-events-none">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 flex items-center justify-start h-12 sm:h-24 lg:h-28">
          <div className="pointer-events-auto group">
            <div className="absolute -inset-8 bg-accent-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <a href="/" className="relative flex items-center justify-center p-2 rounded-2xl transition-all duration-300 hover:bg-foreground/[0.02] -ml-2">
              <img
                src="/logo.png"
                alt="Kapra Web AI"
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>

      <NavBar items={navItems} />

      <main id="main" className="relative">
        {children}
      </main>

      <AboutModal />
      <ChatWidget />
    </div>
  );
}
