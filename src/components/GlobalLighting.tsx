import { useDeviceType } from "../hooks/useDeviceType";
import { cn } from "../lib/utils";

interface GlobalLightingProps {
  className?: string;
}

export function GlobalLighting({ className }: GlobalLightingProps) {
  const { isMobile, isTablet } = useDeviceType();

  // Reduce blur and intensity on mobile
  const blurClass = isMobile ? "blur-sm" : isTablet ? "blur" : "blur-md";
  const glowOpacity = isMobile ? "opacity-15" : isTablet ? "opacity-20" : "opacity-25";
  const h1Class = isMobile ? "h-[32rem]" : isTablet ? "h-[42rem]" : "h-[42rem]";
  const w1Class = isMobile ? "w-[48rem]" : "w-[96rem]";
  const h2Class = isMobile ? "h-20" : "h-28";
  const w2Class = isMobile ? "w-8" : "w-16";
  const sm_h2 = isMobile ? "sm:h-24" : "sm:h-40";
  const sm_w2 = isMobile ? "sm:w-12" : "sm:w-28";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className={`relative ${h1Class} ${w1Class} max-w-none -translate-y-12 scale-y-[1.2] sm:h-[52rem]`}>
        <div
          style={{
            backgroundImage: isMobile
              ? `conic-gradient(from 70deg at center top, var(--cyan-glow-mobile), transparent 20%, transparent 72%)`
              : `conic-gradient(from 70deg at center top, var(--cyan-glow), transparent 20%, transparent 72%)`
          }}
          className={`absolute right-1/2 top-0 h-64 w-[24rem] origin-right ${glowOpacity} sm:h-72 sm:w-[38rem]`}
        >
          <div className={`absolute bottom-0 left-0 z-20 ${h2Class} w-full [mask-image:linear-gradient(to_top,white,transparent)] ${sm_h2}`} style={{ backgroundColor: 'var(--blur-1)' }} />
          <div className={`absolute bottom-0 left-0 z-20 h-full ${w2Class} [mask-image:linear-gradient(to_right,white,transparent)] ${sm_w2}`} style={{ backgroundColor: 'var(--blur-1)' }} />
        </div>

        <div
          style={{
            backgroundImage: isMobile
              ? `conic-gradient(from 290deg at center top, transparent, transparent, var(--cyan-glow-mobile))`
              : `conic-gradient(from 290deg at center top, transparent, transparent, var(--cyan-glow))`
          }}
          className={`absolute left-1/2 top-0 h-64 w-[24rem] origin-left ${glowOpacity} sm:h-72 sm:w-[38rem]`}
        >
          <div className={`absolute bottom-0 right-0 z-20 h-full ${w2Class} [mask-image:linear-gradient(to_left,white,transparent)] ${sm_w2}`} style={{ backgroundColor: 'var(--blur-1)' }} />
          <div className={`absolute bottom-0 right-0 z-20 ${h2Class} w-full [mask-image:linear-gradient(to_top,white,transparent)] ${sm_h2}`} style={{ backgroundColor: 'var(--blur-1)' }} />
        </div>

        <div className={`absolute left-1/2 top-20 z-20 h-28 w-[18rem] -translate-x-1/2 rounded-full bg-accent-500/${isMobile ? "25" : "35"} ${blurClass} sm:top-24 sm:h-36 sm:w-[28rem]`} />

        <div
          className={`absolute left-1/2 top-10 z-10 h-24 w-40 -translate-x-1/2 rounded-full bg-accent-300/${isMobile ? "25" : "35"} ${blurClass} ${isMobile ? "opacity-30" : "opacity-45"} sm:top-12 sm:h-32`}
        />

        <div
          className={`absolute left-1/2 top-6 z-30 h-px w-64 -translate-x-1/2 bg-accent-300/${isMobile ? "50" : "70"} ${isMobile ? "opacity-40" : "opacity-60"} sm:top-10`}
        />

        <div className={`absolute left-1/2 top-32 h-[28rem] w-[95vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--accent-500)/${isMobile ? "0.08" : "0.12"}),transparent_55%)] ${blurClass} sm:top-40`} />
      </div>
    </div>
  );
}
