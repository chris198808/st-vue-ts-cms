<template>
  <div class="form">
    <div class="search">
      <slot name="title"></slot>
      <!-- label-width="120px" 对应  el-form-item label="用户名" 宽度-->
      <el-form class="el-form" :label-width="labelWidth">
        <el-row>
          <!-- :span="24" 将一列24等分 -->
          <template v-for="item in formConfig" :key="item.label">
            <!-- v-bind="layoutStyle" 将对象中的所有属性 绑定到el-col元素上 -->
            <el-col v-bind="layoutStyle">
              <el-form-item
                :label="item.label"
                :style="itemStyle"
                class="el-form-item"
              >
                <!-- 1. text 类型 -->
                <template v-if="item.typeInfo === 'text'">
                  <el-input
                    type="text"
                    :placeholder="item.placeholder"
                    :modelValue="modelValue[`${item.field}`]"
                    @update:modelValue="changeValue($event, item.field)"
                  />
                </template>
                <!-- 2. password 类型 -->
                <template v-if="item.typeInfo === 'password'">
                  <el-input
                    type="password"
                    :placeholder="item.placeholder"
                    show-password
                    :modelValue="modelValue[`${item.field}`]"
                    @update:modelValue="changeValue($event, item.field)"
                  />
                </template>
                <!-- 3. select 类型 -->
                <template v-if="item.typeInfo === 'select'">
                  <el-select
                    :placeholder="item.placeholder"
                    style="width: 100%"
                    :modelValue="modelValue[`${item.field}`]"
                    @update:modelValue="changeValue($event, item.field)"
                  >
                    <el-option
                      v-for="o in item.options"
                      :label="o.label"
                      :value="o.value"
                      :key="o.value"
                    />
                  </el-select>
                </template>
                <!-- 4. datapicker 类型 -->
                <template v-if="item.typeInfo === 'datepicker'">
                  <el-date-picker
                    type="date"
                    v-bind="item.otherProps"
                    style="width: 100%"
                    :modelValue="modelValue[`${item.field}`]"
                    @update:modelValue="changeValue($event, item.field)"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormConfig } from '@/base-ui/form/type'
import { IFormData } from '@/components/page-search/type'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<IFormData>,
      required: true
    },
    formConfig: {
      // as 断言，将数组类型 替换成 IformItemProps[]的数组类型
      // PropType 它的作用是对父组件传递过来的值/参数（prop）作类型检查
      type: Array as PropType<IFormConfig[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    itemStyle: {
      type: Object,
      // 父组件不传递的话 使用默认值
      default: () => ({ padding: '4px 10px' })
    },
    layoutStyle: {
      type: Object,
      default: () => ({
        xl: 6, // 将屏幕(响应式栅格数)分为四份 24/6
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue })
    // watch(formData.value, (newValue) => {
    //   emit('update:modelValue', newValue)
    // })
    const changeValue = (value: string, field: any) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      changeValue
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  .search {
    background-color: #f4f4f7;
    margin: 0 10px;
    padding-top: 22px;
    border-radius: 5px;
    .el-form {
      display: flex;
    }
  }
}
</style>
