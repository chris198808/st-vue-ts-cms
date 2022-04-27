import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'
export default function (el: HTMLElement) {
  // 地图注册
  echarts.registerMap('china', chinaMapData)
  const echartInstance = echarts.init(el)
  const setOption = (option: echarts.EChartsOption) => {
    echartInstance.setOption(option)
  }
  // 更新数据时，可以先调用一次，自动适配一下图表大小
  const updateResize = () => {
    echartInstance.resize()
  }
  // 根据容器大小自动缩放图表
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOption,
    updateResize
  }
}
