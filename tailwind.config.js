/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-darker": "var(--primary-darker)",
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
        like: "var(--like)",
      },
    },
  },
  plugins: [],
};
