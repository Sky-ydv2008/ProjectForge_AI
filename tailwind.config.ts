import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090e",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "#0d111c",
          border: "#1e293b",
          hover: "#131a2b",
        },
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          400: "#38bdf8",
          500: "#0284c7",
          600: "#0369a1",
          accent: "#6366f1",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "subtle": "0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "card": "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px 0 rgba(0, 0, 0, 0.4)",
        "glow-cyan": "0 0 25px -4px rgba(56, 189, 248, 0.15)",
        "glow-indigo": "0 0 25px -4px rgba(99, 102, 241, 0.15)",
        "glow-danger": "0 0 25px -4px rgba(239, 68, 68, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
