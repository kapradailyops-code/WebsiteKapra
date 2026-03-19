"use client";

import { motion, type Variants } from "framer-motion";
import { Globe2, Smartphone, Sparkles, Code2, Palette, TrendingUp, ArrowUpRight, Check, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { GlowBox } from "./GlowBox";

const services = [
  {
    eyebrow: "01 — Web",
    icon: Globe2,
    title: "Web Development",
    tagline: "High-fidelity web experiences from concept to launch.",
    description:
      "We build flagship websites, product marketing surfaces, and SaaS dashboards that convert. Every pixel is intentional — every interaction earns its place.",
    deliverables: [
      "Next.js / React architecture",
      "Responsive design system",
      "CMS integration (Sanity, Contentful)",
      "SEO & Core Web Vitals tuning",
      "Analytics & A/B testing setup",
      "Framer Motion animations",
    ],
    accent: "from-sky-500 to-cyan-400",
  },
  {
    eyebrow: "02 — Mobile",
    icon: Smartphone,
    title: "Mobile Applications",
    tagline: "Touch-first products built for performance.",
    description:
      "We engineer cross-platform mobile apps using React Native and Expo. Native feel, shared codebase — shipped fast without sacrificing quality.",
    deliverables: [
      "React Native / Expo builds",
      "iOS & Android release pipelines",
      "Offline-first architecture",
      "Push notifications & deep links",
      "App Store Optimization",
      "OTA update strategy",
    ],
    accent: "from-violet-500 to-purple-400",
  },
  {
    eyebrow: "03 — AI",
    icon: Sparkles,
    title: "AI Solutions",
    tagline: "Applied intelligence that moves the needle.",
    description:
      "We integrate AI into products that need to be smarter — from LLM-powered features to automated workflows and custom-trained models.",
    deliverables: [
      "LLM API integration (OpenAI, Anthropic)",
      "RAG pipelines & vector search",
      "Custom model fine-tuning",
      "AI-powered internal tools",
      "Automated content workflows",
      "Data extraction & structuring",
    ],
    accent: "from-amber-500 to-orange-400",
  },
  {
    eyebrow: "04 — Design",
    icon: Palette,
    title: "UI/UX Design",
    tagline: "Premium interfaces that feel inevitable.",
    description:
      "Kapra's design practice covers brand identity, product design, and design systems. We create visual languages that scale from landing page to full product.",
    deliverables: [
      "Brand identity & visual language",
      "Figma design systems",
      "Prototyping & user testing",
      "Interaction design",
      "Illustration & iconography",
      "Component library documentation",
    ],
    accent: "from-rose-500 to-pink-400",
  },
  {
    eyebrow: "05 — E-Commerce",
    icon: TrendingUp,
    title: "E-Commerce",
    tagline: "Revenue-optimised storefronts at digital-native speed.",
    description:
      "We build Shopify-powered storefronts and custom checkout experiences that feel like premium brands — not templates. High conversion is built in from day one.",
    deliverables: [
      "Shopify / headless commerce builds",
      "Custom checkout flows",
      "Product configurators",
      "Subscriptions & upsell logic",
      "Inventory sync & ERP integration",
      "Performance optimisation",
    ],
    accent: "from-emerald-500 to-teal-400",
  },
  {
    eyebrow: "06 — Strategy",
    icon: Code2,
    title: "Tech Strategy",
    tagline: "Architecture decisions that age well.",
    description:
      "We advise on system architecture, stack selection, and engineering team structure — helping you avoid costly pivots by thinking clearly before you build.",
    deliverables: [
      "Tech stack audit & selection",
      "System architecture blueprints",
      "API design & documentation",
      "Engineering team structuring",
      "Code review & refactoring",
      "Scalability roadmapping",
    ],
    accent: "from-cyan-500 to-blue-400",
  },
];

const pillars = [
  { icon: Zap, label: "Fast Delivery", copy: "Typical projects launch in 4–8 weeks, not quarters." },
  { icon: Shield, label: "Production Ready", copy: "Everything ships tested, documented, and fully yours." },
  { icon: Clock, label: "Long-term partnership", copy: "We stay to iterate — not disappear after handoff." },
];

const process = [
  { step: "01", title: "Discovery Call", copy: "We audit your existing product, goals, and competitive landscape in a focused 45-minute session." },
  { step: "02", title: "Technical Brief", copy: "We produce a written scope with architecture choices, timelines, and risk flags — no fluff." },
  { step: "03", title: "Design Sprint", copy: "High-fidelity mockups and prototypes reviewed with you before a single line of production code is written." },
  { step: "04", title: "Build & Ship", copy: "Iterative development in 1-week cycles. You see progress every Friday. Nothing ships blind." },
  { step: "05", title: "Handoff & Scale", copy: "Full documentation, training, and an optional retainer to keep your product sharp as it grows." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const } }),
};

export function ServicesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative px-6 pb-16 pt-32 lg:px-14 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">Services Arsenal</p>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white">
              Full-cycle product<br className="hidden sm:block" />{" "}
              <span className="gradient-text">engineering.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              We bundle design, development, strategy, and AI into a single premium pipeline. You describe the vision — we build the system that carries it.
            </p>
          </motion.div>

          {/* Pillars */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, label, copy }, i) => (
              <motion.div key={label} initial="hidden" animate="visible" variants={fadeUp} custom={i + 1}>
                <GlowBox className="flex items-start gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-accent-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium text-white">{label}</p>
                    <p className="mt-1 font-body text-sm leading-6 text-white/58">{copy}</p>
                  </div>
                </GlowBox>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="px-6 py-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ eyebrow, icon: Icon, title, tagline, description, deliverables, accent }, i) => (
              <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 3}>
                <GlowBox className="group relative flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]">
                  {/* Accent glow */}
                  <div className={`absolute -top-px left-8 right-8 h-px bg-gradient-to-r ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/40">{eyebrow}</p>
                    <div className={`mt-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-1 font-body text-sm font-medium text-accent-300/80">{tagline}</p>
                    <p className="mt-4 font-body text-sm leading-7 text-white/60">{description}</p>
                  </div>

                  <div className="mt-8 flex-1">
                    <p className="mb-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/35">Deliverables</p>
                    <ul className="space-y-2">
                      {deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 font-body text-sm text-white/65">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-300" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.24em] text-accent-300 transition-colors hover:text-white"
                  >
                    Start this project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </GlowBox>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">How we work</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.04em] text-white">
              Our process, plain English.
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-accent-400/40 via-accent-400/10 to-transparent lg:block" />

            <div className="space-y-8">
              {process.map(({ step, title, copy }, i) => (
                <motion.div
                  key={step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="lg:pl-20"
                >
                  <GlowBox className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-7 lg:p-8">
                    {/* dot */}
                    <div className="absolute -left-[3.25rem] top-8 hidden h-3 w-3 rounded-full bg-accent-400 shadow-[0_0_12px_rgba(56,189,248,0.6)] lg:block" />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-accent-300/60">{step}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-2 font-body text-sm leading-7 text-white/62">{copy}</p>
                  </GlowBox>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 pt-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <GlowBox className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_60%)] p-12 text-center lg:p-20">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent" />
            <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold tracking-[-0.04em] text-white">
              Ready to build something real?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/62">
              Tell us what you're working on. We'll come back with a clear direction — no sales pitch, just the most direct path to launch.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.2em] text-brand-950 transition hover:bg-slate-100"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Join the team
              </Link>
            </div>
          </GlowBox>
        </div>
      </section>
    </div>
  );
}
