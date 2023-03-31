/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
colors.primary = "#056608"
colors.soft = "#ACD1AF"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: colors,
    extend: {
    },
    container: {
      padding: "2rem",
      // margin: "2rem"
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
