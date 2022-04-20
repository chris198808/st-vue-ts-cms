<template>
  <div class="search-page">
    <!-- 父组件 v-model -->
    <!-- 子组件 props: modelValue, emits: ['updata: modelValue'] setup->emit() -->
    <st-form v-bind="searchConfig" v-model="formData">
      <template #title>
        <h2 class="title">高级搜索</h2>
      </template>
      <template #other>
        <div class="other">
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </template>
    </st-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StForm from '@/base-ui/form'
export default defineComponent({
  emits: ['handleResetClick', 'handleSearchClick'],
  props: {
    searchConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    StForm
  },
  setup(props, { emit }) {
    // 双向绑定的属性应该动态的由配置文件中的field来决定
    // 1.优化一：formData中的属性应该动态来决定
    const formConfigitems = props.searchConfig?.formConfig ?? []
    const formOriginData: any = {}
    for (const item of formConfigitems) {
      formOriginData[`${item.field}`] = ''
    }
    let formData: any = ref(formOriginData)
    // const formData: any = ref({
    //   // 以下字段必须和配置文件中的 field 相同，为了确定 from中绑定的字段
    //   id: '',
    //   password: '',
    //   username: '',
    //   sport: '',
    //   createTime: ''
    // })
    // 2.优化二：当用户点击重置，重置数据为空
    const handleReset = () => {
      formData.value = formOriginData
      emit('handleResetClick')
    }
    const handleSearch = () => {
      emit('handleSearchClick', formData.value)
    }
    return {
      formData,
      handleReset,
      handleSearch
    }
  }
})
</script>

<style lang="less" scoped>
.search-page {
  margin: 10px 10px 10px 0;
}
.title {
  text-align: center;
}
.other {
  padding: 0 20px 20px 0;
  text-align: right;
}
</style>
