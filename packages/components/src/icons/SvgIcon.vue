<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useAttrs } from 'vue'
import { createBEM } from '@gmok/utils'

const { class: _class } = $(useAttrs())

interface Props {
  prefix: string
  icon: string | number
  size: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  icon: 'icon',
})

const [bem] = createBEM('svg-icon')

const symbolId = $computed(() => `#${props.prefix}-${props.icon}`)

const classes = $computed(() => {
  const cls = [bem(), _class]
  // props.infinite && cls.push(bem('infinite'))
  return cls
})

const svgStyle = $computed((): CSSProperties => {
  const { size } = props
  const _size = `${`${size}`.replace('px', '')}px`
  return {
    width: _size,
    height: _size,
  }
})
</script>

<template>
  <svg :class="classes" :style="svgStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
