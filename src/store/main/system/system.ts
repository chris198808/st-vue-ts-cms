import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { IUserData, IPaload } from './type'
import { getPagelist } from '@/server/main/system/system'

const systemModule: Module<IUserData, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      userlist: [],
      usercounts: 0
    }
  },
  getters: {},
  mutations: {
    changeUserlist(state, list) {
      state.userlist = list
    },
    changeUsercounts(state, totalCount) {
      state.usercounts = totalCount
    }
  },
  actions: {
    async getPagelistAction(context, payload: IPaload) {
      // 1. 获取用户列表和数量
      const userlists = await getPagelist(payload)
      const { list, totalCount } = userlists.data
      context.commit('changeUserlist', list)
      context.commit('changeUsercounts', totalCount)
    }
  }
}
export default systemModule
