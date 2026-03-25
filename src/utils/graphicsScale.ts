/**
 * Graphics scaling presets for different device types
 * Optimizes performance on mobile while maintaining visual quality on desktop
 */

export interface GraphicsScalePreset {
  dotCount: number;
  markerSize: number;
  lineWidth: number;
  blurValue: number;
  glowIntensity: number;
  animationSpeed: number; // multiplier: 1 = normal, 0.5 = half speed
}

export const GRAPHICS_SCALE = {
  desktop: {
    dotCount: 1200,
    markerSize: 4,
    lineWidth: 1.2,
    blurValue: 2,
    glowIntensity: 1,
    animationSpeed: 1,
  } as GraphicsScalePreset,

  tablet: {
    dotCount: 600,
    markerSize: 3,
    lineWidth: 1,
    blurValue: 1.5,
    glowIntensity: 0.8,
    animationSpeed: 1,
  } as GraphicsScalePreset,

  mobile: {
    dotCount: 300,
    markerSize: 2.5,
    lineWidth: 0.8,
    blurValue: 1,
    glowIntensity: 0.6,
    animationSpeed: 0.8,
  } as GraphicsScalePreset,
} as const;

/**
 * Get the appropriate preset based on device type
 */
export function getGraphicsPreset(
  isMobile: boolean,
  isTablet: boolean
): GraphicsScalePreset {
  if (isMobile) return GRAPHICS_SCALE.mobile;
  if (isTablet) return GRAPHICS_SCALE.tablet;
  return GRAPHICS_SCALE.desktop;
}

/**
 * Calculate blur utility class for Tailwind based on preset
 */
export function getBlurClass(preset: GraphicsScalePreset): string {
  if (preset.blurValue <= 1) return "blur-sm";
  if (preset.blurValue === 1.5) return "blur";
  if (preset.blurValue === 2) return "blur-md";
  return "blur-lg";
}
