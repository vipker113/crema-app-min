/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#99e6ff",
          light: "#e5ffff",
          dark: "#0099cc",
        },
        secondary: "#165b76",
        accent: "#EF4444",
        background: "#EAE2DF",
        text: "#111827",
        neutral: "#c4c7ca",
      },
    },
  },
  plugins: [],
};
