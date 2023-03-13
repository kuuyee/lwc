<script setup lang="ts">
import { Login } from '@gomk/components'
import setting from '@/setting'
import { useRouter } from 'vue-router'
import { useDark } from '@gomk/use'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

async function handleLogin({ username, password }) {
  try {
    await userStore.login({ username, password })
    router.push('/home')
  } catch (error) {
    throw error
  }
}

const { isDark } = useDark()
</script>

<script lang="ts" setup></script>

<template>
  <Login
    :title="setting.siteTitle"
    :slogan="setting.siteSlogan"
    :description="setting.siteDescription"
    :loginFunc="handleLogin"
    :isDark="isDark"
  />
</template>
