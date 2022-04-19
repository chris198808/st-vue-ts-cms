const tableConfig = {
  // 表单标题
  title: '商品列表',
  // 是否显示index 序号
  isShowIndex: true,
  // 是否显示checkbox
  isShowSelection: true,
  tableData: [
    // prop-数据中对应要读取的字段，label-表头显示的字段，minWidth-最小宽度
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '120'
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '80',
      slotName: 'oldPrice'
    },
    {
      prop: 'imgUrl',
      label: '产品图片',
      minWidth: '100',
      slotName: 'productImg'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '80',
      slotName: 'newPrice'
    },
    {
      prop: 'status',
      label: '状态',
      minWidth: '80',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '180',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '修改时间',
      minWidth: '180',
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
