<template>
  <div class="dashboard">
    <div class="row1">
      <el-row :gutter="5">
        <el-col :span="7">
          <st-card title="分类商品数量(饼图)">
            <pie-echart :option="pieOption" name="分类商品数量"></pie-echart>
          </st-card>
        </el-col>
        <el-col :span="10">
          <st-card title="不同城市商品销量">
            <map-echart :mapData="mapData" />
          </st-card>
        </el-col>
        <el-col :span="7">
          <st-card title="分类商品数量(玫瑰图)">
            <rose-echart :option="pieOption" name="分类商品数量"></rose-echart>
          </st-card>
        </el-col>
      </el-row>
    </div>
    <div class="row2">
      <el-row :gutter="5">
        <el-col :span="12">
          <st-card title="分类商品销量">
            <line-echart :name="names" :value="values"
          /></st-card>
        </el-col>
        <el-col :span="12">
          <st-card title="分类商品数量(饼图)">
            <bar-echart :name="barNames" :value="barValues" />
          </st-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import StCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'
export default defineComponent({
  name: 'dashboard',
  components: {
    StCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getGoodsDataAction')
    // 1.获取数据
    const goodsCategoryCounts = computed(() => {
      return store.state.dashboard.goodsCategoryCount
    })
    const goodsCategorySales = computed(() => {
      return store.state.dashboard.goodsCategorySale
    })
    const goodsCategoryFavors = computed(() => {
      return store.state.dashboard.goodsCategoryFavor
    })
    const goodsAddressSales = computed(() => {
      return store.state.dashboard.goodsAddressSale
    })
    // 2.根据option所属数据类型拼接数据
    const pieOption = goodsCategoryCounts.value.map((element: any) => {
      return { name: element.name, value: element.goodsCount }
    })
    const names = []
    const values = []
    for (const item of goodsCategorySales.value) {
      names.push(item.name)
      values.push(item.goodsCount)
    }
    const barNames = []
    const barValues = []
    for (const item of goodsCategoryFavors.value) {
      barNames.push(item.name)
      barValues.push(item.goodsFavor)
    }
    const mapData = goodsAddressSales.value.map((item: any) => {
      return { name: item.address, value: item.count }
    })
    return { pieOption, names, values, barNames, barValues, mapData }
  }
})
</script>

<style lang="less" scoped>
.dashboard {
  width: 100%;
  .row1 {
    margin: 10px 2px;
  }
  .row2 {
    margin: 10px 2px;
  }
}
</style>
