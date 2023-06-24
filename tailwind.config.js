/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['winter'],
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
};
