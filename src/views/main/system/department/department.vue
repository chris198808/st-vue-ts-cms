<template>
  <div class="department">
    <search-page :searchConfig="searchConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import searchConfig from './config/search.config'
import SearchPage from '@/components/search-page'

export default defineComponent({
  name: 'department',
  components: {
    SearchPage
  },
  setup() {
    return {
      searchConfig
    }
  }
})
</script>

<style lang="less" scoped></style>
