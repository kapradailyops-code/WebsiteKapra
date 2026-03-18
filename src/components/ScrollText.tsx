import gsap from "gsap";
import { EASE, DURATIONS, SCROLL_OFFSETS } from "../config/animation";
import { useScrollAnimation } from "../hooks/useAnimation";
import { GlowBox } from "./GlowBox";

type Alignment = "left" | "right";

interface ScrollTextProps {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  align?: Alignment;
}

export function ScrollText({
  eyebrow,
  title,
  highlight,
  body,
  align = "left"
}: ScrollTextProps) {
  const scopeRef = useScrollAnimation<HTMLDivElement>(
    (element) => {
      const context = gsap.context(() => {
        const revealItems = Array.from(
          element.querySelectorAll<HTMLElement>("[data-reveal-item]")
        );
        const accentBar = element.querySelector<HTMLElement>("[data-accent-bar]");

        gsap.fromTo(
          revealItems,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATIONS.crawl,
            ease: EASE.reveal,
            stagger: 0.12,
            scrollTrigger: {
              trigger: element,
              start: SCROLL_OFFSETS.revealStart,
              end: SCROLL_OFFSETS.revealEnd,
              toggleActions: "play none none reverse"
            }
          }
        );

        if (accentBar) {
          gsap.fromTo(
            accentBar,
            {
              scaleX: 0,
              transformOrigin: align === "right" ? "100% 50%" : "0% 50%"
            },
            {
              scaleX: 1,
              duration: DURATIONS.slow,
              ease: EASE.smooth,
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                end: "top 45%",
                scrub: true
              }
            }
          );
        }
      }, element);

      return context;
    },
    [align]
  );

  const alignmentClasses =
    align === "right" ? "ml-auto text-left lg:mr-0" : "mr-auto text-left";

  return (
    <article className="flex min-h-screen items-center px-6 sm:px-10 lg:px-14">
      <div ref={scopeRef} className={`w-full max-w-3xl ${alignmentClasses}`}>
        <GlowBox className="glass-panel p-8 sm:p-10">
          <p
            data-reveal-item
            className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/80"
          >
            {eyebrow}
          </p>

          <div className="mt-6 h-px w-32 overflow-hidden rounded-full bg-white/10">
            <span
              data-accent-bar
              className="block h-full w-full bg-gradient-to-r from-accent-500 via-accent-300 to-white/80"
            />
          </div>

          <h2
            data-reveal-item
            className="mt-8 font-display text-[clamp(2.7rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
          >
            {title}
            <span className="gradient-text block">{highlight}</span>
          </h2>

          <p
            data-reveal-item
            className="mt-6 max-w-2xl text-lg leading-8 text-white/72"
          >
            {body}
          </p>
        </GlowBox>
      </div>
    </article>
  );
}
