<script setup lang="ts">
import { nextTick, watch, ref } from 'vue'
import videojs, { VideoJsPlayer } from 'video.js'
import 'video.js/dist/video-js.css'

const playRef = ref<Element | string>('')
const play = ref<VideoJsPlayer | null>(null)
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
})

function videoPlayer() {
  play.value = videojs(
    playRef.value,
    {
      bigPlayButton: false,
    },
    function () {
      this.play()
    },
  )
}

watch(
  () => props.url,
  async () => {
    await nextTick()
    if (props.url) {
      if (play.value) {
      } else {
        videoPlayer()
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <video
    v-if="url"
    ref="playRef"
    class="video-js vjs-default-skin"
    controls
    preload="auto"
    height="600"
  >
    <source :src="url" type="application/x-mpegURL" />
  </video>
</template>
