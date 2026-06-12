/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cold-blue': '#0891b2',
        'cold-dark': '#0f172a',
        'cold-light': '#f0f9fa',
      }
    },
  },
  plugins: [],
}
