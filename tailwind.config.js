module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'false', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '868px',
      lg: '1024px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
