import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-in": "slideIn 0.6s ease-out",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "gradient": "gradient 3s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
export default config;

