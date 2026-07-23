/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        ink: {
          950: "#0a0f1a",
          900: "#0f1626",
          800: "#1a2335",
          700: "#283449",
          600: "#3a4866",
          500: "#5b6b8a",
          400: "#8896b0",
          300: "#b8c4d8",
          200: "#dde4ef",
          100: "#f0f4fa",
          50: "#f8fbff",
        },
        accent: {
          600: "#1d8cf8",
          500: "#2da4ff",
          400: "#5cc0ff",
          300: "#8ad4ff",
        },
        success: {
          500: "#22c55e",
          400: "#4ade80",
        },
        warning: {
          500: "#f59e0b",
          400: "#fbbf24",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
