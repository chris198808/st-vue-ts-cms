// utils->map-menu.ts 工具文件
// RouteRecordRaw 路由的类型
import { RouteRecordRaw } from 'vue-router'
import { IBreadCrumb } from '@/base-ui/breadcrumb'
let firstPage: any = null
// (1) 根据菜单动态匹配路由
function mapMenuToRouter(usermenu: any[]): RouteRecordRaw[] {
  /**
   * 主要解决：usermenu -> url 和 路由path 之间的一个映射关系
   * 1. 拿到router/main下的所有路径
   * 2. 拿到usermenu里的url和routerAll里边的path进行比较，如果存在保存至当前角色下的路由数组
   */
  const menusRoutes: RouteRecordRaw[] = []

  // 1.先去加载当前项目下的所有routes
  /**
   * 1.1 require.context() webpack中的方法
   * 1.2 context()扫描webpack执行的上下文环境
   * 1.3 第一个参数，扫描的指定文件
   * 1.4 是否递归(deep)扫描
   * 1.5 正则表达式 / /, 符合包含.ts的文件路径
   *
   * 2. routerFile.keys() 使用这个方法，从对象中获取真正的路径,返回一个string[]
   *
   * 3. 拼接路径
   */
  const routesAll: RouteRecordRaw[] = []
  const routerFile = require.context('../router/main', true, /\.ts/)
  routerFile.keys().forEach((path) => {
    /**
     * console.log(routerPath) // './analysis/dashboard/dashboard.ts'
     * commonjs规范，require支持动态引入，也就是require(${path}/xx.js)
     */
    /**
     * 先用split('.')方法将字符串以"."开割形成一个字符串数组，然后再通过索引[1]取出所得数组中的第二个元素的值。
     * 如：['', '/analysis/dashboard/dashboard', 'ts']
     */
    // 将路由配置文件动态导入
    const route = require('../router/main' + path.split('.')[1])
    routesAll.push(route.default)
  })

  // 2. 根据菜单获取要填加的routes
  // usermenus中的type===2 包含真正需要添加的url， type === 1 需要遍历其子模块
  const _recurseMenu = (usermenu: any[]) => {
    for (const item of usermenu) {
      if (item.type === 2) {
        // 拿usermenu中的url和路由中的path做比较,find一次只会返回一个成立的数组元素
        const route = routesAll.find((routePath) => {
          return routePath.path === item.url
        })
        // {path: '/main/analysis/overview', name: 'overview', children: Array(0), component: ƒ}
        // console.log(route)
        if (route) {
          menusRoutes.push(route)
        }

        if (!firstPage) {
          firstPage = item.url
        }
      } else {
        _recurseMenu(item.children)
      }
    }
  }

  _recurseMenu(usermenu)
  return menusRoutes
}
// (2) 根据当前path匹配查找到menu
function getMenuFormPath(
  usermenu: any[],
  currentPath: string,
  breadcrumb?: IBreadCrumb[]
): any {
  // 为什么不能用forEach，他的返回值是undefined
  for (const menu of usermenu) {
    if (menu.type === 1) {
      const findMenu = getMenuFormPath(menu.children ?? [], currentPath)
      if (findMenu) {
        // 添加面包屑导航，父组件及子组件
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// (3) 解决main匹配不到组件问题，遍历动态路由时拿到第一个遍历出来的url，直接使用动态路由匹配函数
// (4) 根据当前path匹配查找menu及父级menu
function getBreadCrumb(usermenu: any[], currentPath: string): any {
  const breadCrumb: IBreadCrumb[] = []
  getMenuFormPath(usermenu, currentPath, breadCrumb)
  return breadCrumb
}
// (5) 获取当前用户所有的按钮权限
function getBtnPermission(usermenu: any[]) {
  const permission: string[] = []
  function _recursePerssion(usermenu: any[]) {
    for (const item of usermenu) {
      if (item.type === 1 || item.type === 2) {
        _recursePerssion(item.children ?? [])
      } else if (item.type === 3 && item.permission != null) {
        permission.push(item.permission)
      }
    }
  }
  _recursePerssion(usermenu)
  return permission
}
export {
  getMenuFormPath,
  mapMenuToRouter,
  getBreadCrumb,
  getBtnPermission,
  firstPage
}
