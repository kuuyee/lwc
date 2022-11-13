<script setup lang="ts">
import { Login } from '@gmok/components'
import setting from '@/setting'
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleLogin() {
  router.push('/home')
}
</script>

<script lang="ts" setup></script>

<template>
  <Login
    :title="setting.siteTitle"
    :slogan="setting.siteSlogan"
    :description="setting.siteDescription"
    :loginFunc="handleLogin"
  />
</template>
