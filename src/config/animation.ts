export const DURATIONS = {
  fast: 0.4,
  base: 0.65,
  slow: 0.9,
  crawl: 1.2
} as const;

export const EASE = {
  soft: [0.25, 0.1, 0.25, 1],      // cubic-bezier equivalent to "power2.out"
  smooth: [0.25, 0.46, 0.45, 0.94], // cubic-bezier equivalent to "power3.out"
  reveal: [0.77, 0, 0.175, 1]       // cubic-bezier equivalent to "expo.out"
} as const;

export const SCROLL_OFFSETS = {
  revealStart: "top 78%",
  revealEnd: "bottom 40%",
  cardStart: "top 76%"
} as const;
