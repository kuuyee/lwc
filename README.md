# Basic FrontEnd Template

## 前言

- 建议使用 vscode 作为前端开发工具，以保证部分插件辅助 lint 快速修复。
- node 版本使用 16 以上
- pnpm 版本需要 7.0.0

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
