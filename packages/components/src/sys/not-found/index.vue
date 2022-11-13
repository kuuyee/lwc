<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { createBEM } from '@gmok/utils'

const [bem] = createBEM('not-found')

const props = defineProps({
  description: {
    type: String,
    default: '',
  },
})

const router = useRouter()

function back() {
  router.push('/')
}
</script>

<template>
  <n-result
    :class="bem()"
    status="404"
    title="资源不存在"
    :description="props.description"
    size="huge"
  >
    <template #footer>
      <n-button type="primary" @click="back">返回首页</n-button>
    </template>
  </n-result>
</template>

<style lang="less" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
