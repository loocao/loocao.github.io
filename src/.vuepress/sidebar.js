import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/': [
    { text: 'Docker', icon: 'laptop-code', prefix: 'docker/', link: 'docker/', children: 'structure' },
    { text: '2023', icon: 'book', prefix: '2023/', children: 'structure' },
    'docker'
  ],
  '/Develop/': ['', { text: '🐧 Linux', prefix: 'Linux/', children: 'structure' }],
  '/绳命在于折腾/': ['', { text: 'NAS', prefix: '绳命在于折腾/', children: 'structure' }],
  '/note/': 'structure'
})
