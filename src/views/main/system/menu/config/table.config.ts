const tableConfig = {
  // 表单标题
  title: '菜单管理',
  // 是否显示index 序号
  isShowIndex: false,
  // 是否显示checkbox
  isShowSelection: false,
  // 是否显示分页器,
  isShowPagenation: false,
  // 是否树形展开菜单
  isShowTreeMenu: {
    rowKey: 'id',
    treeProps: '{children}'
  },
  tableData: [
    // prop-数据中对应要读取的字段，label-表头显示的字段，minWidth-最小宽度
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '160'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '100'
    },
    {
      prop: 'url',
      label: '菜单Url',
      minWidth: '120'
    },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '180'
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
