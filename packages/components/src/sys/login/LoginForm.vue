<script setup lang="ts">
import { ref } from 'vue'
import { createBEM } from '@gmok/utils'
import { FormInst } from 'naive-ui'

// import VerifyCode from '../verify-code/index.vue'

const props = defineProps({
  loginFunc: {
    type: Function,
    default: null,
  },
})

const [bem] = createBEM('login-form')

const formModel = ref({
  username: '',
  password: '',
})

const loading = ref(false)

const formRef = ref<FormInst | null>(null)

const rules = ref({
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

function handleLogin(e: MouseEvent) {
  e?.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        loading.value = true
        await props.loginFunc?.(formModel.value)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
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

<style lang="less" scoped>
.login-form {
  width: 80%;

  &__title {
    width: 100%;
    font-size: 24px;
    // text-align: left;
  }
}
</style>
