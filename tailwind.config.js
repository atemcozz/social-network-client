/** @type {import('tailwindcss').Config} */

const {fontFamily} = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: [
        '"Rubik"',
        "sans-serif",
        ...fontFamily.sans,
      ],
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-darker": "var(--primary-darker)",
        "primary-disabled": "var(--primary-disabled)",
        secondary: "var(--secondary)",
        "secondary-darker": "var(--secondary-darker)",
        danger: "var(--danger)",
        "danger-darker": "var(--danger-darker)",
        success: "var(--success)",
        "success-darker": "var(--success-darker)",
        back: "var(--background)",
        "back-darker": "var(--background-darker)",
        "back-darkest": "var(--background-darkest)",
        "back-lighter": "var(--background-lighter)",
        "text-base": "var(--text-base)",
        "text-secondary": "var(--text-secondary)",
        like: "var(--like)",
      },
    },
  },
  plugins: [],
};
