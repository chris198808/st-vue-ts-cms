export interface IUserData {
  userslist: any[]
  userscounts: number
  departmentlist: any[]
  departmentcounts: number
  rolelist: any[]
  rolecounts: number
  goodslist: any[]
  goodscounts: number
  menulist: any[]
  menucounts: number
}
export interface IPayload {
  pageName: string
  queryParameters: object
}
export interface IUserServerData<T = any> {
  code: number
  data: T
}
