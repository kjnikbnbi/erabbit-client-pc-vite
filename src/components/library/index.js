import defaultImg from '@/assets/images/200.png'
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
// const importFn = require.context('./', false, /\.vue$/)
const importFn = import.meta.globEager('./*.vue')
export default {
  install (app) {
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // // app.component(XtxBreadItem.name, XtxBread)
    // importFn.keys().forEach(path => {
    //   const component = importFn(path).default
    //   app.component(component.name, component)
    // })
    for (const path in importFn) {
      const componentName = importFn[path].default.name
      app.component(componentName, importFn[path].default)
   }
    // 定义指令
    defineDirective(app)
  }
}
const defineDirective = (app) => {
  // 图片懒加载
  app.directive('lazy', {
    mounted (el, binding) {
      // 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          // 把指令的值赋值给el的src属性
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
