module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: ['default', {
        svgo: false
      }]
    }
  }
}
