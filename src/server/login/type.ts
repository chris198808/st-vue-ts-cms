export interface IAccountData {
  name: string
  password: string
}
export interface IUserLoginData {
  id: number
  name: string
  token: string
}
export interface IUserLoginMess<T = any> {
  code: number
  data: T
}
