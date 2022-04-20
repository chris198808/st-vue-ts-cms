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
      @handleCreateClick="handleCreate"
      @handleEditClick="handleEdit"
    ></page-content>
    <page-modal
      pageName="users"
      :modalConfig="modalConfig"
      :defaultInit="defaultInit"
      ref="pageModalRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import searchConfig from './config/search.config'
import tableConfig from './config/table.config'
import modalConfig from './config/modal.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import usePageSearch from '@/hooks/use-page-search'
import usePageModal from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 1.搜索相关的Hooks
    // const [pageContentRef, handleReset, handleSearch] = usePageSearch()
    const { pageContentRef, handleReset, handleSearch } = usePageSearch()
    // 2.新增，修改的Hooks
    const creatFC = () => {
      const passwordItem = modalConfig.formConfig.find((item) => {
        return item.field === 'password'
      })
      // 显示password字段
      passwordItem!.isHidden = false
      // if (passwordItem) {
      //   passwordItem.isHidden = false
      // }
    }
    const updateFC = () => {
      const passwordItem = modalConfig.formConfig.find((item) => {
        return item.field === 'password'
      })
      // 隐藏password字段
      // if (passwordItem) {
      //   passwordItem.isHidden = true
      // }
      passwordItem!.isHidden = true
    }

    // 3.动态展示部门和角色
    const departmentItem = modalConfig.formConfig.find((item) => {
      return item.field === 'departmentId'
    })
    const store = useStore()
    const allDepartmentList = store.state.allDepartment
    // map:在每次迭代后会返回一个形式为[key，value]的数组
    departmentItem!.options = allDepartmentList.map((item) => {
      return { label: item.name, value: item.id }
    })

    const roleItem = modalConfig.formConfig.find((item) => {
      return item.field === 'roleId'
    })
    const allRoleList = store.state.allRole
    roleItem!.options = allRoleList.map((item) => {
      return { label: item.name, value: item.id }
    })

    const [pageModalRef, defaultInit, handleCreate, handleEdit] = usePageModal(
      creatFC,
      updateFC
    )
    return {
      searchConfig,
      tableConfig,
      modalConfig,

      pageContentRef,
      handleReset,
      handleSearch,
      pageModalRef,
      handleCreate,
      handleEdit,
      defaultInit
    }
  }
})
</script>

<style scoped></style>
