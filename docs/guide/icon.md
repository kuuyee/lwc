# 项目图标

## 基本图标

图表使用了 [unocss-icons](https://www.npmjs.com/package/@unocss/preset-icons) 插件实现，可以使用[iconify](https://icon-sets.iconify.design/)内包含的所有图标，基本涵盖 99% 以上场景,使用方式：

```vue
<script setup>
import { Icon } from '@gomk/components'
</script>
<template>
  <Icon class="i-xxx"></Icon>
</template>
```

## svg 图标（不推荐）

除基本图标外，如果有特殊需求，只要将 svg 图标文件放在 `packages/components/src/icons/svgs` 下后，即可使用，使用方式:

```vue
<script setup>
import { SvgIcon } from '@gomk/components'
</script>
<template>
  <svg-icon icon="xxx"></svg-icon>
</template>
```
