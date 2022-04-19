import stAxios from '@/server'
import { IDataType } from '@/server/types'

// 1. 获取用户信息
export function getPagelist(url: string, params: any) {
  console.log(params)
  return stAxios.post<IDataType>({
    url: url,
    // data: { offset: 0, size: 10, name: 'w' }
    data: params
  })
}
