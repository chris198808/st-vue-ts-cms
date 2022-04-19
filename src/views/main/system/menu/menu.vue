<template>
  <div class="menu">
    <page-content pageName="menu" :tableConfig="tableConfig"> </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import tableConfig from './config/table.config'
export default defineComponent({
  name: 'st-menu',
  components: {
    PageContent
  },
  setup() {
    return {
      tableConfig
    }
  }
})
</script>

<style scoped></style>
