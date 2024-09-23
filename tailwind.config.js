/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens:{
      'xs':'200px',
      'sm':'548px',
      'md':'640px',
      'lg':'768px',
      'xl':'1024px',
      '2xl':'1280px',
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

