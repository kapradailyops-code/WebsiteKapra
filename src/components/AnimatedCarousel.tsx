import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface LogoFile {
  name: string;
  src: string;
}

interface AnimatedCarouselProps {
  logos?: LogoFile[];
  speedSeconds?: number;
  className?: string;
  title?: string;
}

const fadeMaskStyle: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
};

export function AnimatedCarousel({
  logos,
  speedSeconds = 16,
  className,
  title = "Technologies We Master"
}: AnimatedCarouselProps) {
  const [folderLogos, setFolderLogos] = useState<LogoFile[]>([]);
  const [hasLoaded, setHasLoaded] = useState(Boolean(logos));

  useEffect(() => {
    if (logos) {
      return;
    }

    let isMounted = true;

    const loadLogos = async () => {
      try {
        const response = await fetch("/api/carousel-logos");
        const payload = (await response.json()) as { logos?: LogoFile[] };

        if (!response.ok) {
          throw new Error("Failed to load carousel logos");
        }

        if (isMounted) {
          setFolderLogos(payload.logos ?? []);
        }
      } catch (error) {
        console.error("Carousel logo fetch error:", error);

        if (isMounted) {
          setFolderLogos([]);
        }
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    };

    void loadLogos();

    return () => {
      isMounted = false;
    };
  }, [logos]);

  const items = logos ?? folderLogos;
  const marqueeItems = items.length > 0 ? [...items, ...items] : [];

  return (
    <section
      className={cn(
        "relative overflow-hidden px-0 pb-16 pt-6 sm:pb-20 sm:pt-10",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[14%] top-8 h-56 w-56 rounded-full bg-white/[0.03] blur-[140px]" />
        <div className="absolute right-[8%] top-24 h-64 w-64 rounded-full bg-accent-400/[0.08] blur-[170px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-950 via-brand-950/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent" />
      </div>

      <div className="relative px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mx-auto max-w-5xl text-center font-display text-[clamp(2.8rem,6vw,5.4rem)] font-medium tracking-[-0.07em] text-white">
            {title}
          </h2>

          <div className="relative mt-12 sm:mt-16">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-brand-950 via-brand-950/75 to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-brand-950 via-brand-950/75 to-transparent sm:w-24" />

            {marqueeItems.length > 0 ? (
              <div className="overflow-hidden" style={fadeMaskStyle}>
                <motion.div
                  aria-label="Client logo carousel"
                  className="flex w-max items-center gap-16 py-2 sm:gap-24 lg:gap-32"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: speedSeconds,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  {marqueeItems.map((logo, index) => (
                    <div
                      key={`${logo.src}-${index}`}
                      aria-hidden={index >= items.length}
                      className="flex min-w-[7rem] items-center justify-center sm:min-w-[9rem]"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-10 w-auto max-w-[11rem] object-contain opacity-95 brightness-0 invert sm:h-12 md:h-14"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            ) : (
              <div className="flex min-h-[4.5rem] items-center justify-center px-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.32em] text-white/32">
                {hasLoaded ? "Add SVG files to public/carousel-logos" : "Loading carousel logos"}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Case1(props: AnimatedCarouselProps) {
  return <AnimatedCarousel {...props} />;
}
