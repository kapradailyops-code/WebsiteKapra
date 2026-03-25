"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Code2, MonitorSmartphone, Sparkles, TrendingUp, ArrowUpRight } from "lucide-react";
import { GlowBox } from "./GlowBox";

interface AboutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const values = [
  {
    icon: Code2,
    title: "Precision Engineering",
    desc: "We write clean, scalable code that withstands growth — no duct-tape solutions.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cross-Platform by Default",
    desc: "Every product we build is designed to work beautifully across web and mobile from day one.",
  },
  {
    icon: Sparkles,
    title: "AI-Native Thinking",
    desc: "We don't bolt AI on as an afterthought. We architect it in from the start.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Oriented Delivery",
    desc: "We ship fast, iterate openly, and optimize for what actually moves your numbers.",
  },
];

export function AboutModal({ isOpen: externalIsOpen, onClose: externalOnClose }: AboutModalProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setInternalIsOpen(true);
    window.addEventListener("openAboutModal", handleOpen);
    return () => window.removeEventListener("openAboutModal", handleOpen);
  }, []);

  const isOpen = externalIsOpen ?? internalIsOpen;
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onClose = () => {
    setInternalIsOpen(false);
    externalOnClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-24"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 sm:right-8 sm:top-8 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.06] text-foreground/60 backdrop-blur-xl transition hover:bg-foreground/[0.12] hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-16 max-w-3xl">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/80">
                About Kapra Web AI
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-foreground">
                Built by builders.{" "}
                <span className="gradient-text">For ambition.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-foreground/70">
                Kapra Web AI is a full-stack technology studio. We design and engineer digital products across web, mobile, and AI — under one roof, with one team, and one clear goal: helping businesses build things that actually work at scale.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/55">
                No hand-offs between vendors. No version-control disasters between freelancers. Just a tightly coordinated team that thinks across disciplines and ships with precision.
              </p>
            </div>

            {/* Mission */}
            <GlowBox className="mb-10 rounded-[2rem] border border-foreground/10 bg-foreground/[0.04] p-8 sm:p-10">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-accent-300/70">
                Our Mission
              </p>
              <blockquote className="mt-4 font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-snug tracking-[-0.02em] text-foreground">
                "To make enterprise-grade technology accessible, fast, and beautifully designed — for every business that has the ambition to grow."
              </blockquote>
            </GlowBox>

            {/* Values */}
            <div className="mb-10">
              <p className="mb-6 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-foreground/40">
                What We Stand For
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {values.map(({ icon: Icon, title, desc }) => (
                  <GlowBox
                    key={title}
                    className="flex gap-5 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-foreground/58">{desc}</p>
                    </div>
                  </GlowBox>
                ))}
              </div>
            </div>

            {/* Services snapshot */}
            <GlowBox className="mb-10 rounded-[2rem] border border-foreground/10 bg-foreground/[0.04] p-8 sm:p-10">
              <p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-foreground/40">
                What We Build
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Web Development", sub: "Next.js · React · CMS · SEO" },
                  { label: "Mobile Apps", sub: "React Native · iOS · Android" },
                  { label: "AI Solutions", sub: "LLMs · RAG · Automation" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
                    <p className="font-semibold text-foreground">{s.label}</p>
                    <p className="mt-1 text-xs text-foreground/45">{s.sub}</p>
                  </div>
                ))}
              </div>
            </GlowBox>

            {/* CTA */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => {
                  onClose();
                  document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-zinc-100 text-zinc-900 border border-foreground/20 relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 flex items-center group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 font-bold uppercase tracking-widest text-[0.7rem]">
                  Start a Project
                </span>
                <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
              </button>
              <p className="text-sm text-foreground/45">
                Projects typically launch in 4–8 weeks.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
