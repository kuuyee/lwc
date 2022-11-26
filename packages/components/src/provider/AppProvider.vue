<script lang="ts" setup>
import {
  zhCN,
  dateZhCN,
  GlobalThemeOverrides,
  NConfigProvider,
  darkTheme,
  lightTheme,
} from 'naive-ui'
import { useDark } from '@gmok/use'
import Suspend from '../suspend/index.vue'

// 主题色覆盖
const themeOverrides: GlobalThemeOverrides = {
  common: {
    // TODO: 通过配置自动生成主色及渐变色
    primaryColor: '#1b4fab',
    primaryColorHover: '#1b4fab',
    primaryColorPressed: '#1b4fab',
  },
}

const { isDark } = $(useDark())

// 切换 naive-ui 黑暗主题
const theme = $computed(() => (isDark ? darkTheme : lightTheme))
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
    :theme="theme"
  >
    <suspend />
    <slot></slot>
  </n-config-provider>
</template>
