<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { createBEM } from '@gomk/utils'
import VerifyCode from '../../verify-code/index.vue'

interface Props {
  loginFunc?: (params: { username: string; password: string }) => Promise<void>
}

const formModel = $ref({
  username: '',
  password: '',
})

let loading = $ref(false)
let showCode = $ref(false)

const formRef = $ref<FormInst | null>(null)

const rules = $ref({
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入用户名',
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码',
  },
})

const props = defineProps<Props>()

const [bem] = createBEM('login-form')

function handleLogin(e: MouseEvent) {
  e?.preventDefault()

  formRef?.validate(async (errors) => {
    if (!errors) {
      showCode = true
    }
  })
}

async function handleVerifySuccess() {
  try {
    loading = true
    await props.loginFunc?.(formModel)
  } finally {
    showCode = false
    loading = false
  }
}
</script>

<template>
  <verify-code :show="showCode" @success="handleVerifySuccess" />
  <div :class="bem()">
    <p :class="bem('title')">登录</p>
    <n-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="large"
    >
      <n-form-item label="" path="username">
        <n-input v-model:value="formModel.username" placeholder="用户名" />
      </n-form-item>
      <n-form-item label="" path="password">
        <n-input
          v-model:value="formModel.password"
          placeholder="密码"
          show-password-on="mousedown"
          type="password"
        />
      </n-form-item>
      <!-- <n-form-item label="" path="verifyCode">
        <VerifyCode />
      </n-form-item> -->
      <n-form-item attr-type="button" @click="handleLogin">
        <n-button block type="primary" :loading="loading">登录</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  width: 80%;

  &__title {
    width: 100%;
    font-size: 24px;
    color: var(--text-color-login-title);
  }
}
</style>

<style lang="scss">
.login-form {
  button {
    span {
      color: var(--text-color-btn);

      &:hover {
        color: var(--text-color-btn);
      }
    }
  }
}
</style>
