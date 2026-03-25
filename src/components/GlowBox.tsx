import type { HTMLAttributes } from "react";
import { GlowingEffect, type GlowingEffectProps } from "./GlowingEffect";
import { cn } from "../lib/utils";
import { useDeviceType } from "../hooks/useDeviceType";

interface GlowBoxProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article";
  effectProps?: Partial<GlowingEffectProps>;
}

export function GlowBox({
  as = "div",
  className,
  children,
  effectProps,
  ...props
}: GlowBoxProps) {
  const { isMobile } = useDeviceType();
  const Component = as;

  return (
    <Component className={cn("relative isolate overflow-hidden", className)} {...props}>
      <GlowingEffect
        blur={14}
        borderWidth={2}
        glow
        inactiveZone={0.35}
        movementDuration={0.7}
        proximity={64}
        spread={36}
        disabled={isMobile}
        {...effectProps}
      />
      {children}
    </Component>
  );
}
