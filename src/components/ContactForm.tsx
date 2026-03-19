"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Globe2, Smartphone, Sparkles } from "lucide-react";
import { GlowBox } from "./GlowBox";
import { cn } from "../lib/utils";

const experienceTracks = [
  {
    icon: Globe2,
    title: "Web systems",
    description:
      "Flagship sites, launch campaigns, and product surfaces with the polish of a premium brand.",
  },
  {
    icon: Smartphone,
    title: "Mobile products",
    description:
      "Touch-first experiences shaped to feel fast, clear, and consistent from first session onward.",
  },
  {
    icon: Sparkles,
    title: "AI workflows",
    description:
      "Applied AI that reduces noise, speeds decisions, and turns operations into leverage.",
  },
];

const scopeOptions = [
  "Launch site",
  "Marketing website",
  "Mobile app",
  "AI workflow",
  "Mixed project",
];

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 font-body text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent-300/40 focus:bg-white/[0.08] focus:ring-2 focus:ring-accent-400/20";

export function ContactForm() {
  const [formStep, setFormStep] = useState<"idle" | "submitting" | "success">("idle");
  const [selectedScope, setSelectedScope] = useState(scopeOptions[0]);
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const scopeFieldRef = useRef<HTMLDivElement>(null);
  const scopeListId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStep("submitting");
    window.setTimeout(() => setFormStep("success"), 1400);
  };

  useEffect(() => {
    if (!isScopeOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (scopeFieldRef.current && !scopeFieldRef.current.contains(event.target as Node)) {
        setIsScopeOpen(false);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isScopeOpen]);

  return (
    <div className="grid min-h-[calc(100vh-5rem)] w-full lg:grid-cols-[1.05fr_0.95fr]">
      {/* Left panel */}
      <div className="flex flex-col justify-between gap-10 p-8 sm:p-10 lg:p-14">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-accent-300/80">
            Discovery intake
          </div>

          <h2 className="mt-7 max-w-xl font-display text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
            Ready to give the next launch real gravity?
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
            Tell us what you are building and where you need momentum. We will help shape
            the narrative, the interface, and the delivery path around a system that feels
            premium from day one.
          </p>
        </div>

        <div className="grid gap-4">
          {experienceTracks.map(({ icon: Icon, title, description }) => (
            <GlowBox key={title} className="glass-panel flex items-start gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 font-body text-sm leading-7 text-white/66">{description}</p>
              </div>
            </GlowBox>
          ))}
        </div>

        <GlowBox className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/45">
            What happens next
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/68 sm:grid-cols-3">
            <GlowBox className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              01. We review the brief, goals, and product surface.
            </GlowBox>
            <GlowBox className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              02. We map a visual and technical direction.
            </GlowBox>
            <GlowBox className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              03. We return with the cleanest route to launch.
            </GlowBox>
          </div>
        </GlowBox>
      </div>

      {/* Right panel — form */}
      <div className="flex items-start justify-center border-t border-white/10 bg-black/20 p-4 sm:p-8 lg:border-l lg:border-t-0 lg:bg-black/10">
        <GlowBox className="w-full max-w-lg overflow-visible rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.38)] backdrop-blur-md sm:p-8">
          {formStep === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[26rem] flex-col items-center justify-center text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 font-display text-3xl text-white">Inquiry received</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-white/66">
                We have your request. The next step is a thoughtful follow-up, not a spam sequence.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-accent-300/80">
                  Project inquiry
                </p>
                <h3 className="mt-3 font-display text-2xl text-white">Start a conversation</h3>
                <p className="mt-2 font-body text-sm leading-7 text-white/62">
                  Share the essentials and we will come back with the most sensible next move.
                </p>
              </div>

              <div className="grid gap-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/48">
                    Full name
                  </label>
                  <input required id="name" type="text" placeholder="Jane Doe" className={inputClassName} />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/48">
                    Work email
                  </label>
                  <input required id="email" type="email" placeholder="jane@company.com" className={inputClassName} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="mb-1.5 block font-mono text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/48">
                      Company
                    </label>
                    <input id="company" type="text" placeholder="Kapra partner" className={inputClassName} />
                  </div>

                  <div ref={scopeFieldRef} className="relative">
                    <label className="mb-1.5 block font-mono text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/48">
                      Scope
                    </label>
                    <input type="hidden" name="scope" value={selectedScope} />
                    <button
                      id="scope-trigger"
                      type="button"
                      aria-haspopup="listbox"
                      aria-controls={scopeListId}
                      aria-expanded={isScopeOpen}
                      onClick={() => setIsScopeOpen((open) => !open)}
                      className={cn(
                        inputClassName,
                        "group flex cursor-pointer items-center justify-between gap-3 pr-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl",
                        isScopeOpen &&
                          "border-accent-300/55 bg-white/[0.09] shadow-[0_0_0_1px_rgba(125,211,252,0.12),0_18px_40px_rgba(2,6,23,0.32)]"
                      )}
                    >
                      <span className="truncate text-white/88">{selectedScope}</span>
                      <ChevronDown className={cn("h-4 w-4 shrink-0 text-white/50 transition duration-200", isScopeOpen && "rotate-180 text-accent-300")} />
                    </button>

                    <AnimatePresence>
                      {isScopeOpen && (
                        <motion.div
                          id={scopeListId}
                          initial={{ opacity: 0, y: -8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-40"
                        >
                          <div className="relative isolate overflow-hidden rounded-[1.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(20,28,38,0.98),rgba(10,10,10,0.96))] p-2 shadow-[0_28px_80px_rgba(2,6,23,0.55)] backdrop-blur-3xl">
                            <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/8" />
                            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent-300/45 to-transparent" />
                            <div role="listbox" aria-labelledby="scope-trigger" className="relative max-h-72 space-y-1 overflow-y-auto">
                              {scopeOptions.map((option) => {
                                const isSelected = option === selectedScope;
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => { setSelectedScope(option); setIsScopeOpen(false); }}
                                    className={cn(
                                      "flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left font-body text-base transition",
                                      isSelected
                                        ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(125,211,252,0.24)]"
                                        : "text-white/84 hover:bg-white/[0.06] hover:text-white"
                                    )}
                                  >
                                    <span>{option}</span>
                                    {isSelected ? <span className="h-2.5 w-2.5 rounded-full bg-accent-300 shadow-[0_0_14px_rgba(125,211,252,0.85)]" /> : null}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label htmlFor="summary" className="mb-1.5 block font-mono text-[0.68rem] font-medium uppercase tracking-[0.24em] text-white/48">
                    What are you building?
                  </label>
                  <textarea
                    id="summary"
                    rows={4}
                    placeholder="A new launch, a redesign, a mobile product, an AI workflow, or a hybrid of all three."
                    className={`${inputClassName} resize-none`}
                  />
                </div>
              </div>

              <button
                disabled={formStep === "submitting"}
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-mono text-sm font-medium uppercase tracking-[0.2em] text-brand-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {formStep === "submitting" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-950/20 border-t-brand-950" />
                    Sending request
                  </>
                ) : (
                  <>
                    Submit inquiry
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-6 text-white/42">
                This demo form is front-end only for now. We can wire it to email, CRM, or your own backend next.
              </p>
            </form>
          )}
        </GlowBox>
      </div>
    </div>
  );
}
