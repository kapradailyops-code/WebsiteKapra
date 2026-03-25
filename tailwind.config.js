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
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        border: {
          light: "var(--border-light)"
        },
        brand: {
          50: "#ffffff",
          100: "#f3f3f3",
          700: "#232323",
          800: "#1A1A1A",
          900: "#111111",
          950: "#0A0A0A"
        },
        accent: {
          300: "rgb(var(--accent-300) / <alpha-value>)",
          400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "rgb(var(--accent-500) / <alpha-value>)",
          600: "rgb(var(--accent-600) / <alpha-value>)",
          700: "rgb(var(--accent-700) / <alpha-value>)"
        },
        mist: {
          100: "#F5F9FF",
          200: "#DCE9F6",
          400: "#94A3B8"
        }
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "system-ui", "-apple-system", "sans-serif"],
        body: ["Bricolage Grotesque", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Space Mono", "JetBrains Mono", "Consolas", "monospace"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(229, 168, 75, 0.22)",
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
