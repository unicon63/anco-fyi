import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F1B47",
        accent: "#09144C",
        "accent-ink": "#F7F1E2",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
      boxShadow: {
        surface: "0 1px 2px rgba(15,27,71,0.05), 0 8px 20px rgba(15,27,71,0.10)",
        "surface-focus": "0 0 0 1px #09144C, 0 8px 22px rgba(15,27,71,0.14)",
        "surface-selected": "0 0 0 1px #09144C, 0 1px 2px rgba(15,27,71,0.05), 0 10px 22px rgba(15,27,71,0.14)",
        btn: "0 2px 6px rgba(15,27,71,0.18), 0 18px 36px rgba(15,27,71,0.22)",
        "btn-disabled": "0 1px 2px rgba(15,27,71,0.08)",
        summary: "0 1px 2px rgba(15,27,71,0.05), 0 12px 28px rgba(15,27,71,0.12)",
      },
      keyframes: {
        fadeSlide: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide": "fadeSlide 450ms cubic-bezier(0.2,0.8,0.2,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
