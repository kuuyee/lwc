# IDE

::: tip

IDE 配置可以由一个人统一配置后提交到 git 仓库即可。

:::

## 统一编辑器

统一使用[vscode](https://code.visualstudio.com/)进行前端开发， 统一的开发工具有助于规范的统一及落地，方便更好的落实规范。

如果使用其他的 IDE，需要自行配置一些插件，这里只介绍 vscode。

## 插件

为了快速修复代码格式，我们可以安装一些插件来快速帮助我们实现代码格式化：

- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 统一代码风格
- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 代码检查
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) 样式格式化、自动排序
- [code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) 单词拼写检查

## 配置文件

为了统一一个项目的配置，通常我们会把`.vscode`存放在项目内。所以，需要检查项目的`.gitignore`文件是否忽略了该文件，如果忽略，需要删除，让`.vscode`文件夹上传到 git 仓库内

```json
.vscode
  - extensions.json // 推荐的插件列表
  - settings.json // 共享的编辑器配置
  - launch.json // 开发调试配置（如有）
```

### 需要的配置

#### extensions.json

```json
{
  "recommendations": [
    "esbenp.prettier-vscode", // prettier 插件
    "dbaeumer.vscode-eslint", // eslint 插件
    "stylelint.vscode-stylelint", // stylelint 插件
    "streetsidesoftware.code-spell-checker" // 单词拼写是否正确检查
  ]
}
```

#### settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": [
    "source.fixAll.eslint",
    "source.fixAll.stylelint"
  ],
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.eol": "\n"
}
```
