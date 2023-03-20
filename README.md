# Basic FrontEnd Template

## 前言

- 建议使用 vscode 作为前端开发工具，以保证部分插件辅助 lint 快速修复（改动通用 vscode 配置需要周知下）。
- node 版本使用 18.0.0 以上
- pnpm 版本需要 7.14.0

## 安装

```bash
# 安装 pnpm
npm i -g pnpm

# 安装依赖
pnpm install
```

## 运行

```bash
# 运行
pnpm run dev

# 打包
pnpm run build

```

## 定期更新依赖

定期更新依赖将有助于项目跟进前沿技术，且新的依赖一般会修复某些 Bug。

### 步骤

```bash
# 全局安装 taze 工具（只需要安装一次）
npm i -g taze

# 执行依赖更新(执行后需要手动观察下git变更记录，做到心底有数，对于大版本更新，可以查看对应的github查看更新步骤在进行项目更新)
taze major -rw

# 重新安装依赖
pnpm install

```

### 一些需要遵守的原则&规范

- ts 文件使用小写驼峰规则：todoList.ts
- vue 文件使用大写写驼峰规则：todoList.ts
- 出了 naive 全局注册的组件，其余组件全部需要 import 进来，尽量不要使用全局组件
- 使用 unc.css 和 vue bem scoped 结合来写 css（scoped 必须写）
- 不使用行内样式
- 需要使用按需引入，入 `import {set} from ''lodash-es`
- 引入第三方库时，需要先评估下是否最优，在引入
- 每次提交 pr，尽量简单写下说明且每次 pr 的代码量不要太多，一小个功能一次提交

### lal 监控本地测试

- 安装 lal

```bash
cd apps/lal
make build
./bin/lalserver -c conf/lalserver.conf.json
```

- 运行前端项目

```bash
pnpm dev
```
