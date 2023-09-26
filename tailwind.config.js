/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        body: "rgba(0, 10, 23,40)",
        "card-background": "#000a17",
        "card-border": "#8c3b35",
        "categoriesBtn-bg": "#000a17",
        money: "#3e9c35",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif", // Adds a new `font-display` class
      },
    },
  },
  darkMode: "class",
  plugins: [
    import("tw-elements-react/dist/plugin.cjs"),
    import("tw-elements/dist/plugin.cjs"),
  ],
};
