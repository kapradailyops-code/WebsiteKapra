import type { AppProps } from "next/app";
import { useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";
import "../styles/speeder.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize theme on app load to prevent FOUC (Flash of Unstyled Content)
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = saved || (prefersDark ? "dark" : "light")
    
    const html = document.documentElement
    
    // Remove any conflicting classes
    html.classList.remove('dark')
    
    if (theme === "light") {
      html.classList.add("light")
      html.style.colorScheme = 'light'
    } else {
      html.classList.remove("light")
      html.style.colorScheme = 'dark'
    }

    // Remove the FOUC prevention class after a short delay to ensure paint has happened
    window.setTimeout(() => {
      html.classList.remove('disable-transitions')
    }, 50)
  }, [])

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
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
