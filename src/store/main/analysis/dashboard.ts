import { Module } from 'vuex'
import { IRootState } from '../../type'
import { IDashBoardState } from './type'
import {
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsAddressSale,
  getGoodsCategoryFavor
} from '@/server/main/analysis/dashboard'
const dashboard: Module<IDashBoardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsAddressSale: [],
      goodsCategoryFavor: []
    }
  },
  getters: {},
  mutations: {
    changeGoodsCategoryCount(state, list) {
      state.goodsCategoryCount = list
    },
    changeGoodsCategorySale(state, list) {
      state.goodsCategorySale = list
    },
    changeGoodsAddressSale(state, list) {
      state.goodsAddressSale = list
    },
    changeGoodsCategoryFavor(state, list) {
      state.goodsCategoryFavor = list
    }
  },
  actions: {
    async getGoodsDataAction(context) {
      // 每个分类商品的个数
      const goodsCategoryCount = await getGoodsCategoryCount(
        '/goods/category/count'
      )
      context.commit('changeGoodsCategoryCount', goodsCategoryCount.data)

      // 每个分类商品的销量
      const goodsCategorySale = await getGoodsCategorySale(
        '/goods/category/sale'
      )
      context.commit('changeGoodsCategorySale', goodsCategorySale.data)

      // 不同城市的销售数据
      const goodsAddressSale = await getGoodsAddressSale('/goods/address/sale')
      context.commit('changeGoodsAddressSale', goodsAddressSale.data)

      // 每个分类商品的收藏
      const goodsCategoryFavor = await getGoodsCategoryFavor(
        '/goods/category/favor'
      )
      context.commit('changeGoodsCategoryFavor', goodsCategoryFavor.data)
    }
  }
}
export default dashboard
