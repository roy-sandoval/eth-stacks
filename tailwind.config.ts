import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        beni: ["BeniRegular", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
