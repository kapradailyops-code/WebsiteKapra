"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useDeviceType } from "../hooks/useDeviceType";

interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
  enableImageReveal?: boolean;
}

// Gradient backgrounds as fallback for mobile (replaces expensive external images)
const GRADIENT_BACKUPS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
];


export function RevealText({
  text = "STUNNING",
  textColor = "text-foreground",
  overlayColor = "text-accent-400",
  fontSize = "text-[clamp(3rem,7vw,7rem)]",
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  letterImages = GRADIENT_BACKUPS,
  enableImageReveal = true,
}: RevealTextProps) {
  const { isMobile } = useDeviceType();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Use gradient fallbacks
  const activeGradients = GRADIENT_BACKUPS;
  const effectiveLetterImages = letterImages === GRADIENT_BACKUPS ? activeGradients : letterImages;

  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = lastLetterDelay * 1000 + springDuration;
    const timer = setTimeout(() => setShowOverlay(true), totalDelay);
    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  // Lazy load images only when hovering (avoid loading all 7 on page load)
  const handleMouseEnter = (index: number) => {
    if (!isMobile && enableImageReveal) {
      setHoveredIndex(index);
      if (!loadedImages.has(index)) {
        // Preload the image
        const img = new Image();
        img.src = effectiveLetterImages[index % effectiveLetterImages.length];
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(index));
        };
      }
    }
  };

  const shouldShowImage = !isMobile && enableImageReveal && loadedImages.has(hoveredIndex ?? -1);

  return (
    <div className="flex items-center justify-center relative w-full">
      <div className="flex flex-wrap justify-center w-full">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`${fontSize} font-display font-black tracking-tight leading-tight relative overflow-hidden ${!isMobile ? "cursor-pointer" : ""}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 8,
              stiffness: isMobile ? 100 : 200,
              mass: 0.8,
            }}
          >
            {/* Invisible sizer — sets the outer span's width/height */}
            <span className="invisible select-none">{letter}</span>

            {/* Base text layer — absolutely fills the sized container */}
            <motion.span
              className={`absolute inset-0 ${textColor}`}
              animate={{ opacity: hoveredIndex === index && shouldShowImage ? 0 : 1 }}
              transition={{ duration: 0.1 }}
            >
              {letter}
            </motion.span>

            {/* Image/gradient reveal on hover (bg-clip-text requires absolute + no-text-fill from parent) */}
            <motion.span
              className="absolute inset-0 text-transparent bg-clip-text bg-cover bg-no-repeat"
              animate={{
                opacity: hoveredIndex === index && enableImageReveal && !isMobile ? 1 : 0,
                backgroundPosition: hoveredIndex === index ? "10% center" : "0% center",
              }}
              transition={{
                opacity: { duration: 0.1 },
                backgroundPosition: { duration: 3, ease: "easeInOut" },
              }}
              style={{
                backgroundImage: effectiveLetterImages[index % effectiveLetterImages.length],
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {letter}
            </motion.span>

            {/* Sweep overlay */}
            {showOverlay && (
              <motion.span
                className={`absolute inset-0 ${overlayColor} pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
