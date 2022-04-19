import stAxios from '@/server'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '@/server/types'
enum LoginRequest {
  ACCOUNT_LOGIN_URL = '/login',
  USERINFO_URL = '/users/', //users/1
  USERROLE_URL = '/role/' //role/1/menu
}
// 1. 根据用户名，密码请求相关数据
export function accountLoginRequest(payload: IAccount) {
  return stAxios.post<IDataType<ILoginResult>>({
    url: LoginRequest.ACCOUNT_LOGIN_URL,
    data: payload,
    showLoading: false
  })
}
// 2.根据用户id和token，得到当前用户所有信息
export function getUserInfo(id: number) {
  return stAxios.get<IDataType>({
    url: LoginRequest.USERINFO_URL + id,
    showLoading: false
  })
}
// 3.根据用户id和token，获得当前角色的菜单信息
export function getUserRoles(id: number) {
  return stAxios.get<IDataType>({
    url: LoginRequest.USERROLE_URL + id + '/menu',
    showLoading: false
  })
}
