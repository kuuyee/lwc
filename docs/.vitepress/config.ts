import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

export default defineConfig({
  title: 'Gmok',
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
