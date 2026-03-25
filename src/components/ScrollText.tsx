import { motion } from "framer-motion";
import { DURATIONS, EASE } from "../config/animation";
import { GlowBox } from "./GlowBox";
import { useDeviceType } from "../hooks/useDeviceType";
import { useReducedMotion } from "framer-motion";

type Alignment = "left" | "right";

interface ScrollTextProps {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  align?: Alignment;
}

const itemVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: DURATIONS.crawl,
      ease: EASE.reveal,
    },
  }),
};

const scaleVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: DURATIONS.slow,
      ease: EASE.smooth,
    },
  },
};

export function ScrollText({
  eyebrow,
  title,
  highlight,
  body,
  align = "left"
}: ScrollTextProps) {
  const { isMobile } = useDeviceType();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !isMobile && !shouldReduceMotion;
  const alignmentClasses =
    align === "right" ? "ml-auto text-left lg:mr-0" : "mr-auto text-left";

  const originStyle =
    align === "right" ? "origin-right" : "origin-left";

  return (
    <article className="flex min-h-screen items-center px-6 sm:px-10 lg:px-14">
      <motion.div 
        className={`w-full max-w-3xl ${alignmentClasses}`}
        initial="hidden"
        {...(shouldAnimate && { whileInView: "visible" })}
        viewport={{ once: true, amount: 0.3 }}
      >
        <GlowBox className="glass-panel p-8 sm:p-10">
          <motion.p
            className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/80"
            variants={itemVariants}
            custom={0}
          >
            {eyebrow}
          </motion.p>

          <motion.div className="mt-6 h-px w-32 overflow-hidden rounded-full bg-foreground/10">
            <motion.span
              className={`block h-full w-full bg-gradient-to-r from-accent-500 via-accent-300 to-foreground/80 ${originStyle}`}
              variants={scaleVariants}
              initial="hidden"
              {...(shouldAnimate && { whileInView: "visible" })}
              viewport={{ once: true, amount: 0.5 }}
            />
          </motion.div>

          <motion.h2
            className="mt-8 font-display text-[clamp(2.7rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-foreground"
            variants={itemVariants}
            custom={1}
          >
            {title}
            <span className="gradient-text block">{highlight}</span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-foreground/72"
            variants={itemVariants}
            custom={2}
          >
            {body}
          </motion.p>
        </GlowBox>
      </motion.div>
    </article>
  );
}
