<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="新增用户"
      width="30%"
      center
    >
      <st-form v-bind="modalConfig" v-model="formData"> </st-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleData">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import StForm from '@/base-ui/form'

export default defineComponent({
  components: {
    StForm
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInit: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const formData = ref<any>({})
    const store = useStore()
    // 动态的将modalConfig中的field字段对应的value和defaultInit拿到的整行的信息进行匹配整合
    // modal.config 和 table.config [fleid字段和prop字段的对应]
    // formData[key:value] = field:name -> defaultInit.name的值
    // 监听点击编辑后的defaultInit值的变化
    // () => props.defaultInit 调用get方法才能监听到？
    watch(
      () => props.defaultInit,
      (newValue) => {
        for (const item of props.modalConfig.formConfig) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    // 2. 处理新增和编辑 数据功能
    const handleData = () => {
      // 关闭dialog
      console.log('handleData')
      console.log(props.defaultInit)
      centerDialogVisible.value = false
      // Object.keys 对象中所有的key
      if (Object.keys(props.defaultInit).length) {
        // 初始值keys.length!=0为编辑页面
        // 发送修改请求 /user/id
        const payload = {
          pageName: props.pageName,
          updateData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInit.id
        }
        store.dispatch('system/updateDataAction', payload)
        console.log('编辑')
      } else {
        // 初始值keys.length=0为编辑页面
        // 发送保存请求 /user
        const payload = {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        }
        store.dispatch('system/createDataAction', payload)
        console.log('新增')
        console.log(payload)
      }
    }
    return {
      centerDialogVisible,
      formData,
      handleData
    }
  }
})
</script>

<style lang="less" scoped></style>
