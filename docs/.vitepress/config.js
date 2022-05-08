// @ts-check
/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  base: '/',
  title: '项目文档',
  lang: 'zh-CN',
  description: '项目文档指南',
  themeConfig: {
    logo: '/logo.png',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '为此页提供修改建议',
    nav: createNav(),
    sidebar: createSidebar(),
  },
}

function createNav() {
  return [
    {
      text: '指南',
      link: '/guide/introduction',
    },
    {
      text: 'FAQ',
      link: '/faq/index',
    },
  ]
}

function createSidebar() {
  return {
    '/guide/': [],
  }
}
