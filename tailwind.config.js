/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'btn-bg-dark': "#25262b",
        'btn-bg-blue': "#0f172a",
        'btn-border-dark': "#373a40",
        'btn-border-blue': "#334155",
        'header-dark': '#1a1b1e',
        'body-dark': '#141517',
        'body-blue': '#1e293c',
        'connect4-blue-bg': '#1e293c',
        'connect4-black-bg': '#1a1b1e'
      },
      backgroundImage: {
        'game-logo': "url('./assets/bg_001.png')",
      },
      width: {
        'c-34': '34px',
      },
      height: {
        'c-34': '34px',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
