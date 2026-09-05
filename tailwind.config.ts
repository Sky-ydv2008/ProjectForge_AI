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
        background: "#0b0f19",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "#111726",
          border: "#1e293b",
          hover: "#161e30",
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
        "card": "0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 8px 0 rgba(0, 0, 0, 0.3)",
        "glow-subtle": "0 0 20px -3px rgba(56, 189, 248, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
