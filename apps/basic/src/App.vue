<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const size = 'small' as const
const zIndex = 3000
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--el-text-color-primary);
}

.element-plus-logo {
  width: 50%;
}
</style>
