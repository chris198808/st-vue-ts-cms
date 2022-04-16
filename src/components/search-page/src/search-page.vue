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
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </st-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import StForm from '@/base-ui/form'
import { IFormData } from './type'
export default defineComponent({
  props: {
    searchConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    StForm
  },
  setup() {
    const formData: Ref<IFormData> = ref({
      // 以下字段必须和配置文件中的 field 相同，为了确定 from中绑定的字段
      id: '',
      password: '',
      username: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  padding: 0 0 10px;
}
.other {
  padding: 0 20px 20px 0;
  text-align: right;
}
</style>
