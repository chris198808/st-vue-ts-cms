<template>
  <div class="base-echarts">
    <div ref="divRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted, defineProps, withDefaults } from 'vue'
import { EChartsOption } from 'echarts'
// script setup 下面定义props及默认值
const props = withDefaults(
  defineProps<{ options: EChartsOption; width?: string; height?: string }>(),
  {
    width: '100%',
    height: '200px'
  }
)
const divRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(divRef.value!)
  console.log(echartInstance)

  echartInstance.setOption(props.options)
})
</script>

<style scoped></style>
