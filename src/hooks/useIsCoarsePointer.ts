import { useEffect, useState } from "react";

export function useIsCoarsePointer() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: coarse), (hover: none)");
    const update = () => {
      setIsCoarsePointer(mediaQuery.matches || window.innerWidth < 768);
    };

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      window.addEventListener("resize", update);

      return () => {
        mediaQuery.removeEventListener("change", update);
        window.removeEventListener("resize", update);
      };
    }

    mediaQuery.addListener(update);
    window.addEventListener("resize", update);

    return () => {
      mediaQuery.removeListener(update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isCoarsePointer;
}
