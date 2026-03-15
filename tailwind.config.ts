import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        zion: {
          gold: "#d4af37",
          black: "#050505",
          glass: "rgba(255, 255, 255, 0.03)",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;