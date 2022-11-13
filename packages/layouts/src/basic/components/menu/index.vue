<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { h } from 'vue'
import { Icon } from '@gmok/components'

function renderIcon(icon: string) {
  return () => h(Icon, { class: icon })
}

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'hear-the-wind-sing',
    icon: renderIcon('ant-design:menu-outlined'),
  },
  {
    label: '系统管理',
    key: 'dance-dance-dance',
    icon: renderIcon('ant-design:menu-outlined'),
    children: [
      {
        label: '模版管理',
        key: 'narrator',
        icon: renderIcon('ant-design:menu-outlined'),
      },
      {
        label: '组件管理',
        key: 'sheep-man',
        icon: renderIcon('ant-design:menu-outlined'),
      },
    ],
  },
]
</script>

<template>
  <n-menu :options="menuOptions" />
</template>
