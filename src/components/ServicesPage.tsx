"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { Globe2, Smartphone, Sparkles, Code2, Palette, TrendingUp, ArrowUpRight, Check, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { GlowBox } from "./GlowBox";
import { LampSection } from "./LampSection";

const services = [
  {
    eyebrow: "01 — Mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "iOS and Android apps users actually love.",
    description:
      "We build blazing-fast, beautiful mobile apps. Using modern cross-platform or native frameworks, we ensure your app works flawlessly on every device, from the first install to the millionth active user.",
    deliverables: [
      "Cross-platform & Native builds",
      "iOS & Android pipelines",
      "Offline-first architecture",
      "UI/UX designed for mobile",
      "App Store Optimization",
      "OTA update strategy",
    ],
    accent: "from-violet-500 to-purple-400",
  },
  {
    eyebrow: "02 — AI Tools",
    icon: Sparkles,
    title: "Custom AI Automation",
    tagline: "Automate workflows and reduce operational costs.",
    description:
      "Stop settling for off-the-shelf wrappers. We build custom AI models, chatbots, and predictive tools trained on your specific data to automate workflows and unlock entirely new revenue streams.",
    deliverables: [
      "Custom model fine-tuning",
      "Workflow automation logic",
      "Predictive analytics engines",
      "Internal AI dashboards",
      "Data privacy & compliance",
      "Secure API architecture",
    ],
    accent: "from-amber-500 to-orange-400",
  },
  {
    eyebrow: "03 — Integration",
    icon: Zap,
    title: "AI Integration Services",
    tagline: "Supercharge your existing tools.",
    description:
      "Already have an app or software? We can supercharge it. We seamlessly tie powerful machine learning capabilities and large language models into your existing mobile apps and business systems.",
    deliverables: [
      "LLM API integration",
      "RAG pipelines & vector search",
      "Legacy system modernisation",
      "Real-time AI feature sync",
      "Scalable backend architecture",
      "Analytics & logging",
    ],
    accent: "from-sky-500 to-cyan-400",
  },
];

const pillars = [
  { icon: Zap, label: "Unified Agency", copy: "Why coordinate between disconnected vendors? We bring both mobile and AI under one roof." },
  { icon: Shield, label: "Production Ready", copy: "Apps and AI models shipped tested, documented, and fully yours." },
  { icon: Clock, label: "Long-term partnership", copy: "We stay to iterate and refine your AI models as your business scales." },
];

const process = [
  { step: "01", title: "Discovery & Scoping", copy: "We audit your data, business goals, and mobile app requirements to find exactly where AI will provide the highest ROI." },
  { step: "02", title: "Strategy & Architecture", copy: "We map the user journey and design scalable technical architecture that handles both app traffic and complex AI processes." },
  { step: "03", title: "Agile Engineering", copy: "Our team builds your front-end perfectly in-sync with your AI and backend infrastructure, keeping you updated weekly." },
  { step: "04", title: "Launch & Scale", copy: "We don't just hand over the code. We help you launch, monitor performance, and seamlessly scale your new digital capabilities." },
  { step: "05", title: "Ongoing Optimisation", copy: "We continue to train your AI models and update your mobile apps to adapt to new market demands and user feedback." },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const } }),
};

export function ServicesPage() {
  const processRef = useRef<HTMLDivElement>(null);
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start center", "end end"]
  });

  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative px-6 pb-16 pt-32 lg:px-14 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">Services</p>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.88] tracking-[-0.04em] text-foreground">
              Intelligent Custom AI<br className="hidden sm:block" />{" "}
              <span className="gradient-text">&amp; Mobile Apps.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75 sm:text-xl sm:leading-relaxed">
              Build powerful iOS and Android apps backed by cutting-edge AI. From startup MVPs to enterprise-grade automation, we engineer digital products that scale with your business and outsmart the competition.
            </p>
          </motion.div>

          {/* Pillars */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, label, copy }, i) => (
              <motion.div key={label} initial="hidden" animate="visible" variants={fadeUp} custom={i + 1}>
                <GlowBox className="flex items-start gap-4 rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.02] p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.06] text-accent-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium text-foreground">{label}</p>
                    <p className="mt-1 font-body text-sm leading-6 text-foreground/58">{copy}</p>
                  </div>
                </GlowBox>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lamp divider */}
      <LampSection />

      {/* Service Cards */}
      <section className="px-6 pb-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {services.map(({ eyebrow, icon: Icon, title, tagline, description, deliverables, accent }, i) => {
              const isExpanded = isAllExpanded;
              return (
                <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 3} className="h-full">
                  <GlowBox
                    className="group relative flex flex-col h-full rounded-[2rem] border border-foreground/10 bg-foreground/[0.02] cursor-pointer transition-colors hover:bg-foreground/[0.04]"
                    onClick={() => setIsAllExpanded(!isAllExpanded)}
                  >
                    {/* Accent glow */}
                    <div className={`absolute -top-px left-8 right-8 h-px bg-gradient-to-r ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    {/* Always-visible collapsed header */}
                    <div className="flex items-center gap-4 p-6">
                      <div className={`shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-lg`}>
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-foreground/35">{eyebrow}</p>
                        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">{title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 text-foreground/50"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </motion.div>
                    </div>

                    {/* Tagline always visible */}
                    <p className="px-6 pb-4 font-body text-sm font-medium text-accent-300/75 -mt-3">{tagline}</p>

                    {/* Expandable content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1, transition: { height: { type: "spring", stiffness: 400, damping: 35 }, opacity: { duration: 0.15, delay: 0.05 } } }}
                          exit={{ height: 0, opacity: 0, transition: { height: { type: "spring", stiffness: 400, damping: 35 }, opacity: { duration: 0.1 } } }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="h-px bg-foreground/8 mb-5" />
                            <p className="font-body text-sm leading-7 text-foreground/60 mb-6">{description}</p>
                            <p className="mb-3 font-mono text-[0.6rem] font-medium uppercase tracking-[0.28em] text-foreground/35">Deliverables</p>
                            <ul className="space-y-2 mb-6">
                              {deliverables.map((d) => (
                                <li key={d} className="flex items-start gap-2.5 font-body text-sm text-foreground/65">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-300" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                            <Link
                              href="/contact"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.24em] text-accent-300 transition-colors hover:text-foreground"
                            >
                              Start this project
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlowBox>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">How we work</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.04em] text-foreground">
              Our process, plain English.
            </h2>
          </div>

          <div className="relative mx-auto mt-24 mb-32 max-w-5xl" ref={processRef}>
            {/* Animated SVG Sinusoidal Timeline */}
            <div className="absolute top-0 bottom-0 left-1/2 hidden w-[140px] -translate-x-1/2 lg:block pointer-events-none z-0">
              <svg 
                className="absolute inset-0 h-full w-full overflow-visible" 
                preserveAspectRatio="none" 
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#581C87" />
                    <stop offset="25%" stopColor="#6B21A8" />
                    <stop offset="50%" stopColor="#7E22CE" />
                    <stop offset="75%" stopColor="#B87B40" />
                    <stop offset="100%" stopColor="#E5A84B" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Base ghost line */}
                <path
                  d="M 50 0 Q 150 12.5, 50 25 Q -50 37.5, 50 50 Q 150 62.5, 50 75 Q -50 87.5, 50 100"
                  className="stroke-foreground/[0.06]"
                  strokeWidth="2"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Animated glowing colored line */}
                <motion.path
                  d="M 50 0 Q 150 12.5, 50 25 Q -50 37.5, 50 50 Q 150 62.5, 50 75 Q -50 87.5, 50 100"
                  stroke="url(#line-gradient)"
                  strokeWidth="2.5"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: scrollYProgress }}
                  filter="url(#glow)"
                />
              </svg>
            </div>

            <div className="space-y-32 py-12 relative z-10 hidden lg:block">
              {process.map(({ step, title, copy }, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={step}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="flex w-full items-center justify-between"
                  >
                    {/* Left text column */}
                    <div className={`w-[45%] flex ${isEven ? 'justify-end pr-16' : ''}`}>
                      {isEven && (
                        <div className="max-w-sm text-right">
                          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Step {step}</span>
                          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">{title}</h3>
                          <p className="mt-4 font-body text-[0.95rem] leading-7 text-foreground/50">{copy}</p>
                        </div>
                      )}
                    </div>

                    {/* True Center Anchor Dot */}
                    <div className="relative flex w-[10%] items-center justify-center">
                      <div className={`h-[22px] w-[22px] rounded-full bg-[#0a0a0a] border-[5px] transition-colors duration-500 ${
                        i === 0 ? 'border-[#581C87] shadow-[0_0_20px_rgba(88,28,135,0.4)]' : 
                        i === 1 ? 'border-[#6B21A8] shadow-[0_0_20px_rgba(107,33,168,0.4)]' : 
                        i === 2 ? 'border-[#7E22CE] shadow-[0_0_20px_rgba(126,34,206,0.4)]' : 
                        i === 3 ? 'border-[#B87B40] shadow-[0_0_20px_rgba(184,123,64,0.4)]' : 
                        'border-[#E5A84B] shadow-[0_0_20px_rgba(229,168,75,0.4)]'
                      }`} />
                    </div>

                    {/* Right text column */}
                    <div className={`w-[45%] flex ${!isEven ? 'justify-start pl-16' : ''}`}>
                      {!isEven && (
                        <div className="max-w-sm text-left">
                          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Step {step}</span>
                          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">{title}</h3>
                          <p className="mt-4 font-body text-[0.95rem] leading-7 text-foreground/50">{copy}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile layout — animated glowing vertical line */}
            <div className="relative pt-8 pb-2 z-10 lg:hidden">
              {/* Ghost + animated SVG line for mobile */}
              <div className="absolute top-8 bottom-2 left-[6px] w-[2px] pointer-events-none">
                <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
                  <defs>
                    <linearGradient id="mob-line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%"   stopColor="#581C87" />
                      <stop offset="25%"  stopColor="#6B21A8" />
                      <stop offset="50%"  stopColor="#7E22CE" />
                      <stop offset="75%"  stopColor="#B87B40" />
                      <stop offset="100%" stopColor="#E5A84B" />
                    </linearGradient>
                    <filter id="mob-glow" x="-500%" y="-10%" width="1100%" height="120%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path d="M1 0 L1 100" className="stroke-foreground/[0.08]" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                  <motion.path
                    d="M1 0 L1 100"
                    stroke="url(#mob-line-gradient)"
                    strokeWidth="2.5"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: scrollYProgress }}
                    filter="url(#mob-glow)"
                  />
                </svg>
              </div>

              {process.map(({ step, title, copy }, i) => (
                <motion.div
                  key={step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className="flex items-start gap-5 pl-8 pb-10 last:pb-0"
                >
                  {/* Dot sits inline, overlaid on the SVG line via negative margin */}
                  <div className={`shrink-0 -ml-8 mt-1 h-[14px] w-[14px] rounded-full bg-[#0a0a0a] border-[3px] ${
                    i === 0 ? 'border-[#581C87] shadow-[0_0_12px_rgba(88,28,135,0.5)]' :
                    i === 1 ? 'border-[#6B21A8] shadow-[0_0_12px_rgba(107,33,168,0.5)]' :
                    i === 2 ? 'border-[#7E22CE] shadow-[0_0_12px_rgba(126,34,206,0.5)]' :
                    i === 3 ? 'border-[#B87B40] shadow-[0_0_12px_rgba(184,123,64,0.5)]' :
                    'border-[#E5A84B] shadow-[0_0_12px_rgba(229,168,75,0.5)]'
                  }`} />
                  <div>
                    <span className={`font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] ${
                      i === 0 ? 'text-[#581C87]' :
                      i === 1 ? 'text-[#6B21A8]' :
                      i === 2 ? 'text-[#7E22CE]' :
                      i === 3 ? 'text-[#B87B40]' :
                      'text-[#E5A84B]'
                    }`}>Step {step}</span>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">{title}</h3>
                    <p className="mt-3 font-body text-sm leading-6 text-foreground/50">{copy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 pt-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <GlowBox className="relative overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_60%)] p-12 text-center lg:p-20">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent" />
            <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold tracking-[-0.04em] text-foreground">
              Ready for True Digital Transformation?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-foreground/62">
              Stop coordinating between disconnected vendors. Partner with a tech agency that brings world-class mobile app development and intelligent AI solutions under one roof.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.2em] text-background transition hover:bg-slate-100"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-3 rounded-full border border-foreground/15 px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.2em] text-foreground/80 transition hover:border-foreground/30 hover:text-foreground"
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
