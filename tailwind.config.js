/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      customDarkBrown: 'rgb(61,35,35)',
      customDarkBrownHover: 'rgb(51,30,30)' // Optional: slightly lighter or darker shade for hover
    },
    keyframes: {
      'book-open': {
        '0%': { transform: 'rotateY(0deg)' },
        '50%': { transform: 'rotateY(90deg)' },
        '100%': { transform: 'rotateY(0deg)' },
      },
    },
    animation: {
      'book-open': 'book-open 2s ease-in-out infinite',
    },
    colors: {
      customDarkBrown: 'rgb(61,35,35)',
    },
  },
  plugins: [],
};
