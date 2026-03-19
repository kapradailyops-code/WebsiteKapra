import type { PropsWithChildren } from "react";

export function PostSequenceStage({ children }: PropsWithChildren) {
  return (
    <div className="relative isolate overflow-hidden bg-brand-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.1),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(125,211,252,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
