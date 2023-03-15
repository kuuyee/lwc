<script setup lang="ts">
import { shallowRef, onMounted, nextTick } from 'vue'

import flvjs from 'flv.js'
const videoRef = shallowRef(null)

function videoPlayer() {
  if (flvjs.isSupported()) {
    let videoElement = videoRef.value
    let flvPlayer = flvjs.createPlayer(
      {
        type: 'flv',
        isLive: true,
        hasAudio: true,
        url: 'ws://127.0.0.1:8080/live/101.flv',
      },
      {
        enableStashBuffer: false,
        stashInitialSize: 128,
      },
    )

    flvPlayer.on('error', (err) => {
      console.log('err', err)
    })
    flvjs.getFeatureList()
    flvPlayer.attachMediaElement(videoElement as any)
    flvPlayer.load()
    flvPlayer.play()
  }
}

onMounted(async () => {
  await nextTick()
  videoPlayer()
})
</script>

<template>
  <video ref="videoRef" autoplay controls width="100%" height="500"></video>
</template>
