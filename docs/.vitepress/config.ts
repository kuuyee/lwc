import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

export default defineConfig({
  title: 'gomk',
  description: '企业级开发框架',
  lang: 'zh-CN',
  vue: {
    reactivityTransform: true,
  },

  themeConfig: {
    logo: '/logo.png',
    socialLinks: [{ icon: 'github', link: 'https://xxxx' }],

    nav: [
      { text: '指引', link: '/guide/', activeMatch: '/guide/' },
      { text: '规范', link: '/spec/', activeMatch: '/spec/' },
      { text: 'FAQ', link: '/faq/', activeMatch: '/faq/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指引',
          items: [
            {
              text: '介绍',
              link: '/guide/',
            },
            {
              text: '项目结构',
              link: '/guide/project',
            },
            {
              text: '启动命令',
              link: '/guide/command',
            },
            {
              text: '图标',
              link: '/guide/icon',
            },
            {
              text: '样式',
              link: '/guide/style',
            },
          ],
        },
      ],
      '/spec/': [
        {
          text: '项目规范',
          items: [
            {
              text: '介绍',
              link: '/spec/',
            },
            {
              text: 'IDE',
              link: '/spec/ide',
            },
            {
              text: '代码规范',
              link: '/spec/code',
            },
            {
              text: '项目',
              link: '/spec/project',
            },
            {
              text: 'git规范',
              link: '/spec/git',
            },
          ],
        },
      ],
      '/faq/': [],
    },
  },

  markdown: {
    anchor: {
      permalink: renderPermaLink,
    },
    config: (md) => {
      md.use(MarkDownItCustomAnchor)
    },
  },
})
