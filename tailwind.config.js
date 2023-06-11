/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          primary: "#ee2a53",
          DEFAULT: "#ee2a53",
          "primary-focus": "#d11d44",
          "primary-content": "#ffffff",
        },
        forest: {
          ...require("daisyui/src/theming/themes")["[data-theme=forest]"],
          primary: "#ee2a53",
          DEFAULT: "#ee2a53",
          "primary-focus": "#d11d44",
          "primary-content": "#ffffff",
        },
        lemonade: {
          "primary-content": "#ffffff",
        },
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "forest", // name of one of the included themes for dark mode
  },
};
