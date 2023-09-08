import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/',
  dest: 'dist',

  lang: 'zh-CN',
  title: '',
  description: '',
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules', '!_templates', '!.obsidian'],

  theme
})
