<template>
  <router-link to="/home">首页</router-link>
  <router-link to="/hello">hello</router-link>
  <router-view></router-view>
  <!-- 全局导入，不用导入和注册组件，直接使用 -->
  <el-button type="primary">按钮</el-button>
  <el-input v-model="$store.state.count" placeholder="" />
</template>

<script lang="ts">
// 导入需要使用的组件
import { defineComponent } from 'vue'

import { ElButton } from 'element-plus'
export default defineComponent({
  components: {
    ElButton
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
