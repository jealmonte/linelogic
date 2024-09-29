// tailwind.config.js
export default {
  safelist: [
    'hover:bg-maroon-300'
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { 
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      },
      spacing: {
        '128': '6rem',
      },
      colors: {
        maroon: {
          300: '#B03060',  // Define the custom maroon shade for hover
        },
      },
      width: {
        '30': '5rem',
        'full': '100%',  // Ensures the width can be full
      },
      height: {
        '30': '5rem',
      },
    },
    variants: {
      extend: {
        // Enable scroll snap utilities
        scrollSnapType: ['responsive'],
        scrollSnapAlign: ['responsive'],
      },
    },
  },
  plugins: [],
};
