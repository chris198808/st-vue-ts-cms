<template>
  <div class="pie-echart">
    <st-echarts :options="options"></st-echarts>
  </div>
</template>

<script lang="ts" setup>
import StEcharts from '@/base-ui/echarts'
import { computed, defineProps, withDefaults } from 'vue'
import { IDataType } from './type'
const props = withDefaults(
  defineProps<{
    name: string
    option: IDataType[]
  }>(),
  {
    name: ''
  }
)
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'horizontal',
    //   left: 'left'
    // },
    series: [
      {
        name: props.name,
        type: 'pie',
        radius: '50%',
        data: props.option,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
