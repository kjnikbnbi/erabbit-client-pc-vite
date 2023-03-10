import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，其他地方不是通过axios发请求的的地方用基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})
// 请求拦截器
instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
instance.interceptors.response.use(res => res.data, err => {
  if (err.response && err.response.status === 401) {
    store.commit('user/setUser', {})
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})
// 请求工具函数
export default (url, method, submitDta) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitDta
  })
}
