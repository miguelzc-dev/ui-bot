/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF9754",
          100: "#FFF1E8",
          200: "#FFE0D1",
          300: "#FFCDB9",
          400: "#FFBAA2",
          500: "#FF9754",
          600: "#FF7B2E",
          700: "#FF5E08",
          800: "#DB4700",
        },
        secondary: "#2E2E2E",
        accent: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
