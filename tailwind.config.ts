import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0c",
        paper: "#f4f1ea",
        blade: "#1b57ff",
        blaze: "#ff2d2d",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        jp: ["var(--font-jp)", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
