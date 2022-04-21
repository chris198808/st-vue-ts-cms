<template>
  <div class="overview">
    <h2>overview</h2>
    <div ref="divRef" :style="{ width: '500px', height: '300px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    // 基于准备好的dom，初始化echarts实例
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // 第二个参数：theme-主题，dark。第三个参数：渲染器，默认canvas，设置 SVG
      // divRef.value! 需要设置非空断言，要不ts会报错
      const chart = echarts.init(divRef.value!, { renderer: 'svg' })
      // 设置选项
      const option = {
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
      // 绘制图表
      chart.setOption(option)
    })

    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
