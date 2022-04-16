<template>
  <div class="nav-header">
    <div class="header-left">
      <span class="fold" @click="changFold">
        <template v-if="fold">
          <el-icon class="fold"><fold /> </el-icon>
        </template>
        <template v-else>
          <el-icon><expand class="fold" /> </el-icon>
        </template>
      </span>
      <span class="crumbs">
        <s-t-breadcrumb :breadcrumbs="breadcrumbs" />
      </span>
    </div>

    <div class="header-right"><user-info /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getBreadCrumb } from '@/utils/map-menu'
import STBreadcrumb from '@/base-ui/breadcrumb'
import UserInfo from './user-info.vue'

export default defineComponent({
  components: {
    UserInfo,
    STBreadcrumb
  },
  emits: ['changeFold'],
  setup(props, { emit }) {
    const breadcrumbs = computed(() => {
      const store = useStore()
      const route = useRoute()
      const usermenu = store.state.loginModule.usermenus
      const currentPate = route.path
      return getBreadCrumb(usermenu, currentPate)
    })
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
      breadcrumbs,

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
      width: 18px;
      height: 18px;
      vertical-align: middle;
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
