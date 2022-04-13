<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
// defineComponent()函数作用：vue文件类型限制和推导
import { defineComponent } from 'vue'
// import login from '@/views/login/login.vue'

export default defineComponent({
  components: {
    // login
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
