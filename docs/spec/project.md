# 工程规范

## 包管理器

统一使用 [pnpm](https://pnpm.io/zh/)替代 npm，好处如下：

- 自动解决 git 冲突，不需要手动解决
- 依赖数量体积小，开发体验好
- 安装速度快

### 如何替换

```bash
# 安装 pnpm
npm i -g pnpm
# 删除旧的node_modules和package-lock.json文件

# 重新安装依赖
pnpm install
```

## 命名规范

一个项目原则上只遵循一个命名规范：

文件夹： 全部英文小写字母 + 数字或连接符 `-`

### 项目命名

全部采用小写方式， 以中划线分隔。

- 正例：`my-project`

- 反例：`my_project`、`myProject`

### 目录命名

参照项目命名规范；

有复数结构时，要采用复数命名法，缩写不用复数。

- 正例：`scripts` 、 `styles` 、 `components` 、 `images` 、 `utils` 、 `demo-styles` 、 `demo-scripts` 、 `img`

- 反例： `script` 、 `style` 、 `demo_scripts` 、 `demoStyles` 、 `imgs`

### 文件命名

#### JS、CSS、Less、SCSS、HTML、图片文件命名

采用驼峰方式

- 正例： `renderDom.js`、 `reset.css` 、 `index.html` 、 `companyLogo.png`

- 反例： `render-dom.html`

#### vue、jsx、tsx 文件命名

采用驼峰方式

- 正例： `index.vue`、 `index.jsx` 、 `index.tsx` 、 `HelloWorld.vue`

- 反例： `hello-world.vue`

## 文档书写

**README.md** 是项目的重要组成部分， 这个是最重要。你必须在这里提供关于项目的关键信息或者相关信息的入口. 一般包含下列信息:

- 简要描述、项目主要特性
- 运行环境/依赖、安装和构建、测试指南
- 简单示例代码
- 文档或文档入口, 其他版本或相关资源入口
- 开发指南

### 特殊名词大小写

```js
            'JavaScript',
            'HTML',
            'CSS',
            'AJAX',
            'JSON',
            'DOM',
            'BOM',
            'Less',
            'Sass',
            'SCSS',
            'HTTP',
            'HTTPS',
            'WebSocket',
            'ECMAScript',
            'ECMAScript 2015',
            'ECMAScript 6',
            'ES6',
            'ES2015',
            'jQuery',
            'jQuery Mobile',
            'React',
            'React Native',
            'Bootstrap',
            'Gulp',
            'Grunt',
            'webpack',
            'Yeoman',
            'npm',
            'spm',
            'Babel',
            'Mocha',
            'Jasmine',
            'PHP',
            'Java',
            'Node.js',
            'NodeJS',
            'MySQL',
            'MongoDB',
            'Redis',
            'Apache',
            'Nginx',
            'NGINX',
            'GitHub',
            'GitLab',
            'GitCafe',
            'Chrome',
            'Firefox',
            'Safari',
            'Internet Explore',
            'IE',
            'IE 7',
            'Opera',
            'UC',
            'Android',
            'iOS',
            'Windows',
            'OS X',
            'Ubuntu',
            'Linux',
            'Debian',
            'PC',
            'Mobile',
            'H5',
            'MacBook',
            'MacBook Pro',
            'MacBook Air',
            'iMac',
            'Mac Pro',
            'iPad',
            'Mac mini',
            'iPad Air',
            'iPad Air 2',
            'iPad mini',
            'iPhone',
            'iPhone 6s',
            'iPhone 6s Plus',
            'Apple Watch',
            'Google',
            'Alphabet',
            'Apple',
            'Microsoft',
            'Yahoo',
            'FPS',
            'UI',
            'URL',
            'URI',
            'URLs',
            'URIs',
            'Visual Studio Code',

```
