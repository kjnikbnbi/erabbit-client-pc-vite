<template>
  <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade: index===i}">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span v-for="(item,i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onUnmounted, watch } from '@vue/runtime-core'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 间隔时长
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    const index = ref(0)
    // 自动播放
    let timer = null
    const autoPlayFn = () => {
      // 防止定制起重复添加
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 监听sliders数据变化，如果有数据且autoPlay是true
    watch(() => props.sliders, (newVal) => {
      if (newVal.length && props.autoPlay) {
        autoPlayFn()
      }
    }, { immediate: true })
    // 鼠标进入暂停 离开开启
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 点击切换
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex > (props.sliders.length - 1)) {
        index.value = 0
        return
      }
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      index.value = newIndex
    }
    // 清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
