import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { IUserData, IPayload } from './type'
import { getPagelist } from '@/server/main/system/system'

const systemModule: Module<IUserData, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      userslist: [],
      userscounts: 0,
      departmentlist: [],
      departmentcounts: 0,
      rolelist: [],
      rolecounts: 0,
      goodslist: [],
      goodscounts: 0,
      menulist: [],
      menucounts: 0
    }
  },
  mutations: {
    changeUserslist(state, list) {
      state.userslist = list
    },
    changeUserscounts(state, totalCount) {
      state.userscounts = totalCount
    },
    changeDepartmentlist(state, list) {
      state.departmentlist = list
    },
    changeDepartmentcounts(state, totalCount) {
      state.departmentcounts = totalCount
    },
    changeRolelist(state, list) {
      state.rolelist = list
    },
    changeRolecounts(state, totalCount) {
      state.rolecounts = totalCount
    },
    changeGoodslist(state, list) {
      state.goodslist = list
    },
    changeGoodscounts(state, totalCount) {
      state.goodscounts = totalCount
    },
    changeMenulist(state, list) {
      state.menulist = list
    },
    changeMenucount(state, list) {
      state.menulist = list
    }
  },
  getters: {
    getDataList(state) {
      return (pageName: string) => {
        // state.userlist
        return (state as any)[`${pageName}list`]
      }
    },
    getDataCounts(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}counts`]
      }
    }
  },
  actions: {
    async getPagelistAction(context, payload: IPayload) {
      const pageName = payload.pageName
      const url = `/${pageName}/list`
      const params = payload.queryParameters
      // 1. 获取相关栏目列表和数量
      const datalists = await getPagelist(url, params)
      const { list, totalCount } = datalists.data
      // user->User
      const currentPageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      context.commit(`change${currentPageName}list`, list)
      context.commit(`change${currentPageName}counts`, totalCount)
    }
  }
}
export default systemModule
