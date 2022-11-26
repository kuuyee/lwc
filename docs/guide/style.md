# 样式

本章节介绍了项目内样式如何使用。

## 规范

对于 css 及 class 的规范，要求有几点：

- 能使用 [unocss](https://github.com/unocss/unocss) 的，尽量使用 [unocss](https://github.com/unocss/unocss)
- 使用 vue 的 style 标签时，需要添加 scoped 属性，防止干扰
- 使用 bem 风格的 class 命名

## unocss

UnoCSS 是一个原子 CSS 引擎而不是一个框架。一切都在设计时考虑了灵活性和性能。UnoCSS 中没有核心实用程序，所有功能都是通过预设提供的。

默认情况下，UnoCSS 应用默认预设，它提供了流行的实用程序优先框架 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等的通用超集。

e.g

```html
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    My Button
  </button>
</div>
```

## bem

Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

e.g

```html
<script setup lang="ts">
  import { createBEM } from '@gmok/utils'

  const [bem] = createBEM('iconify')
</script>

<template>
  <span :class="bem()"></span>
</template>

<style lang="scss" scoped>
  .iconify {
    display: inline-block;
  }
</style>
```

## 主题样式

使用到的技术：

- [CSS Var](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)
- [Customize Theme](https://www.naiveui.com/zh-CN/dark/docs/customize-theme)
