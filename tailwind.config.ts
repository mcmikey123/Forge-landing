import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f5f1ea",
        "paper-warm": "#ece6da",
        ink: "#14110e",
        ember: "#c5572a",
        ash: "#a39a8c",
        moss: "#3a4634",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [],
};
export default config;
