/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
       fontFamily: {
        // Añade 'Roboto' a la configuración de fuentes
        sans: ['Roboto', 'sans-serif'],
    },
  },
},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
