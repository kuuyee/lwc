<script lang="ts" setup>
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    // TODO: 通过配置自动生成主色及渐变色
    primaryColor: '#1b4fab',
    primaryColorHover: '#1b4fab',
    primaryColorPressed: '#1b4fab',
  },
}
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
    <router-view />
  </n-config-provider>
</template>
