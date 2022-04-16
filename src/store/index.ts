import { createStore } from 'vuex'
import { IRootState } from './type'
import loginModule from './login/login'
import system from './main/system/system'
// 创建一个新的 store 实例
const store = createStore<IRootState>({
  state() {
    return {
      count: 250
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // loginModule: loginModule es6简写，页面中调用模块也要写loginModule
    loginModule,
    system
  }
})
// 初始化store防止用户刷新后vuex中的数据丢失
export function setupStore() {
  store.dispatch('loginModule/localStore')
}
export default store
