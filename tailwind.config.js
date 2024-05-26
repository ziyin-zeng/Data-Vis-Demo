/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        downAndUpEaseIn: {
          '0%': {
            transform: 'translateY(0)',
            zIndex : 20,
            color: 'rgb(75 85 99)'
          },
          '50%': {
            transform: 'translateY(10px)',
            zIndex : 20,
            color: 'rgb(156 163 175)'
          },
          '100%': {
            transform: 'translateY(0px)',
            zIndex : 20,
            color: 'rgb(255 255 255)'
          }
        },
        downAndUpEaseOut: {
          '0%': {
            transform: 'translateY(0)',
            zIndex : 10,
            color: 'rgb(229 231 235)'
          },
          '50%': {
            transform: 'translateY(10px)',
            zIndex : 10,
            color: 'rgb(156 163 175)'
          },
          '100%': {
            transform: 'translateY(0px)',
            zIndex : 10,
            color: 'rgb(55 65 81)'
          }
        },
        upAndDownEaseOut: {
          '0%': {
            transform: 'translateY(0)',
            zIndex : 10,
            color: 'rgb(243 244 246)'
          },
          '50%': {
            transform: 'translateY(-10px)',
            zIndex : 10,
            color: 'rgb(209 213 219)'
          },
          '100%': {
            transform: 'translateY(0px)',
            zIndex : 10,
            color: 'rgb(55 65 81)'
          }
        },
        upAndDownEaseIn: {
          '0%': {
            transform: 'translateY(0)',
            zIndex : 20,
            color: 'rgb(107 114 128)'
          },
          '50%': {
            transform: 'translateY(-10px)',
            zIndex : 20,
            color: 'rgb(209 213 219)'
          },
          '100%': {
            transform: 'translateY(0px)',
            zIndex : 20,
            color: 'rgb(255 255 255)'
          }
        },
        
      },
      animation: {
        downAndUpEaseIn: 'downAndUpEaseIn 1s forwards',   // for bottom item, hover to show
        downAndUpEaseOut: 'downAndUpEaseOut 1s forwards', // for bottom item, unhover to hide
        upAndDownEaseOut: 'upAndDownEaseOut 1s forwards', // for top item, hover to hide 
        upAndDownEaseIn: 'upAndDownEaseIn 1s forwards'    // for top item, unhover to show
      }
    }
  },
  plugins: [],
};
