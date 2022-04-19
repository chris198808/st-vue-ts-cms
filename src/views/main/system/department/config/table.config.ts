const tableConfig = {
  // 表单标题
  title: '部门列表',
  // 是否显示index 序号
  isShowIndex: true,
  // 是否显示checkbox
  isShowSelection: true,
  // 是否显示分页器,
  isShowPagenation: true,
  tableData: [
    // prop-数据中对应要读取的字段，label-表头显示的字段，minWidth-最小宽度
    {
      prop: 'name',
      label: '部门名称',
      minWidth: '120'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '修改时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      prop: 'handle',
      label: '操作',
      minWidth: '160',
      slotName: 'handle'
    }
  ]
}
export default tableConfig
