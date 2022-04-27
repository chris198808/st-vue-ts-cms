<template>
  <div class="line-echart">
    <st-echarts :options="options" />
  </div>
</template>

<script lang="ts" setup>
import StEcharts from '@/base-ui/echarts'
import { computed, defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    name: string[]
    value: number[]
  }>(),
  {}
)
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.name
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分类销量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.value
      }
    ]
  }
})
</script>

<style scoped></style>
