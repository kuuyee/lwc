<script setup lang="ts">
import { Login } from '@gmok/components'
import setting from '@/setting'
import { useRouter } from 'vue-router'
import { useDark } from '@gmok/use'

const router = useRouter()

async function handleLogin() {
  router.push('/home')
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
