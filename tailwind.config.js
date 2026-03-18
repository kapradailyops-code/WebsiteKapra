/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: "#0A0A0A",
          900: "#111111",
          800: "#1A1A1A",
          700: "#232323"
        },
        accent: {
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1"
        },
        mist: {
          100: "#F5F9FF",
          200: "#DCE9F6",
          400: "#94A3B8"
        }
      },
      fontFamily: {
        display: ["Sora", "Space Grotesk", "Avenir Next", "Segoe UI", "sans-serif"],
        body: ["Space Grotesk", "Avenir Next", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(14, 165, 233, 0.18)",
        glass: "0 10px 40px rgba(2, 6, 23, 0.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px)"
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -16px, 0)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" }
        }
      }
    }
  },
  plugins: []
};
