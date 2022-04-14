<template>
  <div class="nav-header">
    <div class="header-left" @click="changFold">
      <template v-if="fold">
        <el-icon class="fold"><fold /> </el-icon>
      </template>
      <template v-else>
        <el-icon><expand class="fold" /> </el-icon>
      </template>
      <span class="crumbs">面包屑/二级</span>
    </div>

    <div class="header-right"><user-info /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'

export default defineComponent({
  components: {
    UserInfo
  },
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
.nav-header {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .header-left {
    display: flex;
    align-items: center;
    .fold {
      display: inline-block;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    .crumbs {
      padding-left: 8px;
    }
  }
  .header-right {
  }
}
</style>
