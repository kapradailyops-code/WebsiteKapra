import { useStaggerAnimation } from "../hooks/useAnimation";
import { UniqueAccordion } from "./UniqueAccordion";
import { SpeederAnimation } from "./SpeederAnimation";
import { motion, useReducedMotion } from "framer-motion";
import { useDeviceType } from "../hooks/useDeviceType";

export function ServicesArsenal() {
  const sectionRef = useStaggerAnimation<HTMLDivElement>();
  const { isMobile } = useDeviceType();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !isMobile && !shouldReduceMotion;

  return (
    <section
      id="services"
      className="relative scroll-mt-24 px-6 py-24 sm:scroll-mt-28 sm:px-10 lg:px-14 overflow-hidden"
    >
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
          <div data-stagger className="max-w-2xl lg:max-w-xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">
              Services Arsenal
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-foreground relative z-10 w-full">
              Full-cycle 
              <span className="relative inline-block mx-3">
                <div className="absolute left-1/2 bottom-full -mb-2 -translate-x-1/2 pointer-events-none z-50">
                  <motion.div
                    initial={{ x: "50vw", opacity: 0 }}
                    {...(shouldAnimate && { whileInView: { x: 0, opacity: 1 } })}
                    transition={{ 
                      duration: 1.5, 
                      type: "spring", 
                      bounce: 0.2,
                    }}
                  >
                    <SpeederAnimation />
                  </motion.div>
                </div>
                product
              </span>
              engineering.
            </h2>
            <p className="mt-6 text-lg leading-8 text-foreground/72">
              The site is set up to present Kapra Web AI as a focused studio. 
              We bundle design, development, strategy, and growth into a single premium pipeline.
            </p>
          </div>

          <div data-stagger className="w-full lg:max-w-xl mt-8 lg:mt-0">
            <UniqueAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
