<template>
  <div class="page-content">
    <st-table
      :userlists="datalists"
      :datacounts="datacounts"
      v-bind="tableConfig"
      v-model:pageInfo="pageInfo"
    >
      <template #handle-btns>
        <el-button v-if="isCreate" type="primary" @click="handleCreate"
          >新增</el-button
        >
        <el-button type="text" :icon="Refresh">刷新</el-button>
        <el-icon class="el-icon-edit" />
      </template>
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
      <template #handle="scope">
        <el-button
          v-if="isUpdate"
          type="text"
          :icon="Edit"
          @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          type="text"
          :icon="Delete"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 自动添加动态插槽 -->
      <!-- 跨组件插槽实现，先在page-content中定义productSolt具名插槽，再在具名插槽外包裹table组件具名插槽的实现，然后每个view中的页面就可以根据自己实际需要添加自己独立功能的插槽了 -->
      <template
        v-for="item of otherSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot
          v-if="item.slotName"
          :name="[item.slotName]"
          :row="scope.row"
        ></slot>
      </template>
    </st-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import StTable from '@/base-ui/table'
import { Refresh, Delete, Edit } from '@element-plus/icons-vue'
import usePermission from '@/hooks/use-permission'

export default defineComponent({
  components: {
    StTable
  },
  emits: ['handleCreateClick', 'handleEditClick'],
  props: {
    pageName: {
      type: String,
      required: true
    },
    tableConfig: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    // 0.获取权限
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')
    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageDataLists())
    // 2.发送网络请求
    const getPageDataLists = (queryParams: any = {}) => {
      // 如果没有查询的权限，直接返回false终止下面代码的执行
      if (!isQuery) return
      store.dispatch('system/getPagelistAction', {
        pageName: props.pageName,
        queryParameters: {
          offset: (pageInfo.value.currentPage - 1) * 10,
          size: pageInfo.value.pageSize,
          ...queryParams
        }
      })
    }
    getPageDataLists()
    // 3.获取数据
    const datalists = computed(() => {
      return store.getters[`system/getDataList`](props.pageName)
    })
    const datacounts = computed(() => {
      return store.getters['system/getDataCounts'](props.pageName)
    })
    // 4.动态插槽数据收集
    const otherSlots = props.tableConfig.tableData.filter((item: any) => {
      // 固定插槽
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handle') return false
      return true
    })

    // 5.处理删除/新增/编辑操作
    const handleDelete = (item: any) => {
      const payload = { pageName: props.pageName, id: item.id }
      console.log(payload)
      store.dispatch('system/deleteDataListAction', payload)
    }
    const handleCreate = () => {
      console.log('点击了新增')
      emit('handleCreateClick')
    }
    const handleEdit = (item: any) => {
      console.log('点击了编辑')
      emit('handleEditClick', item)
    }

    return {
      datalists,
      datacounts,
      pageInfo,
      otherSlots,
      getPageDataLists,
      // 使用到的图标 需要导出
      Refresh,
      Delete,
      Edit,
      // 按钮使用权限导出
      isCreate,
      isDelete,
      isUpdate,
      // 删除，新增，修改操作
      handleDelete,
      handleCreate,
      handleEdit
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  background-color: #fff;
  padding: 4px 0 10px 0;
  border-radius: 5px;
  margin: 0 10px;
}
</style>
