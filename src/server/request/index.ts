import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
/**
 * 对实例对象中config属性的扩展，增加了一个 STInterceptors 类型
 */
interface STInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}
// 扩展原先的config对象可以添加 interceptor 属性
interface STRequestConfig extends AxiosRequestConfig {
  // interceptors参数可以不传
  stInterceptors?: STInterceptors
}

class STAxios {
  instance: AxiosInstance
  stInterceptors?: STInterceptors
  constructor(config: STRequestConfig) {
    // 如果需要可实现多个实例对象
    this.instance = axios.create(config)
    this.stInterceptors = config.stInterceptors

    // 1.给当前实例添加所有拦截器
    this.instance.interceptors.request.use(
      // ?.可选链 拦截器存在，执行后面的方法
      this.stInterceptors?.requestInterceptor,
      this.stInterceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.stInterceptors?.responseInterceptor,
      this.stInterceptors?.responseInterceptorCatch
    )
    // 2.给所有实例添加所有拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有拦截器，并且请求拦截成功~')
        return config
      },
      (err) => {
        console.log('所有实例都有拦截器，并且请求拦截失败~')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有拦截器，并且响应拦截成功~')
        return res
      },
      (err) => {
        console.log('所有实例都有拦截器，并且响应拦截失败~')
        return err
      }
    )
  }
  request(config: STRequestConfig) {
    // 3.1 对单个请求的拦截处理
    if (config.stInterceptors?.requestInterceptor) {
      // 将执行了的requestInterceptor的返回值赋值给config
      config = config.stInterceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      // 3.2 对单个响应的拦截处理
      if (config.stInterceptors?.responseInterceptor) {
        config = config.stInterceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}
export default STAxios
