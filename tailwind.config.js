/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    container: {
      center:true,
      screens: {
        lg:'1140px',
        xl:'1140px',
        '2xl':'1140px',
      }
    },

    extend: {

      fontFamily: {
        mulish: ['Mulish', "sans-serif"],
      },

      colors: {
        'weather-blue': '#d4ebf2',
        'weather-grey': '#808080',
        'weather-black': '#171717',
      },
    },
  },
  plugins: [],
}
