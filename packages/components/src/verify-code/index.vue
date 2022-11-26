<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import resetSvg from './assets/reset.png'
import { createBEM } from '@gmok/utils'

const [bem] = createBEM('verify-code')

interface Props {
  canvasWidth?: number
  canvasHeight?: number
  // 主canvas的高
  show?: boolean
  // 拼图块的大小缩放比例
  puzzleScale?: number
  // 滑块的大小
  sliderSize?: number
  // 允许的偏差值
  range?: number
  imgs?: string[]
  successText?: string
  failText?: string
  sliderText?: string
}

const props = withDefaults(defineProps<Props>(), {
  canvasWidth: 310,
  canvasHeight: 160,
  puzzleScale: 1,
  sliderSize: 50,
  range: 10,
  show: false,
  imgs: () => [],
  successText: '验证通过！',
  failText: '验证失败，请重试',
  sliderText: '拖动滑块完成拼图',
})

const emit = defineEmits(['success', 'fail', 'close'])

const el = $ref<any>(null)
const rangeSlider = $ref<any>(null)
const canvas1 = $ref<any>(null)
const canvas2 = $ref<any>(null)
const canvas3 = $ref<any>(null)

// 鼠标是否在按钮上按下
let mouseDown = $ref(false)
// 鼠标点下去时父级的width
let startWidth = $ref(50)
// 鼠标按下时的X
let startX = $ref(0)
// 鼠标当前的偏移X
let newX = $ref(0)
// 拼图的起始X
let pinX = $ref(0)
// 拼图的起始Y
let pinY = $ref(0)
// 是否正在加在中，主要是等图片onload
let loading = $ref(false)
// 是否可以拉动滑动条
let isCanSlide = $ref(false)
// 提示信息是否出现
let infoBoxShow = $ref(false)
// 提示等信息
let infoText = $ref('')
// 是否验证失败
let infoBoxFail = $ref(false)
// setTimout1
let timer1 = $ref<any>(null)
// 为了解决Mac上的click BUG
let closeDown = $ref(false)
// 验证成功
let isSuccess = $ref(false)
// 用于自定义图片时不会随机到重复的图片
let imgIndex = $ref(-1)
// 是否正在判定，主要用于判定中不能点击重置按钮
let isSubmting = $ref(false)

const styleWidth = $computed(() => {
  const w = startWidth + newX - startX
  return w < sliderBaseSize
    ? sliderBaseSize
    : w > props.canvasWidth
    ? props.canvasWidth
    : w
})

// 图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
const puzzleBaseSize = $computed(() => {
  return Math.round(Math.max(Math.min(props.puzzleScale, 2), 0.2) * 52.5 + 6)
})

// 处理一下sliderSize，弄成整数，以免计算有偏差
const sliderBaseSize = $computed(() => {
  return Math.max(
    Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)),
    10,
  )
})

// 用canvas随机生成图片
function makeImgWithCanvas() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  const { canvasWidth, canvasHeight } = props
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
    100,
    255,
  )},${getRandom(100, 255)})`
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  // 随机画10个图形
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
      100,
      255,
    )},${getRandom(100, 255)})`
    ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(
      100,
      255,
    )},${getRandom(100, 255)})`

    if (getRandom(0, 2) > 1) {
      // 矩形
      ctx.save()
      ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
      ctx.fillRect(
        getRandom(-20, canvas.width - 20),
        getRandom(-20, canvas.height - 20),
        getRandom(10, canvas.width / 2 + 10),
        getRandom(10, canvas.height / 2 + 10),
      )
      ctx.restore()
    } else {
      // 圆
      ctx.beginPath()
      const ran = getRandom(-Math.PI, Math.PI)
      ctx.arc(
        getRandom(0, canvas.width),
        getRandom(0, canvas.height),
        getRandom(10, canvas.height / 2 + 10),
        ran,
        ran + Math.PI * 1.5,
      )
      ctx.closePath()
      ctx.fill()
    }
  }
  return canvas.toDataURL('image/png')
}

// 开始判定
function submit() {
  const { canvasWidth, successText, range, failText } = props
  isSubmting = true
  // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
  // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
  const x = Math.abs(
    pinX -
      (styleWidth - sliderBaseSize) +
      (puzzleBaseSize - sliderBaseSize) *
        ((styleWidth - sliderBaseSize) / (canvasWidth - sliderBaseSize)) -
      3,
  )
  if (x < range) {
    // 成功
    infoText = successText
    infoBoxFail = false
    infoBoxShow = true
    isCanSlide = false
    isSuccess = true
    // 成功后准备关闭
    clearTimeout(timer1)
    timer1 = setTimeout(() => {
      // 成功的回调
      isSubmting = false
      emit('success', x)
    }, 800)
  } else {
    // 失败
    infoText = failText
    infoBoxFail = true
    infoBoxShow = true
    isCanSlide = false
    // 失败的回调
    emit('fail', x)
    // 800ms后重置
    clearTimeout(timer1)
    timer1 = setTimeout(() => {
      isSubmting = false
      reset()
    }, 800)
  }
}

// 关闭
function onClose() {
  if (!mouseDown) {
    clearTimeout(timer1)
    emit('close')
  }
}
function onCloseMouseDown() {
  closeDown = true
}
function onCloseMouseUp() {
  if (closeDown) {
    onClose()
  }
  closeDown = false
}
// 鼠标按下准备拖动
function onRangeMouseDown(e) {
  if (isCanSlide) {
    mouseDown = true
    startWidth = rangeSlider.clientWidth
    newX = e.clientX || e.changedTouches[0].clientX
    startX = e.clientX || e.changedTouches[0].clientX
  }
}
// 鼠标移动
function onRangeMouseMove(e) {
  if (mouseDown) {
    e.preventDefault()
    newX = e.clientX || e.changedTouches[0].clientX
  }
}
// 鼠标抬起
function onRangeMouseUp() {
  if (mouseDown) {
    mouseDown = false
    submit()
  }
}

/**
 * 开始进行
 * @param withCanvas 是否强制使用canvas随机作图
 */
function init(withCanvas) {
  // 防止重复加载导致的渲染错误
  if (loading && !withCanvas) {
    return
  }
  const { canvasWidth, canvasHeight, puzzleScale, imgs } = props
  loading = true
  isCanSlide = false
  const c = canvas1
  const c2 = canvas2
  const c3 = canvas3
  const ctx = c.getContext('2d')
  const ctx2 = c2.getContext('2d')
  const ctx3 = c3.getContext('2d')
  const isFirefox =
    navigator.userAgent.indexOf('Firefox') >= 0 &&
    navigator.userAgent.indexOf('Windows') >= 0 // 是windows版火狐
  const img = document.createElement('img')
  ctx.fillStyle = 'rgba(255,255,255,1)'
  ctx3.fillStyle = 'rgba(255,255,255,1)'
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx2.clearRect(0, 0, canvasWidth, canvasHeight)

  // 取一个随机坐标，作为拼图块的位置
  pinX = getRandom(puzzleBaseSize, canvasWidth - puzzleBaseSize - 20) // 留20的边距
  pinY = getRandom(20, canvasHeight - puzzleBaseSize - 20) // 主图高度 - 拼图块自身高度 - 20边距
  img.crossOrigin = 'anonymous' // 匿名，想要获取跨域的图片
  img.onload = () => {
    const [x, y, w, h] = makeImgSize(img)
    ctx.save()
    // 先画小图
    paintBrick(ctx)
    ctx.closePath()
    if (!isFirefox) {
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 3
      ctx.fill()
      ctx.clip()
    } else {
      ctx.clip()
      ctx.save()
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      ctx.shadowColor = '#000'
      ctx.shadowBlur = 3
      ctx.fill()
      ctx.restore()
    }

    ctx.drawImage(img, x, y, w, h)
    ctx3.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx3.drawImage(img, x, y, w, h)

    // 设置小图的内阴影
    ctx.globalCompositeOperation = 'source-atop'

    paintBrick(ctx)

    ctx.arc(
      pinX + Math.ceil(puzzleBaseSize / 2),
      pinY + Math.ceil(puzzleBaseSize / 2),
      puzzleBaseSize * 1.2,
      0,
      Math.PI * 2,
      true,
    )
    ctx.closePath()
    ctx.shadowColor = 'rgba(255, 255, 255, .8)'
    ctx.shadowOffsetX = -1
    ctx.shadowOffsetY = -1
    ctx.shadowBlur = Math.min(Math.ceil(8 * puzzleScale), 12)
    ctx.fillStyle = '#ffffaa'
    ctx.fill()

    // 将小图赋值给ctx2
    const imgData = ctx.getImageData(
      pinX - 3, // 为了阴影 是从-3px开始截取，判定的时候要+3px
      pinY - 20,
      pinX + puzzleBaseSize + 5,
      pinY + puzzleBaseSize + 5,
    )
    ctx2.putImageData(imgData, 0, pinY - 20)

    // ctx2.drawImage(c, pinX - 3,pinY - 20,pinX + puzzleBaseSize + 5,pinY + puzzleBaseSize + 5,
    // 0, pinY - 20, pinX + puzzleBaseSize + 5, pinY + puzzleBaseSize + 5);

    // 清理
    ctx.restore()
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // 画缺口
    ctx.save()
    paintBrick(ctx)
    ctx.globalAlpha = 0.8
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.restore()

    // 画缺口的内阴影
    ctx.save()
    ctx.globalCompositeOperation = 'source-atop'
    paintBrick(ctx)
    ctx.arc(
      pinX + Math.ceil(puzzleBaseSize / 2),
      pinY + Math.ceil(puzzleBaseSize / 2),
      puzzleBaseSize * 1.2,
      0,
      Math.PI * 2,
      true,
    )
    ctx.shadowColor = '#000'
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.shadowBlur = 16
    ctx.fill()
    ctx.restore()

    // 画整体背景图
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.drawImage(img, x, y, w, h)
    ctx.restore()

    loading = false
    isCanSlide = true
  }
  img.onerror = () => {
    init(true) // 如果图片加载错误就重新来，并强制用canvas随机作图
  }

  if (!withCanvas && imgs && imgs.length) {
    let randomNum = getRandom(0, imgs.length - 1)
    if (randomNum === imgIndex) {
      if (randomNum === imgs.length - 1) {
        randomNum = 0
      } else {
        randomNum++
      }
    }
    imgIndex = randomNum
    img.src = imgs[randomNum]
  } else {
    // @ts-ignore typo
    img.src = makeImgWithCanvas()
  }
}

// 绘制拼图块的路径
function paintBrick(ctx) {
  const moveL = Math.ceil(15 * props.puzzleScale) // 直线移动的基础距离
  ctx.beginPath()
  ctx.moveTo(pinX, pinY)
  ctx.lineTo(pinX + moveL, pinY)
  ctx.arcTo(
    pinX + moveL,
    pinY - moveL / 2,
    pinX + moveL + moveL / 2,
    pinY - moveL / 2,
    moveL / 2,
  )
  ctx.arcTo(
    pinX + moveL + moveL,
    pinY - moveL / 2,
    pinX + moveL + moveL,
    pinY,
    moveL / 2,
  )
  ctx.lineTo(pinX + moveL + moveL + moveL, pinY)
  ctx.lineTo(pinX + moveL + moveL + moveL, pinY + moveL)
  ctx.arcTo(
    pinX + moveL + moveL + moveL + moveL / 2,
    pinY + moveL,
    pinX + moveL + moveL + moveL + moveL / 2,
    pinY + moveL + moveL / 2,
    moveL / 2,
  )
  ctx.arcTo(
    pinX + moveL + moveL + moveL + moveL / 2,
    pinY + moveL + moveL,
    pinX + moveL + moveL + moveL,
    pinY + moveL + moveL,
    moveL / 2,
  )
  ctx.lineTo(pinX + moveL + moveL + moveL, pinY + moveL + moveL + moveL)
  ctx.lineTo(pinX, pinY + moveL + moveL + moveL)
  ctx.lineTo(pinX, pinY + moveL + moveL)

  ctx.arcTo(
    pinX + moveL / 2,
    pinY + moveL + moveL,
    pinX + moveL / 2,
    pinY + moveL + moveL / 2,
    moveL / 2,
  )
  ctx.arcTo(pinX + moveL / 2, pinY + moveL, pinX, pinY + moveL, moveL / 2)
  ctx.lineTo(pinX, pinY)
}

// 重置 - 重新设置初始状态
function resetState() {
  infoBoxFail = false
  infoBoxShow = false
  isCanSlide = false
  isSuccess = false
  startWidth = sliderBaseSize as any // 鼠标点下去时父级的width
  startX = 0 // 鼠标按下时的X
  newX = 0 // 鼠标当前的偏移X
}

// 重置
function reset() {
  if (isSubmting) {
    return
  }
  resetState()
  init(false)
}

// 工具 - 范围随机数
function getRandom(min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}

// 工具 - 设置图片尺寸cover方式贴合canvas尺寸 w/h
function makeImgSize(img) {
  const { canvasWidth, canvasHeight } = props
  const imgScale = img.width / img.height
  const canvasScale = canvasWidth / canvasHeight
  let x = 0,
    y = 0,
    w = 0,
    h = 0
  if (imgScale > canvasScale) {
    h = canvasHeight
    w = imgScale * h
    y = 0
    x = (canvasWidth - w) / 2
  } else {
    w = canvasWidth
    h = w / imgScale
    x = 0
    y = (canvasHeight - h) / 2
  }
  return [x, y, w, h]
}

watch(
  () => props.show,
  (newV) => {
    // 每次出现都应该重新初始化
    if (newV) {
      document.body.classList.add('lock-screen')
      reset()
    } else {
      isSubmting = false
      isSuccess = false
      infoBoxShow = false
      document.body.classList.remove('lock-screen')
    }
  },
)

onMounted(() => {
  el?.addEventListener('mousemove', onRangeMouseMove, false)
  el?.addEventListener('mouseup', onRangeMouseUp, false)

  el?.addEventListener('touchmove', onRangeMouseMove, {
    passive: false,
  })
  el?.addEventListener('touchend', onRangeMouseUp, false)
  if (props.show) {
    document.body.classList.add('lock-screen')
    reset()
  }
})

onUnmounted(() => {
  clearTimeout(timer1)
  el?.removeEventListener('mousemove', onRangeMouseMove, false)
  el?.removeEventListener('mouseup', onRangeMouseUp, false)

  el?.removeEventListener('touchmove', onRangeMouseMove)
  el?.removeEventListener('touchend', onRangeMouseUp, false)
})
</script>

<template>
  <!-- 本体部分 -->
  <div
    ref="el"
    :class="[bem(), { show }]"
    @mousedown="onCloseMouseDown"
    @mouseup="onCloseMouseUp"
    @touchstart="onCloseMouseDown"
    @touchend="onCloseMouseUp"
  >
    <div class="auth-box" @mousedown.stop @touchstart.stop>
      <div class="auth-body" :style="`height: ${canvasHeight}px`">
        <!-- 主图，有缺口 -->
        <canvas
          ref="canvas1"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
        ></canvas>
        <!-- 成功后显示的完整图 -->
        <canvas
          ref="canvas3"
          :class="['auth-canvas3_', { show: isSuccess }]"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
        ></canvas>
        <!-- 小图 -->
        <canvas
          ref="canvas2"
          class="auth-canvas2_"
          :width="puzzleBaseSize"
          :height="canvasHeight"
          :style="`width:${puzzleBaseSize}px;height:${canvasHeight}px;transform:translateX(${
            styleWidth -
            sliderBaseSize -
            (puzzleBaseSize - sliderBaseSize) *
              ((styleWidth - sliderBaseSize) / (canvasWidth - sliderBaseSize))
          }px)`"
        ></canvas>
        <div :class="['loading-box_', { hide_: !loading }]">
          <div class="loading-gif_">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          :class="['info-box_', { show: infoBoxShow }, { fail: infoBoxFail }]"
        >
          {{ infoText }}
        </div>
        <div
          :class="['flash_', { show: isSuccess }]"
          :style="`transform: translateX(${
            isSuccess
              ? `${canvasWidth + canvasHeight * 0.578}px`
              : `-${canvasHeight * 0.578}px`
          }) skew(-30deg, 0);`"
        ></div>
        <img class="reset_" :src="resetSvg" @click="reset" />
      </div>
      <div class="auth-control_">
        <div class="range-box" :style="`height:${sliderBaseSize}px`">
          <div class="range-text">{{ sliderText }}</div>
          <div
            ref="rangeSlider"
            class="range-slider"
            :style="`width:${styleWidth}px`"
          >
            <div
              :class="['range-btn', { isDown: mouseDown }]"
              :style="`width:${sliderBaseSize}px`"
              @mousedown="onRangeMouseDown($event)"
              @touchstart="onRangeMouseDown($event)"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.verify-code {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.auth-box {
  position: absolute;
  top: 40%;
  left: 50%;
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  user-select: none;
  transition: opacity 200ms;
  transform: translate(-50%, -50%);

  .auth-body {
    position: relative;
    overflow: hidden;
    border-radius: 3px;

    .loading-box_ {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.8);
      opacity: 1;
      transition: opacity 200ms;

      &.hide_ {
        opacity: 0;
        pointer-events: none;

        .loading-gif_ {
          span {
            animation-play-state: paused;
          }
        }
      }

      .loading-gif_ {
        @keyframes load {
          0% {
            opacity: 1;
            transform: scale(1.3);
          }

          100% {
            opacity: 0.2;
            transform: scale(0.3);
          }
        }

        flex: none;
        height: 5px;
        line-height: 0;

        span {
          display: inline-block;
          width: 5px;
          height: 100%;
          margin-left: 2px;
          background-color: #888;
          border-radius: 50%;
          animation: load 1.04s ease infinite;

          &:nth-child(1) {
            margin-left: 0;
          }

          &:nth-child(2) {
            animation-delay: 0.13s;
          }

          &:nth-child(3) {
            animation-delay: 0.26s;
          }

          &:nth-child(4) {
            animation-delay: 0.39s;
          }

          &:nth-child(5) {
            animation-delay: 0.52s;
          }
        }
      }
    }

    .info-box_ {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 24px;
      overflow: hidden;
      font-size: 13px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      background-color: #83ce3f;
      opacity: 0;
      transition: all 200ms;
      transform: translateY(24px);

      &.show {
        opacity: 0.95;
        transform: translateY(0);
      }

      &.fail {
        background-color: #ce594b;
      }
    }

    .auth-canvas2_ {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 60px;
      height: 100%;
    }

    .auth-canvas3_ {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      opacity: 0;
      transition: opacity 600ms;

      &.show {
        opacity: 1;
      }
    }

    .flash_ {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      width: 30px;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.1);

      &.show {
        transition: transform 600ms;
      }
    }

    .reset_ {
      position: absolute;
      top: 2px;
      right: 2px;
      z-index: 12;
      width: 35px;
      height: auto;
      cursor: pointer;
      transition: transform 200ms;
      transform: rotate(0deg);

      &:hover {
        transform: rotate(-90deg);
      }
    }
  }

  .auth-control_ {
    .range-box {
      position: relative;
      width: 100%;
      margin-top: 20px;
      background-color: #eef1f8;
      border-radius: 3px;

      .range-text {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        overflow: hidden;
        font-size: 14px;
        color: #b7bcd1;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        transform: translate(-50%, -50%);
      }

      .range-slider {
        position: absolute;
        width: 50px;
        height: 100%;
        background-color: var(--primary-color);
        border-radius: 3px;

        .range-btn {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 100%;
          background-color: #fff;
          border-radius: 3px;
          box-shadow: 0 0 4px #ccc;
          cursor: pointer;

          & > div {
            width: 0;
            height: 40%;
            border: solid 1px var(--primary-color);
            transition: all 200ms;

            &:nth-child(2) {
              margin: 0 4px;
            }
          }

          &:hover,
          &.isDown {
            & > div:first-child {
              height: 0;
              border: solid 4px transparent;
              border-right-color: var(--primary-color);
            }

            & > div:nth-child(2) {
              height: 0;
              margin: 0 6px;
              border-width: 3px;
              border-right-color: var(--primary-color);
              border-radius: 3px;
            }

            & > div:nth-child(3) {
              height: 0;
              border: solid 4px transparent;
              border-left-color: var(--primary-color);
            }
          }
        }
      }
    }
  }
}
</style>
