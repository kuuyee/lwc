<script setup lang="ts">
// import type { PropType, CSSProperties } from 'vue'
import { createBEM } from '@gmok/utils'
import LoginForm from './LoginForm.vue'

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 介绍
  slogan: {
    type: String,
    default: '',
  },
  // 描述
  description: {
    type: String,
    default: '',
  },
  loginFunc: {
    type: Function,
    default: null,
  },
})

const [bem] = createBEM('login')
</script>

<template>
  <div :class="bem()">
    <div :class="bem('header')">
      <div :class="bem('title')">
        {{ props.title }}
      </div>
    </div>
    <div :class="bem('slogan')">
      <img :alt="props.title" src="./assets/box-bg.svg" class="w-1/2" />
      <div class="mt-10 font-medium text-white">
        <span class="inline-block mt-4 text-2xl">{{ props.slogan }}</span>
      </div>
      <div class="mt-4 font-normal text-white text-md">
        {{ props.description }}
      </div>
    </div>
    <div :class="bem('form')">
      <LoginForm :loginFunc="props.loginFunc" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100%;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(./assets/bg.svg);
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;
    content: '';
  }

  &__header {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 80px;
    padding: 0 100px;
    text-align: left;
    cursor: pointer;
  }

  &__slogan {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-left: 50px;
    margin-right: 40px;
  }

  &__title {
    padding-top: 30px;
    margin-left: 8px;
    font-size: 24px;
    color: var(--text-color-base);
  }

  &__form {
    position: relative;
    z-index: 2;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
}
</style>
