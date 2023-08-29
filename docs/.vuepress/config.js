module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  permalink: "/:year/:month/:day/:slug",
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