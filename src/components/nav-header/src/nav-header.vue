<template>
  <div class="nav-header">
    <div class="fold" @click="changFold">
      <template v-if="fold">
        <el-icon><fold /> </el-icon>
      </template>
      <template v-else>
        <el-icon><expand /> </el-icon>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['changeFold'],
  setup(props, { emit }) {
    const fold = ref(false)
    /**
     * 向父组件main.vue 发射一个事件 携带参数 flod ,目的有两个。
     * 1. 父组件像是一个中介，将flod的状态，传给 nav-menu, 控制菜单折叠
     * 2. 父组件可以控制左侧菜单的宽度
     */
    const changFold = () => {
      fold.value = !fold.value
      emit('changeFold', fold.value)
    }
    return {
      fold,
      changFold
    }
  }
})
</script>

<style lang="less" scoped>
.fold {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
