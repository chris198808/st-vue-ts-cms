<template>
  <div class="st-table">
    <div class="t-header">
      <div class="title">{{ title }}</div>
      <div class="handle">
        <slot name="handle-btns"></slot>
      </div>
    </div>
    <!-- :data="userlists" 显示的数据 -->
    <!--el-table-column 中三个属性： prop-数据中对应要读取的字段，label-表头显示的字段，minWidth-最小宽度 -->
    <el-table :data="userlists" style="width: 100%" v-bind="isShowTreeMenu">
      <el-table-column
        v-if="isShowSelection"
        type="selection"
        width="60"
        align="center"
      />
      <el-table-column
        v-if="isShowIndex"
        label="序号"
        type="index"
        width="80"
        align="center"
      />
      <template v-for="item in tableData" :key="item.prop">
        <el-table-column
          v-bind="item"
          align="center"
          show-overflow-tooltip="true"
        >
          <!-- 作用域插槽的使用 -->
          <!-- (1) #default=“scope” 里通过scope.row拿到的其实是每个item的数据对象，也就是行对象;
               (2) 而在#default=“scope”中再加入的具名插槽其实针对的是列集合里的元素也就是列元素那么每个列集合都有了自己的插槽，其实就相当于每个列元素都有了自己的插槽，之后就可以根据名字插入自定义内容了
               (3) 要注意后者得引用 :row="scope.row"其实还是父子间传递，行对象的插槽为父，列元素的插槽为子，做完以上在子里就可以通过scope拿到我们刚传的scope.row内容了
           -->
          <template #default="scope">
            <!-- 自定义具名插槽 -->
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[`${item.prop}`] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="t-footer">
      <slot name="footer">
        <template v-if="isShowPagenation">
          <el-pagination
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="datacounts"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:pageInfo'],
  props: {
    userlists: {
      type: Array,
      required: true
    },
    datacounts: {
      type: Number,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    isShowSelection: {
      type: Boolean,
      default: false
    },
    isShowPagenation: {
      type: Boolean,
      default: true
    },
    // 是否展开树形菜单
    isShowTreeMenu: {
      type: Object,
      defaulte: () => ({})
    },
    title: {
      type: String,
      default: ''
    },
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    }
  },
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.st-table {
  margin: 20px 10px;
  .t-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: 800;
      padding-left: 10px;
    }
    .handle {
    }
  }
  .t-footer {
    display: flex;
    justify-content: right;
    padding-top: 10px;
    padding-right: 10px;
  }
}
</style>
