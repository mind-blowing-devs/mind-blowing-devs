/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        press: ['"Press Start 2P"', 'cursive'],
        roboto: ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        "body-color": "var(--body-color)",
        "font-color": "var(--font-color)",
      }
    },
  },
  plugins: [],
}
