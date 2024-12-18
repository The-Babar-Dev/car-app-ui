/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "#F3F4F6",
        secondary: "#1C1C1C",
      },
      backgroundColor: {
        primary: "#1C1C1C",
        secondary: "#EAEAEA",
      },
    },
  },
  plugins: [daisyui],
};
