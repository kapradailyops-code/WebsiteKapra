import type { PropsWithChildren } from "react";

export function PostSequenceStage({ children }: PropsWithChildren) {
  return (
    <div className="relative isolate overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 18% 18%, var(--accent-glow-1), transparent 28%), radial-gradient(circle at 82% 26%, var(--accent-glow-2), transparent 22%), linear-gradient(180deg, var(--overlay), transparent 18%)" }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
