import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface STRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface STRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: STRequestInterceptors<T>
  showLoading?: boolean
}
