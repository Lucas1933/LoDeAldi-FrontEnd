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
        body: "#292323",
        "card-background": "#021701",
        "card-border": "#4ade80",
        "categoriesBtn-bg": "#000000",
        money: "#16a34a",
      },
    },
  },
  darkMode: "class",
  plugins: [
    import("tw-elements-react/dist/plugin.cjs"),
    import("tw-elements/dist/plugin.cjs"),
  ],
};
