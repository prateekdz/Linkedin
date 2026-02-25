module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
