<script setup lang="ts">
import type { MenuOption, MenuInst } from 'naive-ui'
import { h, ref, onMounted } from 'vue'
import { Icon } from '@gomk/components'
import { useRouter, useRoute } from 'vue-router'

function renderIcon(icon: string) {
  return () => h(Icon, { class: icon })
}
const selectedKey = ref('')

const router = useRouter()
const route = useRoute()
const menuInstRef = ref<MenuInst | null>(null)

const menuOptions: MenuOption[] = [
  // {
  //   label: '首页',
  //   key: '/home',
  //   icon: renderIcon('ant-design:menu-outlined'),
  // },
  // {
  //   label: '系统管理',
  //   key: 'dance-dance-dance',
  //   icon: renderIcon('ant-design:menu-outlined'),
  //   children: [
  //     {
  //       label: '模版管理',
  //       key: 'narrator',
  //       icon: renderIcon('ant-design:menu-outlined'),
  //     },
  //     {
  //       label: '组件管理',
  //       key: 'sheep-man',
  //       icon: renderIcon('ant-design:menu-outlined'),
  //     },
  //   ],
  // },
  {
    label: '监控管理',
    key: 'monitor_manager',
    icon: renderIcon('ant-design:menu-outlined'),
    children: [
      {
        label: '摄像头管理',
        key: '/home',
        icon: renderIcon('ant-design:menu-outlined'),
      },
    ],
  },
]

function handleUpdateValue(key: string) {
  router.push(key)
}

function update(key: string) {
  selectedKey.value = key
  menuInstRef.value?.showOption(key)
}

onMounted(() => {
  update(route.path)
})
</script>

<template>
  <n-menu
    ref="menuInstRef"
    :options="menuOptions"
    :value="selectedKey"
    :accordion="true"
    @update:value="handleUpdateValue"
  />
</template>
