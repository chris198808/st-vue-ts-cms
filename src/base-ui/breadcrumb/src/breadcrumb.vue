<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="menu in breadcrumbs"
        :to="{ path: menu.path }"
        :key="menu.name"
        >{{ menu.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadCrumb } from '@/base-ui/breadcrumb'

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadCrumb[]>,
      require
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
