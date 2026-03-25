import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Globe2, Smartphone, Sparkles, X } from "lucide-react";
import { GlowBox } from "./GlowBox";
import { buildInquiryPayload, inquiryScopeOptions, submitInquiry } from "../lib/inquiry";
import { cn } from "../lib/utils";
import { useDeviceType } from "../hooks/useDeviceType";

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

const scopeOptions = inquiryScopeOptions;

const inputClassName =
  "w-full rounded-2xl border border-foreground/10 bg-foreground/[0.05] px-4 py-3 text-sm text-foreground placeholder:text-foreground/35 outline-none transition focus:border-accent-300/40 focus:bg-foreground/[0.08] focus:ring-2 focus:ring-accent-400/20";

const modalSurfaceTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1]
} as const;

export function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formStep, setFormStep] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedScope, setSelectedScope] = useState<(typeof scopeOptions)[number]>(
    scopeOptions[0]
  );
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const scopeFieldRef = useRef<HTMLDivElement>(null);
  const scopeListId = useId();
  const { isMobile } = useDeviceType();

  const handleExpand = () => {
    setErrorMessage(null);
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsScopeOpen(false);
    setErrorMessage(null);
    setSelectedScope(scopeOptions[0]);
    setIsExpanded(false);
    window.setTimeout(() => setFormStep("idle"), 350);
  };

  const submitToHubSpot = async (payload: ReturnType<typeof buildInquiryPayload>) => {
    const PORTAL_ID = "245587399";
    const FORM_GUID = "4277031c-099a-4f9a-8cbe-267ed8f0327d";

    const firstname = payload.name.split(" ")[0] || "";
    const lastname = payload.name.split(" ").slice(1).join(" ");

    const hubspotPayload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "email", value: payload.email },
        { name: "company", value: payload.company },
        { name: "scope", value: payload.scope },
        { name: "what_are_you_building", value: payload.summary },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubspotPayload),
      }
    );

    if (response.ok) {
      console.log("Submitted to HubSpot successfully!");
    } else {
      const error = await response.json().catch(() => ({}));
      console.error("HubSpot error:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsScopeOpen(false);
    setFormStep("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const payload = buildInquiryPayload(form, selectedScope);

    try {
      await submitToHubSpot(payload);
      form.reset();
      setSelectedScope(scopeOptions[0]);
      setFormStep("success");
    } catch (error) {
      setFormStep("idle");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your inquiry right now. Please try again shortly."
      );
    }
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
        className="relative isolate flex min-h-[75vh] items-center overflow-hidden px-6 pb-16 pt-36 sm:pt-40 lg:pt-44 sm:px-10 lg:px-14"
      >
        {/* Pure black background — no decorative tints */}
        <div className="pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">

          {/* ── LEFT: Glassmorphism card ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-[2.5rem] border border-foreground/10 bg-foreground/[0.06] p-7 backdrop-blur-3xl sm:p-8 lg:p-10 relative z-10 shadow-[0_32px_120px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]"
          >

            <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1] tracking-[-0.04em] text-foreground">
              Web. Mobile. AI.{" "}
              <span className="gradient-text leading-[1]"><br />We Build It All.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg sm:leading-relaxed relative z-20">
              Kapra Web AI is your end-to-end technology partner — delivering custom web development, mobile apps, and intelligent AI solutions that help businesses of all sizes grow faster and smarter.
            </p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
              className="mt-8 flex flex-wrap gap-2.5 relative z-20"
            >
              {capabilityChips.map((chip) => (
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
                  }}
                  key={chip}
                  className="rounded-full border border-accent-400/20 bg-accent-400/10 px-4 py-2 text-[0.7rem] uppercase tracking-wider sm:text-xs font-semibold text-foreground/80 shadow-[0_4px_24px_rgb(var(--accent-400)/0.12)] backdrop-blur-xl"
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 4 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative mt-5 inline-block transform-gpu"
                >
                  <button
                    onClick={handleExpand}
                    className="bg-zinc-100 text-zinc-900 border border-foreground/20 relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 flex items-center group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 font-bold uppercase tracking-widest text-[0.7rem] transition-all duration-500">
                      Contact Us
                    </span>
                    <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Interactive 3D Spline Engine ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            className="spline-wrapper absolute inset-x-0 -top-[5%] flex lg:relative items-center justify-center h-[55vh] w-[140%] -left-[20%] pointer-events-none lg:pointer-events-auto z-0 lg:z-50 lg:w-[120%] lg:h-[500px] lg:-mr-20 lg:left-auto lg:top-auto opacity-50 lg:opacity-100 mix-blend-screen [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_15%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)]"
          >
            {!isMobile && (
              <Spline
                className="w-full h-full mix-blend-screen"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
              />
            )}

            {/* Mobile-only backglow for extra depth behind the splines, removed to eliminate golden aura */}

            {/* Ambient backglow for the Spline model (desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-accent-400/10 blur-[100px] pointer-events-none -z-10" />

            {/* Cover the "Built with Spline" badge — full-width bottom strip */}
            <div className="absolute bottom-0 left-0 right-0 h-[20%] lg:h-14 bg-gradient-to-t from-black to-transparent lg:bg-black pointer-events-none z-10" />
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
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.985, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 10 }}
              transition={modalSurfaceTransition}
              style={{ borderRadius: 32 }}
              className="relative flex h-full w-full max-w-6xl transform-gpu overflow-hidden border border-foreground/10 bg-surface shadow-[0_30px_120px_rgba(2,6,23,0.65)] will-change-transform sm:h-[min(92vh,58rem)] sm:rounded-[2rem]"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(var(--accent-500)/0.26),transparent_26%),radial-gradient(circle_at_84%_18%,rgb(var(--accent-400)/0.12),transparent_18%),linear-gradient(135deg,rgba(10,10,10,0.22),rgba(10,10,10,0.66))]" />
                <div className="absolute inset-0 bg-grid [background-size:68px_68px] opacity-[0.1]" />
                <div
                  className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent-500/14 blur-[140px]"
                />
                <div
                  className="absolute bottom-[-3rem] right-[-2rem] h-80 w-80 rounded-full bg-accent-400/10 blur-[150px]"
                />
              </div>


              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.06] text-foreground/78 backdrop-blur-xl transition hover:bg-foreground/[0.1] hover:text-foreground sm:right-6 sm:top-6"
              >
                <X className="h-5 w-5" />
              </button>

              <div data-lenis-prevent="true" className="relative z-10 grid h-full w-full overflow-y-auto overscroll-contain lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="order-last lg:order-first flex flex-col justify-between gap-10 p-8 sm:p-10 lg:p-14"
                >
                  <div>
                    <div className="inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/[0.05] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-accent-300/80">
                      Discovery intake
                    </div>

                    <h2 className="mt-7 max-w-xl font-display text-[clamp(2rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-foreground">
                      Ready to give the next launch real gravity?
                    </h2>

                    <p className="mt-6 max-w-xl text-base leading-8 text-foreground/70">
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
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.06] text-accent-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                          <p className="mt-2 text-sm leading-7 text-foreground/66">{description}</p>
                        </div>
                      </GlowBox>
                    ))}
                  </div>

                  <GlowBox className="rounded-[1.75rem] border border-foreground/10 bg-background/20 p-6 backdrop-blur-xl">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-foreground/45">
                      What happens next
                    </p>
                    <div className="mt-4 grid gap-3 text-sm text-foreground/68 sm:grid-cols-3">
                      <GlowBox className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
                        01. We review the brief, goals, and product surface.
                      </GlowBox>
                      <GlowBox className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
                        02. We map a visual and technical direction.
                      </GlowBox>
                      <GlowBox className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
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
                  className="order-first lg:order-last flex items-start justify-center border-t border-foreground/10 bg-background/20 p-4 sm:p-8 lg:border-l lg:border-t-0 lg:bg-background/10"
                >
                  <GlowBox className="w-full max-w-lg overflow-visible rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.06] p-6 shadow-[0_20px_80px_rgba(2,6,23,0.38)] backdrop-blur-md sm:p-8">
                    {formStep === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                          <Check className="h-10 w-10 text-foreground" />
                        </div>
                        <h3 className="mt-6 font-display text-3xl text-foreground">
                          Inquiry received
                        </h3>
                        <p className="mt-3 max-w-sm text-sm leading-7 text-foreground/66">
                          We have your request. The next step is a thoughtful follow-up,
                          not a spam sequence.
                        </p>
                        <button onClick={handleClose} className="button-secondary mt-8">
                          Return to homepage
                        </button>
                      </motion.div>
                    ) : (
                      <form data-form-source="hero-modal" onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-accent-300/80">
                            Project inquiry
                          </p>
                          <h3 className="mt-3 font-display text-2xl text-foreground">
                            Start a conversation
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-foreground/62">
                            Share the essentials and we will come back with the most
                            sensible next move.
                          </p>
                        </div>

                        <div className="grid gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-foreground/48"
                            >
                              Full name
                            </label>
                            <input
                              required
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Jane Doe"
                              className={inputClassName}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-foreground/48"
                            >
                              Work email
                            </label>
                            <input
                              required
                              id="email"
                              name="email"
                              type="email"
                              placeholder="jane@company.com"
                              className={inputClassName}
                            />
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="company"
                                className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-foreground/48"
                              >
                                Company
                              </label>
                              <input
                                id="company"
                                name="company"
                                type="text"
                                placeholder="Kapra partner"
                                className={inputClassName}
                              />
                            </div>

                            <div ref={scopeFieldRef} className="relative">
                              <label className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-foreground/48">
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
                                  "border-accent-300/55 bg-foreground/[0.09] shadow-[0_0_0_1px_rgba(125,211,252,0.12),0_18px_40px_rgba(2,6,23,0.32)]"
                                )}
                              >
                                <span className="truncate text-foreground/88">{selectedScope}</span>
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 shrink-0 text-foreground/50 transition duration-200",
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
                                    <div className="relative isolate overflow-hidden rounded-[1.5rem] border border-foreground/12 bg-surface p-2 shadow-2xl backdrop-blur-3xl">
                                      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-foreground/8" />
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
                                                  ? "bg-foreground/[0.08] text-foreground shadow-[inset_0_0_0_1px_rgb(var(--accent-300)/0.24)]"
                                                  : "text-foreground/84 hover:bg-foreground/[0.06] hover:text-foreground"
                                              )}
                                            >
                                              <span>{option}</span>
                                              {isSelected ? (
                                                <span className="h-2.5 w-2.5 rounded-full bg-accent-300 shadow-[0_0_14px_rgb(var(--accent-300)/0.85)]" />
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
                              className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-foreground/48"
                            >
                              What are you building?
                            </label>
                            <textarea
                              id="summary"
                              name="summary"
                              rows={4}
                              placeholder="A new launch, a redesign, a mobile product, an AI workflow, or a hybrid of all three."
                              className={`${inputClassName} resize-none`}
                            />
                          </div>
                        </div>

                        <button
                          disabled={formStep === "submitting"}
                          type="submit"
                          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-75"
                        >
                          {formStep === "submitting" ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/20 border-t-brand-950" />
                              Sending request
                            </>
                          ) : (
                            <>
                              Submit inquiry
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>

                        {errorMessage ? (
                          <p
                            role="alert"
                            className="rounded-2xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-100"
                          >
                            {errorMessage}
                          </p>
                        ) : null}


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
