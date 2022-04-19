<template>
  <div class="department">
    <page-search :searchConfig="searchConfig" />
    <page-content
      pageName="department"
      :tableConfig="tableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import searchConfig from './config/search.config'
import tableConfig from './config/table.config'

import PageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    pageContent
  },
  setup() {
    return {
      searchConfig,
      tableConfig
    }
  }
})
</script>

<style lang="less" scoped></style>
