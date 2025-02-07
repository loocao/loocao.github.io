import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/Develop/': [
    { text: '主页', icon: 'house', link: '/' },
    { text: '☕️ Java', link: 'Java/' },
    { text: '🐧 Linux', link: 'Linux/' },
    { text: '📚 其它', link: 'others/' },
  ],
  '/life/': [
    { text: '主页', icon: 'house', link: '/' },
    { text: '🏡 NAS', link: 'NAS/' },
    { text: '🪙 Network', link: 'Network/' },
    { text: '🌐 建站资源', link: 'site/' },
  ],
})
