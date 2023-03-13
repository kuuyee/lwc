<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { createBEM } from '@gomk/utils'

const [bem] = createBEM('layout-header')

const style = computed((): CSSProperties => {
  return {
    height: '60px',
  }
})
</script>

<template>
  <n-layout-header :class="bem()" bordered :style="style">
    <div></div>
  </n-layout-header>
</template>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
