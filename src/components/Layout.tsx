import { PropsWithChildren } from "react";
import { GlobalLighting } from "./GlobalLighting";

const navigationItems = [
  { label: "Journey", href: "#journey" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" }
];

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

      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-950/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
          <a href="#top" className="font-display text-sm uppercase tracking-[0.35em] text-white/90">
            Kapra Web AI
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/65 sm:flex">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">{children}</main>
    </div>
  );
}
