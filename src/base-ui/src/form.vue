<template>
  <div class="form">
    <div class="search">
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
                  <el-input type="text" :placeholder="item.placeholder" />
                </template>
                <!-- 2. password 类型 -->
                <template v-if="item.typeInfo === 'password'">
                  <el-input
                    type="password"
                    :placeholder="item.placeholder"
                    show-password
                  />
                </template>
                <!-- 3. select 类型 -->
                <template v-if="item.typeInfo === 'select'">
                  <el-select
                    :placeholder="item.placeholder"
                    style="width: 100%"
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
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormConfig } from '@/base-ui/type'
export default defineComponent({
  props: {
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
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  .search {
    display: flex;
    background-color: #f4f4f7;
    margin: 0 10px;
    padding-top: 22px;
    border-radius: 5px;
  }
}
</style>
