/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: ["Poppins, sant-serif"],
    },
    colors: {
      grisClaro: "#f1f1f1",
      taLightMain: "#a9126b",
      blueDark: "#272c48",
    },
    extend: {},
  },
  plugins: [],
};
