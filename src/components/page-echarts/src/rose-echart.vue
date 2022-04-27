<template>
  <div class="rose-echart">
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
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        // dataView: { show: true, readOnly: false },
        // restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: props.name,
        type: 'pie',
        radius: [18, 60],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 3
        },
        data: props.option
      }
    ]
  }
})
</script>

<style scoped></style>
