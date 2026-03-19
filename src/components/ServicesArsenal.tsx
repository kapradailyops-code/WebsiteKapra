import { useStaggerAnimation } from "../hooks/useAnimation";
import { UniqueAccordion } from "./UniqueAccordion";

export function ServicesArsenal() {
  const sectionRef = useStaggerAnimation<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative scroll-mt-24 px-6 py-24 sm:scroll-mt-28 sm:px-10 lg:px-14"
    >
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
          <div data-stagger className="max-w-2xl lg:max-w-xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">
              Services Arsenal
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-white">
              Full-cycle product engineering.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/72">
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
