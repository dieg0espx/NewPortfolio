module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system', // SF Pro for macOS/iOS
          'BlinkMacSystemFont', // Safari on macOS
          'Segoe UI', // Windows fallback
          'Roboto', // Android fallback
          'Oxygen', // Linux
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      colors: {
        primary: '#794FFF',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".mask-gradient": {
          maskImage: "linear-gradient(black 50%, transparent)",
          WebkitMaskImage: "linear-gradient(black 10%, transparent)",
        },
      }, {
        variants: ["responsive"], // Ensures it works in all screen sizes
      });
    },
  ], 
};
