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
        blackColor: '#0B161A', 
        darkGrey: '#141E20', 
        accentColor: '#D98341', 
        whiteColor: '#EAEAEA', 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // fontFamily: {
      //   josefin: ['var-(--font-josefin)'],
      //   cursive: ['var-(--font-cursive)'],
      // }
    },
  },
  plugins: [],
};
export default config;
