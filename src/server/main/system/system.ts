import stAxios from '@/server'
import { IDataType } from '@/server/types'

// 1. 获取用户信息
export function getPagelist(url: string, params: any) {
  return stAxios.post<IDataType>({
    url: url,
    // data: { offset: 0, size: 10, name: 'w' }
    data: params
  })
}
// 2. 删除数据
export function deleteDatalist(url: string) {
  stAxios.delete<IDataType>({
    url: url
  })
}
// 3. 新增数据
export function createDatalist(url: string, params: any) {
  stAxios.post<IDataType>({
    url: url,
    data: params
  })
}
// 4. 修改数据
export function updateDatalist(url: string, params: any) {
  console.log(url)
  console.log(params)
  stAxios.patch<IDataType>({
    url: url,
    data: params
  })
}
