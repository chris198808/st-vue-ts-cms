<template>
  <div class="user">
    <page-search
      :searchConfig="searchConfig"
      @handleResetClick="handleReset"
      @handleSearchClick="handleSearch"
    />
    <page-content
      :tableConfig="tableConfig"
      pageName="users"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import searchConfig from './config/search.config'
import tableConfig from './config/table.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const pageContentRef = ref<InstanceType<typeof PageContent>>()
    // 向page-content页面发送搜索的数据
    const handleReset = () => {
      pageContentRef.value?.getPageDataLists()
    }
    const handleSearch = (queryParams: any) => {
      pageContentRef.value?.getPageDataLists(queryParams)
    }
    return {
      searchConfig,
      tableConfig,
      pageContentRef,
      handleReset,
      handleSearch
    }
  }
})
</script>

<style scoped></style>
