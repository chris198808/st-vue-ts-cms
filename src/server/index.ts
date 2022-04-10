import STAxios from './request'
import { BASE_URL, BASE_NAME } from './request/config'
// 对 STAxios类的基础实现
export default new STAxios({
  // 每个实例可以有自己的 BASE_URL, BASE_NAME
  baseURL: BASE_URL,
  url: '/get',
  params: {
    name: BASE_NAME
  },
  stInterceptors: {
    requestInterceptor: (config) => {
      console.log('实例对象拦截请求成功')
      return config
    },
    responseInterceptor: (res) => {
      console.log('实例对象拦截响应成功')
      return res
    }
  }
})
