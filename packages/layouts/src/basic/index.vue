<script setup lang="ts">
import Menu from './components/menu/index.vue'
import Header from './components/header/index.vue'
</script>

<template>
  <n-layout class="h-full">
    <Header />
    <n-layout has-sider class="h-full">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="100"
        :width="200"
        show-trigger="arrow-circle"
        bordered
      >
        <Menu />
      </n-layout-sider>
      <n-layout-content class="p-4">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
