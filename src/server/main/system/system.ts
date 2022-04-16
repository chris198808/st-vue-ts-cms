import stAxios from '@/server'
import { IPaload, IUserServerData } from '@/store/main/system/type'

// 1. 获取用户信息
export function getPagelist(payload: IPaload) {
  return stAxios.post<IUserServerData>({
    url: payload.url,
    params: payload.queryParameters
  })
}
