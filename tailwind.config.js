/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_blue: '#0052A2',
        primary_gray: "#3D3D3D",
      },
    },
  },
  plugins: [],
}