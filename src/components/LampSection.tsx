"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";
import { useDeviceType } from "../hooks/useDeviceType";

export function LampSection({ className }: { className?: string }) {
  const { isMobile } = useDeviceType();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !isMobile && !shouldReduceMotion;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start overflow-hidden w-full py-0",
        className
      )}
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Beam layer — positioned absolutely so it doesn't push content */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
        <div className="relative flex w-full items-start justify-center scale-y-110 translate-y-[-10%]">
          {/* Left conic beam */}
          <motion.div
            initial={{ opacity: 0.5, width: "10rem" }}
            {...(shouldAnimate && { whileInView: { opacity: 1, width: "24rem" } })}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="relative right-0 h-28 w-[24rem] lg:h-48 bg-gradient-conic from-accent-400 via-transparent to-transparent text-foreground [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute w-full left-0 h-20 lg:h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" style={{ backgroundColor: "var(--background)" }} />
            <div className="absolute w-32 h-full left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" style={{ backgroundColor: "var(--background)" }} />
          </motion.div>

          {/* Right conic beam */}
          <motion.div
            initial={{ opacity: 0.5, width: "10rem" }}
            {...(shouldAnimate && { whileInView: { opacity: 1, width: "24rem" } })}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="relative left-0 h-28 w-[24rem] lg:h-48 bg-gradient-conic from-transparent via-transparent to-accent-400 text-foreground [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute w-32 h-full right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" style={{ backgroundColor: "var(--background)" }} />
            <div className="absolute w-full right-0 h-20 lg:h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" style={{ backgroundColor: "var(--background)" }} />
          </motion.div>
        </div>

        {/* Central glow orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 w-[14rem] lg:h-28 lg:w-[20rem] rounded-full bg-accent-400 opacity-25 blur-3xl" />

        {/* Inner bloom */}
        <motion.div
          initial={{ width: "6rem" }}
          {...(shouldAnimate && { whileInView: { width: "12rem" } })}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-14 lg:w-48 lg:h-24 rounded-full bg-accent-300 blur-2xl opacity-50"
        />

        {/* Horizontal line */}
        <motion.div
          initial={{ width: "10rem", opacity: 0 }}
          {...(shouldAnimate && { whileInView: { width: "28rem", opacity: 1 } })}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-accent-300 shadow-[0_0_12px_3px_rgba(125,211,252,0.6)]"
        />
      </div>

      {/* Content — sits on top of beams */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10 pb-8 lg:pt-20 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          {...(shouldAnimate && { whileInView: { opacity: 1, y: 0 } })}
          transition={{ delay: 0.45, duration: 0.7, ease: "easeInOut" }}
        >
          <p className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.45em] text-accent-300/80">
            What we offer
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground">
            Three superpowers.{" "}
            <span className="gradient-text">One studio.</span>
          </h2>
          <p className="mt-6 mx-auto max-w-lg text-base leading-8 text-foreground/55">
            From high-converting web apps to intelligent AI automation, we build digital products that scale. Pick a service or let us architect your entire stack.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
