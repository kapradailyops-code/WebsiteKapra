import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface GlobalLightingProps {
  className?: string;
}

export function GlobalLighting({ className }: GlobalLightingProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="relative h-[42rem] w-[96rem] max-w-none -translate-y-12 scale-y-[1.2] sm:h-[52rem]">
        <div
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, rgba(34,211,238,0.5), transparent 20%, transparent 72%)"
          }}
          className="absolute right-1/2 top-0 h-64 w-[24rem] origin-right opacity-25 sm:h-72 sm:w-[38rem]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-28 w-full bg-brand-950 [mask-image:linear-gradient(to_top,white,transparent)] sm:h-40" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-16 bg-brand-950 [mask-image:linear-gradient(to_right,white,transparent)] sm:w-28" />
        </div>

        <div
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, rgba(34,211,238,0.5))"
          }}
          className="absolute left-1/2 top-0 h-64 w-[24rem] origin-left opacity-25 sm:h-72 sm:w-[38rem]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-16 bg-brand-950 [mask-image:linear-gradient(to_left,white,transparent)] sm:w-28" />
          <div className="absolute bottom-0 right-0 z-20 h-28 w-full bg-brand-950 [mask-image:linear-gradient(to_top,white,transparent)] sm:h-40" />
        </div>

        <div className="absolute left-1/2 top-24 h-40 w-full -translate-x-1/2 bg-brand-950 blur-2xl sm:top-32 sm:h-52" />
        <div className="absolute left-1/2 top-20 z-20 h-36 w-full -translate-x-1/2 bg-transparent opacity-10 backdrop-blur-md sm:top-24 sm:h-48" />
        <div className="absolute left-1/2 top-20 z-20 h-28 w-[18rem] -translate-x-1/2 rounded-full bg-cyan-500/35 blur-3xl sm:top-24 sm:h-36 sm:w-[28rem]" />

        <div
          className="absolute left-1/2 top-10 z-10 h-24 w-40 -translate-x-1/2 rounded-full bg-cyan-300/35 blur-2xl opacity-45 sm:top-12 sm:h-32"
        />

        <div
          className="absolute left-1/2 top-6 z-30 h-px w-64 -translate-x-1/2 bg-cyan-300/70 opacity-60 sm:top-10"
        />

        <div className="absolute left-1/2 top-32 h-[28rem] w-[95vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_55%)] blur-3xl sm:top-40" />
      </div>
    </div>
  );
}
