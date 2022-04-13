// -> server/index.ts

import STAxios from './request'
import { BASE_URL } from './request/config'
import localCache from '@/utils/localCache'
// 区分类和类的实例，类是一堆类的描述，而真正能使用的是类的实例。类似：组件和组件实例。
// 对 STAxios类的基础实现
export default new STAxios({
  // 每个实例可以有自己的 BASE_URL, BASE_NAME
  baseURL: BASE_URL,
  stInterceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getLocalStorage('token')
      // 拦截token
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` }
      }
      // console.log('实例对象拦截请求成功')
      return config
    },
    responseInterceptor: (res) => {
      // console.log('实例对象拦截响应成功')
      return res
    }
  }
})
