<template>
  <div class="role">
    <page-search
      :searchConfig="searchConfig"
      @handleResetClick="handleReset"
      @handleSearchClick="handleSearch"
    />
    <page-content
      pageName="role"
      :tableConfig="tableConfig"
      @handleCreateClick="handleCreate"
      @handleEditClick="handleEdit"
      ref="pageContentRef"
    />
    <page-modal
      pageName="role"
      :modalConfig="modalConfig"
      :defaultInit="defaultInit"
      :otherInfo="otherInfo"
      ref="pageModalRef"
    >
      <el-tree
        ref="elTreeRef"
        :data="menusData"
        :props="{ children: 'children', label: 'name' }"
        node-key="id"
        show-checkbox
        @check="handleCheck"
      ></el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import searchConfig from './config/search.config'
import tableConfig from './config/table.config'
import modalConfig from './config/modal.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { ElTree } from 'element-plus'

import usePageSearch from '@/hooks/use-page-search'
import usePageModal from '@/hooks/use-page-modal'

import { getLeafNodes } from '@/utils/map-menu'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },

  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 将hooks中的选中行的信息，再次传到role.vue页面
    const cbFn = (item: any) => {
      const leafNodes = getLeafNodes(item.menuList)
      // 需要等到页面更新完毕后绑定对应的值
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafNodes)
      })
    }

    const { pageContentRef, handleReset, handleSearch } = usePageSearch()
    const [pageModalRef, defaultInit, handleCreate, handleEdit] = usePageModal(
      undefined,
      cbFn
    )
    const store = useStore()
    const menusData = computed(() => {
      return store.state.allMenu
    })
    const otherInfo = ref({})
    const handleCheck = (data1: any, data2: any) => {
      // element-plus 自带的两个参数
      // 使用第二个参数， 第二个参数包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
      // halfCheckedKeys，对应type=1的菜单id
      // checkedKeys，对应非type=1的菜单id
      const halfCheckedKeys = data2.halfCheckedKeys
      const checkedKeys = data2.checkedKeys
      // 对应role对象中的menulist
      const menuList = [...halfCheckedKeys, ...checkedKeys]
      // 将数组类型转换成对象，因为otherInfo需要的是对象{ menuList: menuList }
      otherInfo.value = { menuList }
      console.log(otherInfo.value)
    }
    return {
      searchConfig,
      tableConfig,
      modalConfig,
      pageContentRef,
      handleReset,
      handleSearch,
      pageModalRef,
      defaultInit,
      handleCreate,
      handleEdit,
      menusData,
      // 拿到对应的选择的菜单信息
      otherInfo,
      elTreeRef,
      handleCheck
    }
  }
})
</script>

<style scoped></style>
