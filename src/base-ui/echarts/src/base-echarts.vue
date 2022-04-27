<template>
  <div class="base-echarts">
    <div ref="divRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hooks/use-echarts'
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
  const { setOption } = useEcharts(divRef.value!)

  watchEffect(() => {
    setOption(props.options)
  })
})
</script>

<style scoped></style>
