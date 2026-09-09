/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "Times",
          "serif",
        ],
      },
      colors: {
        google: {
          blue: "#4285F4",
          red: "#EA4335",
          yellow: "#FBBC05",
          green: "#34A853",
          gray: {
            50: "#f8f9fa",
            100: "#f1f3f4",
            200: "#e8eaed",
            300: "#dadce0",
            400: "#bdc1c6",
            500: "#9aa0a6",
            600: "#70757a",
            700: "#5f6368",
            800: "#3c4043",
            900: "#202124",
          },
        },
      },
      boxShadow: {
        'search': '0 1px 6px rgba(32, 33, 36, 0.28)',
        'search-hover': '0 2px 8px rgba(32, 33, 36, 0.28)',
        'card': '0 1px 3px rgba(60, 64, 67, 0.12), 0 1px 2px rgba(60, 64, 67, 0.08)',
        'card-hover': '0 4px 12px rgba(60, 64, 67, 0.15)',
      },
    },
  },
  plugins: [],
}
