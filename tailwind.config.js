/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14a29e',  // Set your primary color here
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

