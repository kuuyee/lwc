# 启动命令

本章节介绍项目的启动命令及定制化脚手架 `@gomk/cli`的说明

## npm 脚本

```js

pnpm run bootstrap // 安装依赖
pnpm run clean // 清空所有的缓存和安装依赖
pnpm run dev // 运行某个app，如果app只有一个，则直接启动
pnpm run build // 构建某个app，如果app只有一个，则直接构建
pnpm run lint // 执行项目规范检查
pnpm run lint:eslint // 执行 eslint 项目格式化
pnpm run lint:prettier // 执行 prettier 项目格式化
pnpm run lint:style // 执行 style 项目格式化
pnpm run change // 使用 changeset 生成提交记录
pnpm run bump // 消耗所有的提交记录，并更新版号
```
