<template>
  <div class="dashboard">
    <div class="row1">
      <el-row :gutter="5">
        <el-col :span="7">
          <st-card title="分类商品数量(饼图)">
            <st-echarts :options="options"></st-echarts>
          </st-card>
        </el-col>
        <el-col :span="10">
          <st-card title="不同城市商品销量"></st-card>
        </el-col>
        <el-col :span="7">
          <st-card title="分类商品数量(玫瑰图)"></st-card>
        </el-col>
      </el-row>
    </div>
    <div class="row2">
      <el-row :gutter="5">
        <el-col :span="12">
          <st-card title="分类商品数量(饼图)"></st-card>
        </el-col>
        <el-col :span="12">
          <st-card title="分类商品数量(饼图)"></st-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import StCard from '@/base-ui/card'
import StEcharts from '@/base-ui/echarts'
export default defineComponent({
  name: 'dashboard',
  components: {
    StCard,
    StEcharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getGoodsDataAction')
    const options = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    return { options }
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
