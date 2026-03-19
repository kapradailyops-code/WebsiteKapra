export const DURATIONS = {
  fast: 0.4,
  base: 0.65,
  slow: 0.9,
  crawl: 1.2
} as const;

export const EASE = {
  soft: "power2.out",
  smooth: "power3.out",
  reveal: "expo.out"
} as const;



export const SCROLL_OFFSETS = {
  revealStart: "top 78%",
  revealEnd: "bottom 40%",
  cardStart: "top 76%"
} as const;
