# 项目结构

```js
├── README.md
├── _internal // 项目内部配置
│   ├── lint
│   │   ├── commitlint.js // commitlint配置
│   │   ├── eslint.js // eslint 配置
│   │   ├── lintstaged.js // lint-staged 配置
│   │   ├── prettier.js // prettier 配置
│   │   └── stylelint // stylelint 配置
│   ├── tsconfig // 通用tsconfig 配置
│   └── vite // vite 配置
├── apps
│   ├── portal-view // 默认视图
│   │   ├── src
│   │   │   ├── App.vue
│   │   │   ├── main.ts
│   │   │   ├── pages // 页面
│   │   │   ├── router // 路由
│   │   │   ├── setting.ts
│   │   │   └── store // 数据仓库
│   │   ├── types
│   └── server // 服务
├── docs // 文档
├── packages
│   ├── bootstrap // 应用启动宝
│   ├── components // 组件包
│   ├── design // 设置
│   │   ├── src
│   │   │   ├── styles // 全局css
│   │   │   └── theme // 主题
│   ├── layouts // 布局相关
│   └── share // 共享包
│       ├── constants // 常量
│       ├── use // hooks
│       └── utils // 工具类
├── scripts
│   └── gomk // 项目定制cli
└── turbo.json
```
