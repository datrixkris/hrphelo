import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "hr-yellow": "#ff980d",
        "hr-yellow-light": "#feb210",
        "hr-yellow-dark": "#fe7207",
        "hr-dark": "#03294e",
      },
    },
  },
  plugins: [require("daisyui")],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light",
      "dark",
      "retro",
      "black",
      "lofi",
      "coffee",
      "lemonade",
      "luxury",
      "valentine",
      "synthwave",],

  },

  // darkMode: ['class', '[data-theme="black"]']
};
export default config;
