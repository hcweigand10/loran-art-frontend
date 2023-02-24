/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
console.log(colors)
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: "#3ab7bf",
      secondary: "#FF5733",
      white: "#ffffff",
      black: "#000000",
      blue: "#4363d8",
      gray: "#a9a9a9",
      darkgray: "#6F7378",
      green: "#3cb44b",
      purple: "#911eb4",
      yellow: "#ffe119",
      red: "bd0909",
    },
    extend: {
    },
    container: {
      padding: "2rem",
      // margin: "2rem"
    }
  },
  plugins: [],
}
