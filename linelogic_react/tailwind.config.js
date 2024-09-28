// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { 
    extend: {
      colors: {
        '630031': '#630031',
        'CF4420': '#CF4420',
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
