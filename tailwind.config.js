/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,html}",   // Scan EJS files
    "./public/**/*.{js,html}",   // Include any frontend HTML/JS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
