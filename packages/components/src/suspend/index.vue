<script setup lang="ts">
import { watch } from 'vue'
import { createBEM } from '@gomk/utils'
import { useDark } from '@gomk/use'
import Icon from '../icons/index.vue'

const [bem] = createBEM('suspend')

const { isDark } = useDark()

const model = $ref({
  theme: isDark.value ? 'dark' : 'light',
})

const themeOptions = [
  {
    label: 'dark',
    value: 'dark',
  },
  {
    label: 'light',
    value: 'light',
  },
  // {
  //   label: 'gomk',
  //   value: 'gomk',
  // },
]

watch(
  () => model.theme,
  (value: string) => {
    isDark.value = value === 'dark'
  },
)
</script>

<template>
  <div :class="bem()">
    <n-popover placement="top" trigger="click">
      <template #trigger>
        <n-button strong secondary circle>
          <Icon class="i-icon-park-outline:setting" />
        </n-button>
      </template>
      <div :class="bem('modal')">
        <n-form
          ref="formRef"
          :model="model"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          :style="{
            maxWidth: '640px',
          }"
        >
          <n-form-item label="主题" path="theme">
            <n-select v-model:value="model.theme" :options="themeOptions" />
          </n-form-item>
        </n-form>
      </div>
    </n-popover>
  </div>
</template>

<style lang="scss" scoped>
.suspend {
  position: fixed;
  right: 00;
  bottom: 20px;
  z-index: 10;
  width: 50px;
  height: 50px;
  cursor: pointer;

  &__modal {
    width: 300px;
  }
}
</style>
