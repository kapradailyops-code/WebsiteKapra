import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Globe2, Smartphone, Sparkles, X } from "lucide-react";
import { GlowBox } from "./GlowBox";
import { GlowingEffect } from "./GlowingEffect";
import { cn } from "../lib/utils";

const capabilityChips = ["Launch sites", "Mobile products", "AI workflows"];

const experienceTracks = [
  {
    icon: Globe2,
    title: "Web systems",
    description:
      "Flagship sites, launch campaigns, and product surfaces with the polish of a premium brand."
  },
  {
    icon: Smartphone,
    title: "Mobile products",
    description:
      "Touch-first experiences shaped to feel fast, clear, and consistent from first session onward."
  },
  {
    icon: Sparkles,
    title: "AI workflows",
    description:
      "Applied AI that reduces noise, speeds decisions, and turns operations into leverage."
  }
];

const scopeOptions = [
  "Launch site",
  "Marketing website",
  "Mobile app",
  "AI workflow",
  "Mixed project"
];

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-accent-300/40 focus:bg-white/[0.08] focus:ring-2 focus:ring-accent-400/20";

const modalSurfaceTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1]
} as const;

export function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formStep, setFormStep] = useState<"idle" | "submitting" | "success">("idle");
  const [selectedScope, setSelectedScope] = useState(scopeOptions[0]);
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const scopeFieldRef = useRef<HTMLDivElement>(null);
  const scopeListId = useId();

  const handleExpand = () => setIsExpanded(true);

  const handleClose = () => {
    setIsScopeOpen(false);
    setIsExpanded(false);
    window.setTimeout(() => setFormStep("idle"), 350);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStep("submitting");

    window.setTimeout(() => {
      setFormStep("success");
    }, 1400);
  };

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isScopeOpen) {
          setIsScopeOpen(false);
          return;
        }

        handleClose();
      }
    };

    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, isScopeOpen]);

  useEffect(() => {
    if (!isScopeOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!scopeFieldRef.current?.contains(event.target as Node)) {
        setIsScopeOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isScopeOpen]);

  return (
    <>
      <section
        id="top"
        className="relative isolate flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-6 pb-20 pt-16 sm:px-10 lg:px-14"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_18%_28%,rgba(14,165,233,0.12),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(125,211,252,0.08),transparent_18%)]" />
          <motion.div
            animate={{ x: ["-8%", "4%", "-8%"], opacity: [0.24, 0.38, 0.24] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-y-[-10%] left-1/2 w-[52rem] -translate-x-1/2 bg-[linear-gradient(115deg,transparent_0%,rgba(125,211,252,0.12)_22%,rgba(14,165,233,0.04)_42%,transparent_62%)] blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -24, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] top-[18%] h-48 w-48 rounded-full bg-accent-500/10 blur-[120px]"
          />
          <motion.div
            animate={{ y: [0, 18, 0], scale: [1, 0.94, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[8%] top-[20%] h-56 w-56 rounded-full bg-cyan-200/10 blur-[140px]"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.32em] text-white/72 backdrop-blur-xl"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent-400 shadow-[0_0_18px_rgba(56,189,248,0.85)]" />
            Kapra launch studio
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-8 max-w-5xl font-display text-[clamp(3.5rem,8vw,6.75rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white"
          >
            Stage your next
            <br className="hidden sm:block" />
            <span className="gradient-text">web, mobile, or AI product</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 max-w-3xl text-base leading-8 text-white/68 sm:text-lg"
          >
            Kapra builds digital experiences with cinematic restraint, clear systems,
            and launch-ready execution. Bring the ambition. We will shape the surface,
            the story, and the product around it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-5 text-base text-accent-300"
          >
            <span className="font-semibold text-white">for antigravity</span> to decide on their own
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {capabilityChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/62 backdrop-blur-lg"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <AnimatePresence initial={false}>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="relative mt-10 inline-block transform-gpu"
              >
                <motion.div
                  style={{ borderRadius: 9999 }}
                  className="absolute inset-0 overflow-hidden border border-accent-300/25 bg-gradient-to-r from-accent-500 via-sky-500 to-cyan-400 shadow-glow"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.2),transparent_30%,transparent_70%,rgba(255,255,255,0.1))]" />
                </motion.div>

                <motion.button
                  onClick={handleExpand}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="relative inline-flex h-14 items-center gap-3 px-8 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-95"
                >
                  Start your journey
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8"
          >
            <a href="#journey" className="text-sm text-white/48 transition hover:text-white/78">
              Or scroll into the cinematic sequence
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5">
            <motion.button
              type="button"
              aria-label="Close project inquiry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              onClick={handleClose}
              className="absolute inset-0 bg-brand-950/78 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.985, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 10 }}
              transition={modalSurfaceTransition}
              style={{ borderRadius: 32 }}
              className="relative flex h-full w-full max-w-6xl transform-gpu overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] shadow-[0_30px_120px_rgba(2,6,23,0.65)] will-change-transform sm:h-[min(92vh,58rem)] sm:rounded-[2rem]"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.26),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(125,211,252,0.12),transparent_18%),linear-gradient(135deg,rgba(10,10,10,0.22),rgba(10,10,10,0.66))]" />
                <div className="absolute inset-0 bg-grid [background-size:68px_68px] opacity-[0.1]" />
                <motion.div
                  animate={{ rotate: [0, 6, 0], scale: [1, 1.04, 1] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-500/14 blur-[140px]"
                />
                <motion.div
                  animate={{ y: [0, 24, 0], x: [0, -18, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-[-3rem] right-[-2rem] h-80 w-80 rounded-full bg-cyan-200/10 blur-[150px]"
                />
              </div>
              <GlowingEffect
                blur={18}
                borderWidth={2}
                glow
                inactiveZone={0.22}
                movementDuration={0.9}
                proximity={96}
                spread={42}
              />

              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/78 backdrop-blur-xl transition hover:bg-white/[0.1] hover:text-white sm:right-6 sm:top-6"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 grid h-full w-full overflow-y-auto overscroll-contain lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex flex-col justify-between gap-10 p-8 sm:p-10 lg:p-14"
                >
                  <div>
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-accent-300/80">
                      Discovery intake
                    </div>

                    <h2 className="mt-7 max-w-xl font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white">
                      Ready to give the next launch real gravity?
                    </h2>

                    <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
                      Tell us what you are building and where you need momentum. We will
                      help shape the narrative, the interface, and the delivery path
                      around a system that feels premium from day one.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {experienceTracks.map(({ icon: Icon, title, description }) => (
                      <GlowBox
                        key={title}
                        className="glass-panel flex items-start gap-4 p-5 sm:p-6"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{title}</h3>
                          <p className="mt-2 text-sm leading-7 text-white/66">{description}</p>
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
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18 }}
                  transition={{ duration: 0.18, delay: 0.02, ease: "easeOut" }}
                  className="flex items-start justify-center border-t border-white/10 bg-black/20 p-4 sm:p-8 lg:border-l lg:border-t-0 lg:bg-black/10"
                >
                  <GlowBox className="w-full max-w-lg overflow-visible rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.38)] backdrop-blur-2xl sm:p-8">
                    {formStep === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                          <Check className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="mt-6 font-display text-3xl text-white">
                          Inquiry received
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-7 text-white/66">
                          We have your request. The next step is a thoughtful follow-up,
                          not a spam sequence.
                        </p>
                        <button onClick={handleClose} className="button-secondary mt-8">
                          Return to homepage
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-accent-300/80">
                            Project inquiry
                          </p>
                          <h3 className="mt-3 font-display text-2xl text-white">
                            Start a conversation
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-white/62">
                            Share the essentials and we will come back with the most
                            sensible next move.
                          </p>
                        </div>

                        <div className="grid gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/48"
                            >
                              Full name
                            </label>
                            <input
                              required
                              id="name"
                              type="text"
                              placeholder="Jane Doe"
                              className={inputClassName}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/48"
                            >
                              Work email
                            </label>
                            <input
                              required
                              id="email"
                              type="email"
                              placeholder="jane@company.com"
                              className={inputClassName}
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="company"
                                className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/48"
                              >
                                Company
                              </label>
                              <input
                                id="company"
                                type="text"
                                placeholder="Kapra partner"
                                className={inputClassName}
                              />
                            </div>

                            <div ref={scopeFieldRef} className="relative">
                              <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/48">
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
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 shrink-0 text-white/50 transition duration-200",
                                    isScopeOpen && "rotate-180 text-accent-300"
                                  )}
                                />
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
                                      <div
                                        role="listbox"
                                        aria-labelledby="scope-trigger"
                                        className="relative max-h-72 space-y-1 overflow-y-auto"
                                      >
                                        {scopeOptions.map((option) => {
                                          const isSelected = option === selectedScope;

                                          return (
                                            <button
                                              key={option}
                                              type="button"
                                              role="option"
                                              aria-selected={isSelected}
                                              onClick={() => {
                                                setSelectedScope(option);
                                                setIsScopeOpen(false);
                                              }}
                                              className={cn(
                                                "flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left text-base transition",
                                                isSelected
                                                  ? "bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(125,211,252,0.24)]"
                                                  : "text-white/84 hover:bg-white/[0.06] hover:text-white"
                                              )}
                                            >
                                              <span>{option}</span>
                                              {isSelected ? (
                                                <span className="h-2.5 w-2.5 rounded-full bg-accent-300 shadow-[0_0_14px_rgba(125,211,252,0.85)]" />
                                              ) : null}
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
                            <label
                              htmlFor="summary"
                              className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/48"
                            >
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
                          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-75"
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
                          This demo form is front-end only for now. We can wire it to email,
                          CRM, or your own backend next.
                        </p>
                      </form>
                    )}
                  </GlowBox>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
