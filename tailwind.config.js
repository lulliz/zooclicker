/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "bumblebee", 
      "dracula",
      {
        bumblebee: {
          ...require("daisyui/src/theming/themes")["[data-theme=bumblebee]"],
          "accent": "#ffb76b",
          "accent-focus": "#fea647",
          "error": "#ff5756",
          "neutral": "#333c4d",
        },
      },
    ],
    darkTheme: "dracula",
  },
  plugins: [require("daisyui")],
}
