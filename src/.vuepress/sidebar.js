import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/Develop/': [
    { text: '🐧 Linux', prefix: 'Linux/', children: 'structure' },
    { text: '🍬 其它', prefix: 'others/', children: 'structure' }
  ],
  '/life/': [{ text: 'NAS', prefix: 'NAS/', children: 'structure' }],
  '/note/': 'structure'
})
