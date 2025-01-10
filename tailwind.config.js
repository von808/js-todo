/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    screens: {
      lg: { max: '991px' },
      xs: { max: '420px' },
    },
    extend: {
      colors: {
        green: '#3E8658',
        red: '#CA434A',
      },
    },
  },
  plugins: [],
};
