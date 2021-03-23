module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'mikyogray': '#222831',
        'mikyored': '#ff5151',
        'mikyoyellow': '#ffa41b',
        'mikyopurple': '#9818d6',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
