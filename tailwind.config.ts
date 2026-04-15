import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: {
          DEFAULT: "#0f0f0f",
          soft: "#1a1a1a",
        },
        parchment: "#f7f4ef",
        ember: "#c8553d",
      },
    },
  },
  plugins: [],
};

export default config;
