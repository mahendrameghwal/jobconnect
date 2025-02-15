/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  darkMode: 'class',
  theme: {
    extend: {    
      backdropBlur: {
        xs: '2px',
      }, width: {
      '23': '23%',
      '33': '33%',
        '45': '45%',
        '48': '48%',
        '30': '30%',
        '95': '95%',
        '90': '90%',
        '70': '70%',
        '99': '99%',

      }
      , height: {
        '60vh': '60vh',
        '80vh': '80vh',
        '100vh': '100vh',
      },
      translate: {
        '2/3': '66%',
      },
      spacing: {
        '5%': '5%',
        '10%': '10%',
        '12%': '12%',
        '15%': '15%',
        '17%': '17%',
        '20%': '20%',
        '60%': '60%',
      }
      ,colors:{
        'custom-blue': '#3b82f6',
      },
      zIndex: {
        '1':'1',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '110': '110',

      }
    },
    
  },
  plugins: [],
}