<template>
  <div class="department">
    <st-form v-bind="searchConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StForm from '@/base-ui'
import searchConfig from './config/search.config'
export default defineComponent({
  name: 'department',
  components: {
    StForm
  },
  setup() {
    searchConfig

    return {
      searchConfig
    }
  }
})
</script>

<style lang="less" scoped></style>
