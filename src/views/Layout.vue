<template>
<!-- 顶部通知栏 -->
<AppNavbar/>
<!-- 吸顶头部 -->
<AppHeaderSticky/>
<!-- 头部组件 -->
<AppHeader/>
<!-- 内容容器 -->
<div class="main">
  <!-- 二级路由 -->
  <RouterView />
</div>
<!-- 底部组件 -->
<AppFooter/>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import AppFooter from '@/components/app-footer.vue'
import { useStore } from 'vuex'
export default {
  name: 'ex-Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
