<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()" :class="{ active:visible }">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
      <span class="ellipsis" v-for="item in currList" :key="item.code">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { ref, computed } from 'vue'

export default {
  name: 'XtxCity',
  setup () {
    // 显示隐藏
    const visible = ref(false)
    const allCityData = ref([])
    const loading = ref(false)
    // 提供打开关闭
    const open = () => {
      visible.value = true
      // 获取地区数据
      loading.value = true
      getCityData().then(data => {
        allCityData.value = data
        loading.value = false
      })
    }
    const close = () => {
      visible.value = false
    }
    // 提供一个切换函数给select
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击组件外部关闭对话框
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })
    // 获取当前需要显示的地区列表
    const currList = computed(() => {
      // 默认省级列表
      const list = allCityData.value
      return list
    })
    return { visible, toggle, target, loading, currList }
  }
}
// 获取地址数据
const getCityData = () => {
  // 没有缓存发请求
  // 有缓存使用本地缓存
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}
</script>

<style lang="less" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}</style>
