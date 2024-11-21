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
        bgDark: "#09141A",
        "white-40": "rgba(255, 255, 255, 0.4)",
        "white-33": "rgba(255, 255, 255, 0.33)",
        "white-22": "rgba(255, 255, 255, 0.22)",
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-8": "rgba(255, 255, 255, 0.08)",
        "white-6": "rgba(255, 255, 255, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
