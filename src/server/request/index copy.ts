import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
/**
 * 2.对实例对象中config属性的扩展，增加了一个 STInterceptors 类型
 */
//  <T = AxiosResponse> 泛型默认值为 AxiosResponse
interface STInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 3.扩展原先的config对象可以添加 interceptor，isShow 属性
interface STRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // interceptors参数可以不传
  stInterceptors?: STInterceptors<T>
  isShow?: boolean
}
// 1.封装自己的Axios类
class STAxios {
  instance: AxiosInstance
  stInterceptors?: STInterceptors
  // 控制loading的显示隐藏
  loading?: any
  isShow?: boolean
  constructor(config: STRequestConfig) {
    // 如果需要可实现多个实例对象
    this.instance = axios.create(config)
    this.stInterceptors = config.stInterceptors
    // config.isShow ?? true 空值合并运算符， 如果 config.isShow 为空设置默认值为 true
    this.isShow = config.isShow ?? true

    // 4.1.给当前实例添加所有拦截器
    this.instance.interceptors.request.use(
      // ?.可选链 拦截器存在，执行后面的方法
      this.stInterceptors?.requestInterceptor,
      this.stInterceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.stInterceptors?.responseInterceptor,
      this.stInterceptors?.responseInterceptorCatch
    )
    // 4.2.给所有实例添加所有拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 请求数据过程中显示 loading
        if (this.isShow) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        // console.log('所有实例都有拦截器，并且请求拦截成功~')
        return config
      },
      (err) => {
        // console.log('所有实例都有拦截器，并且请求拦截失败~')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 请求成功关闭 loading
        // ?. es11 可选链， 如果前面有值，执行后面操作
        this.loading?.close()
        // console.log('所有实例都有拦截器，并且响应拦截成功~')
        // console.log('直接返回有效信息data: ' + res.data)
        return res.data
      },
      (err) => {
        // if (err.data.status === '404') {
        //   console.log('没有当前页面~')
        // }
        // console.log('所有实例都有拦截器，并且响应拦截失败~')
        return err
      }
    )
  }
  request<T>(config: STRequestConfig<T>): Promise<T> {
    // request(config: STRequestConfig) {
    return new Promise((resolve, reject) => {
      // 4.3.1 对单个请求的拦截处理
      if (config.stInterceptors?.requestInterceptor) {
        // 将执行了的requestInterceptor的返回值赋值给config
        config = config.stInterceptors.requestInterceptor(config)
      }
      // 4.3 某个实例的单独请求拦截
      this.instance
        // request<T = any, R = AxiosResponse<T>, D = any> 默认修改的是第二个泛型
        .request<any, T>(config)
        .then((res) => {
          // 4.3.2 对单个响应的拦截处理
          if (config.stInterceptors?.responseInterceptor) {
            res = config.stInterceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 5. 其他方法封装
  get<T>(config: STRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T>(config: any): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }
  delete<T>(config: STRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }
  patch<T>(config: STRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }
}
export default STAxios
