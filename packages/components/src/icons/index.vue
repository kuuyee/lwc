<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useAttrs } from 'vue'
import { createBEM, isString } from '@gmok/utils'

interface Props {
  color?: string
  size?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: '',
})

const [bem] = createBEM('iconify')

const { class: _class } = $(useAttrs())

const styles = $computed((): CSSProperties => {
  let { size, color } = props
  if (isString(size)) {
    size = parseInt(size, 10)
  }

  return {
    fontSize: `${size}px`,
    color: color,
    display: 'inline-flex',
  }
})

const classes = $computed(() => {
  const cls = [bem(), _class]
  // if (props.infinite) {
  //   cls.push(bem('infinite'))
  // }
  return cls
})
</script>

<template>
  <span :class="classes" :style="styles"></span>
</template>

<style lang="scss" scoped>
.iconify {
  display: inline-block;
}
</style>
