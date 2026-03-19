import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const frame = window.requestAnimationFrame(() => {
      if (!window.location.hash || window.location.hash === "#top") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      <Component {...pageProps} />
    </ReactLenis>
  );
}
