/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" // Ensures Tailwind scans Angular files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

