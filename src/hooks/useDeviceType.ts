"use client";

import { useEffect, useState } from "react";

interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Check media query for coarse pointer (touch devices)
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    
    // Define breakpoints
    const lgQuery = window.matchMedia("(min-width: 1024px)"); // lg breakpoint
    const mdQuery = window.matchMedia("(min-width: 768px)");  // md breakpoint

    const updateDeviceType = () => {
      const hasCoarsePointer = coarsePointerQuery.matches;
      const isLargeScreen = lgQuery.matches;
      const isMediumScreen = mdQuery.matches;

      // Classification logic
      const isDesktop = isLargeScreen && !hasCoarsePointer;
      const isTablet = isMediumScreen && !isLargeScreen && hasCoarsePointer;
      const isMobile = (!isMediumScreen && hasCoarsePointer) || (hasCoarsePointer && !isDesktop && !isTablet);

      setDeviceType({
        isMobile,
        isTablet,
        isDesktop,
      });
    };

    // Initial check
    updateDeviceType();

    // Listen for media query changes
    coarsePointerQuery.addEventListener("change", updateDeviceType);
    lgQuery.addEventListener("change", updateDeviceType);
    mdQuery.addEventListener("change", updateDeviceType);

    return () => {
      coarsePointerQuery.removeEventListener("change", updateDeviceType);
      lgQuery.removeEventListener("change", updateDeviceType);
      mdQuery.removeEventListener("change", updateDeviceType);
    };
  }, []);

  return deviceType;
}
