import { defineUserConfig } from 'vuepress'

import theme from './theme.js'

export default defineUserConfig({
  base: '/',

  lang: 'zh-CN',
  title: 'loocao',
  description: '绳命在于折腾',
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules', '!_templates', '!.obsidian'],

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
})
