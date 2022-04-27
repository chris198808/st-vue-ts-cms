<template>
  <div class="bar-echart">
    <st-echarts :options="options" />
  </div>
</template>

<script lang="ts" setup>
import StEcharts from '@/base-ui/echarts'
import * as echarts from 'echarts'
import { computed, defineProps, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{ name: string[]; value: number[] }>(),
  {}
)

const options = computed(() => {
  return {
    xAxis: {
      data: props.name,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.value
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
