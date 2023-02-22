// 提供复用逻辑
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/**
 * 数据懒加载
 * @param {Element} target - Dom对象
 * @param {Function} apiFn - API函数
 */
export const useLazyData = (apiFn) => {
  const result = ref([])
  const target = ref(null)
  // stop停止观察
  const { stop } = useIntersectionObserver(
    // 监听目标元素
    target,
    ([{ isIntersecting }], observerElement) => {
      // 是否进入可是去
      if (isIntersecting) {
        stop()
        // 调用API函数获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置懒加载触发条件
    {
      threshold: 0
    }
  )
  return { result, target }
}
