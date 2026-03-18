import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { useIsCoarsePointer } from "../hooks/useIsCoarsePointer";

const GhostCursor = dynamic(
  () => import("./GhostCursor").then((module) => module.GhostCursor),
  { ssr: false }
);

export function PostSequenceStage({ children }: PropsWithChildren) {
  const isCoarsePointer = useIsCoarsePointer();

  return (
    <div className="relative isolate overflow-hidden bg-brand-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.1),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(125,211,252,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%)]" />
      {!isCoarsePointer ? (
        <GhostCursor
          zIndex={0}
          color="#7DD3FC"
          brightness={0.72}
          trailLength={16}
          inertia={0.38}
          grainIntensity={0.015}
          bloomStrength={0.16}
          bloomRadius={0.55}
          bloomThreshold={0.05}
          edgeIntensity={0.03}
          fadeDelayMs={120}
          fadeDurationMs={750}
          maxDevicePixelRatio={0.65}
          className="opacity-35"
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
