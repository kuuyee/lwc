<script setup>
import HelloWorld from './HelloWorld.vue'
import BaseHeader from './BaseHeader.vue'
import BaseSide from './BaseSide.vue'
</script>

<template>
  <BaseHeader />
  <div style="display: flex">
    <BaseSide />
    <div>
      <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" />
    </div>
  </div>
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
