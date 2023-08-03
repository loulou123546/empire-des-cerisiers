/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./ui/**/*.{html,js}"],
  theme: {
    extend: {
      minHeight: {
        '516': '516px',
        '256': '256px',
      },
      maxWidth: {
        '24': '24px',
        '48': '48px',
        '50': '50px',
        '64': '64px',
        '96': '96px',
        '100': '100px',
        '128': '128px',
      }
    },
    
  },
  plugins: [],
}

