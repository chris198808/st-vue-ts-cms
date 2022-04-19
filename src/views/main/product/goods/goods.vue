<template>
  <div class="goods">
    <page-search
      :searchConfig="searchConfig"
      @handleResetClick="handleReset"
      @handleSearchClick="handleSearch"
    ></page-search>
    <page-content
      pageName="goods"
      :tableConfig="tableConfig"
      ref="pageContentRef"
      ><template #productImg="scope">
        <el-image
          :src="scope.row.imgUrl"
          style="height: 60px"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported="true"
        /> </template
      ><template #oldPrice="scope"> ¥{{ scope.row.oldPrice }} </template>
      <template #newPrice="scope">¥{{ scope.row.newPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import searchConfig from './config/search.config'
import tableConfig from './config/table.config'

export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const pageContentRef = ref<InstanceType<typeof PageContent>>()
    const handleReset = () => {
      pageContentRef.value?.getPageDataLists()
    }
    const handleSearch = (queryParams: any) => {
      pageContentRef.value?.getPageDataLists(queryParams)
      console.log(queryParams)
      console.log('提交')
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
