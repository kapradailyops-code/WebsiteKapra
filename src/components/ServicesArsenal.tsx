import { ReactNode } from "react";
import { useStaggerAnimation } from "../hooks/useAnimation";
import { GlowBox } from "./GlowBox";

interface ServiceItem {
  title: string;
  description: string;
  bullets: string[];
  icon: ReactNode;
}

const services: ServiceItem[] = [
  {
    title: "Web Dev",
    description:
      "Flagship websites, launch pages, and product surfaces tuned for performance and conviction.",
    bullets: ["Next.js builds", "CMS and API integration", "SEO and performance hardening"],
    icon: <BrowserIcon />
  },
  {
    title: "Mobile Apps",
    description:
      "Responsive, clean, touch-first interfaces that carry the same premium feel into the pocket.",
    bullets: ["React Native strategy", "Design system continuity", "Launch and iteration support"],
    icon: <PhoneIcon />
  },
  {
    title: "AI Solutions",
    description:
      "Applied AI systems that help teams automate workflows, surface insight, and respond faster.",
    bullets: ["Assistant experiences", "Workflow automation", "Decision-support tooling"],
    icon: <SparkIcon />
  }
];

export function ServicesArsenal() {
  const sectionRef = useStaggerAnimation<HTMLDivElement>();

  return (
    <section id="services" className="relative px-6 py-24 sm:px-10 lg:px-14">
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div data-stagger className="max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">
            Services Arsenal
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,4.5rem)] font-semibold tracking-[-0.04em] text-white">
            Three service lines, one premium product language.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            The site is set up to present Kapra Web AI as a focused studio: web, mobile,
            and AI capability grouped under a single visual and technical standard.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <GlowBox
              key={service.title}
              as="article"
              data-stagger
              className="glass-panel group flex h-full flex-col p-8 transition duration-500 hover:-translate-y-1 hover:border-accent-300/25 hover:bg-white/[0.08] hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent-300 transition duration-500 group-hover:border-accent-300/30 group-hover:text-white">
                  {service.icon}
                </div>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/40">
                  {service.title}
                </span>
              </div>

              <h3 className="mt-8 font-display text-3xl text-white">{service.title}</h3>
              <p className="mt-4 text-base leading-8 text-white/70">{service.description}</p>

              <ul className="mt-8 space-y-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="h-2 w-2 rounded-full bg-accent-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </GlowBox>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrowserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current">
      <rect x="3" y="5" width="18" height="14" rx="3" strokeWidth="1.5" />
      <path d="M3 9h18" strokeWidth="1.5" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current">
      <rect x="7" y="2.75" width="10" height="18.5" rx="2.75" strokeWidth="1.5" />
      <path d="M10 5.5h4" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="18" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current">
      <path d="m12 3 2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1L12 3Z" strokeWidth="1.5" />
      <path d="M18.5 3.5 19 5l1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" strokeWidth="1.2" />
    </svg>
  );
}
