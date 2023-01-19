/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      "xs": "500px",
      "sm": "600px",
      "md": "768px",
      "lg": "1024px",
    },
  },
  plugins: [],
}
