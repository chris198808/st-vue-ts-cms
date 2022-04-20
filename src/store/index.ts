import { createStore } from 'vuex'
import { IRootState } from './type'
import loginModule from './login/login'
import system from './main/system/system'
import { getPagelist } from '@/server/main/system/system'
// 创建一个新的 store 实例
const store = createStore<IRootState>({
  state() {
    return {
      allDepartment: [],
      allRole: []
    }
  },
  getters: {},
  mutations: {
    changeDepartmentList(state, list) {
      state.allDepartment = list
    },
    changeRoleList(state, list) {
      state.allRole = list
    }
  },
  actions: {
    async getDepartmentAndRoleDataAction(context) {
      const departmentData = await getPagelist('/department/list', {
        offset: 0,
        size: 1000
      })
      const roleData = await getPagelist('/role/list', {
        offset: 0,
        size: 1000
      })
      // { list: departmentList } 给结构的对象起别名
      const { list: departmentList } = departmentData.data
      const { list: roleList } = roleData.data

      context.commit('changeDepartmentList', departmentList)
      context.commit('changeRoleList', roleList)
    }
  },
  modules: {
    // loginModule: loginModule es6简写，页面中调用模块也要写loginModule
    loginModule,
    system
  }
})
// 初始化store防止用户刷新后vuex中的数据丢失
export function setupStore() {
  store.dispatch('loginModule/localStore')
  store.dispatch('getDepartmentAndRoleDataAction')
}
export default store
