<template>
  <div class="user">
    <search-page :searchConfig="searchConfig" />
    <st-table :userlists="userlists" :tableData="tableData">
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          size="small"
          plain="true"
          >{{ scope.row.enable ? '启用' : '停用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filter.formateUtc(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filter.formateUtc(scope.row.updateAt) }}
      </template>
    </st-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import searchConfig from './config/search.config'
import SearchPage from '@/components/search-page'
import StTable from '@/base-ui/table'

export default defineComponent({
  name: 'user',
  components: {
    SearchPage,
    StTable
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPagelistAction', {
      url: '/users/list',
      queryParameters: { offset: 0, size: 10 }
    })

    const userlists = computed(() => {
      return store.state.system.userlist
    })
    console.log(store.state.system.userlist)
    const usercounts = computed(() => {
      return store.state.system.usercounts
    })
    console.log(usercounts.value)
    const tableData = [
      // prop-数据中对应要读取的字段，label-表头显示的字段，minWidth-最小宽度
      {
        prop: 'name',
        label: '用户名',
        minWidth: '120'
      },
      {
        prop: 'realname',
        label: '真实姓名',
        minWidth: '120'
      },
      {
        prop: 'enable',
        label: '状态',
        minWidth: '100',
        slotName: 'status'
      },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '260',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '修改时间',
        minWidth: '260',
        slotName: 'updateAt'
      }
    ]
    return {
      searchConfig,
      userlists,
      tableData
    }
  }
})
</script>

<style scoped></style>
