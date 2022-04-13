import { Module } from 'vuex'
import router from '@/router'
import localCache from '@/utils/localCache'
import { IloginState } from './type'
import { IRootState } from '../type'
import {
  accountLoginRequest,
  getUserInfo,
  getUserRoles
} from '@/server/login/login'
import { IAccountData } from '@/server/login/type'
const loginModule: Module<IloginState, IRootState> = {
  // 开启模块命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userinfo: {},
      usermenus: []
    }
  },
  getters: {},
  mutations: {
    saveToken(state, token) {
      state.token = token
    },
    saveUserInfo(state, userinfo) {
      state.userinfo = userinfo
    },
    saveUserMenus(state, usermenus) {
      state.usermenus = usermenus
    },
    initToken(state, token) {
      state.token = token
    },
    initUserinfo(state, userinfo) {
      state.userinfo = userinfo
    },
    initUserMenus(state, usermenus) {
      state.usermenus = usermenus
    }
  },
  actions: {
    /**
     * 使用异步函数调用原因：
     * 1. 异步函数按照同步的执行过程来执行，
     * 先做用户登录请求，再根据登录成功后得到的token来做用户信息请求，再根据用户信息的id和角色来做对应的菜单信息请求，循序不能出错
     * 2. async函数和await都会返回promise
     */
    async accountLoginAction(context, payload: IAccountData) {
      // 1.发送用户登录请求，请求成功后返回用户相关信息及token
      const accountLoginMess = await accountLoginRequest(payload)
      const { id, token } = accountLoginMess.data
      // 1.1收集用户相关信息到本地
      if (accountLoginMess) {
        localCache.setLocalStorage('id', id)
        localCache.setLocalStorage('token', token)
      }
      // 1.2将数据保存至vuex
      context.commit('saveToken', token)

      // 2.发送用户信息请求，请求成功后返回当前用户所有信息
      const userinfo = await getUserInfo(id)
      // 2.1将数据保存至本地
      localCache.setLocalStorage('userinfo', userinfo.data)
      // console.log(userinfo)
      // 2.2将数据保存至vuex
      context.commit('saveUserInfo', userinfo.data)

      // 3.发送用户角色菜单请求，请求成功后返回用户对应角色下的所有菜单
      const usermenus = await getUserRoles(id)
      // 3.1将数据保存至本地
      localCache.setLocalStorage('usermenus', usermenus.data)
      // 3.2将数据保存至vuex
      context.commit('saveUserMenus', usermenus.data)

      // 4.跳转至首页
      router.push('/main')
    },
    // 防止用户刷新vuex数据丢失，每次刷新main.ts中初始化数据
    localStore(context) {
      const token = localCache.getLocalStorage('token')
      if (token) {
        context.commit('initToken', token)
      }
      const userinfo = localCache.getLocalStorage('userinfo')
      if (userinfo) {
        context.commit('initUserinfo', userinfo)
      }
      const usermenus = localCache.getLocalStorage('usermenus')
      if (usermenus) {
        context.commit('initUserMenus', usermenus)
      }
    }
  }
}

export default loginModule
