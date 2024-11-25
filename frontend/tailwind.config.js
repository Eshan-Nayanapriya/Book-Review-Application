/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryLight: "#FFF9BF",
        primaryDark: "#FDDBBB",
        secondaryLight: "#F0C1E1",
        secondaryDark: "#CB9DF0",
      },
    },
  },
  plugins: [],
};
