import { createStore } from 'vuex'
import { IRootState } from './type'
import loginModule from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPagelist } from '@/server/main/system/system'
// 创建一个新的 store 实例
const store = createStore<IRootState>({
  state() {
    return {
      allDepartment: [],
      allRole: [],
      allMenu: []
    }
  },
  getters: {},
  mutations: {
    changeDepartmentList(state, list) {
      state.allDepartment = list
    },
    changeRoleList(state, list) {
      state.allRole = list
    },
    changeMenuList(state, list) {
      state.allMenu = list
    }
  },
  actions: {
    async getInitDataAction(context) {
      const departmentData = await getPagelist('/department/list', {
        offset: 0,
        size: 1000
      })
      const roleData = await getPagelist('/role/list', {
        offset: 0,
        size: 1000
      })
      const menuData = await getPagelist('/menu/list', {})
      // { list: departmentList } 给结构的对象起别名
      const { list: departmentList } = departmentData.data
      const { list: roleList } = roleData.data
      const { list: menuList } = menuData.data

      context.commit('changeDepartmentList', departmentList)
      context.commit('changeRoleList', roleList)
      context.commit('changeMenuList', menuList)
    }
  },
  modules: {
    // loginModule: loginModule es6简写，页面中调用模块也要写loginModule
    loginModule,
    system,
    dashboard
  }
})
// 初始化store防止用户刷新后vuex中的数据丢失
export function setupStore() {
  store.dispatch('loginModule/localStore')
  store.dispatch('getInitDataAction')
  store.dispatch('dashboard/getGoodsDataAction')
}
export default store
