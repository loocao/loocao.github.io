module.exports = {
  title: 'loocao',
  description: 'loocao\'s pages',
  dest: "dist",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  },
  markdown: {
    lineNumbers: true
  }
}