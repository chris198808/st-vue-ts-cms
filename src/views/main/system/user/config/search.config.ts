import { IForm } from '@/base-ui/form/type'
const searchConfig: IForm = {
  formConfig: [
    {
      field: 'name',
      label: '用户名',
      typeInfo: 'text',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      label: '真实姓名',
      typeInfo: 'text',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      label: '手机号',
      typeInfo: 'text',
      placeholder: '请输入手机号'
    },
    {
      field: 'enable',
      label: '状态',
      typeInfo: 'select',
      placeholder: '请选择状态',
      options: [
        {
          label: '启用',
          value: '1'
        },
        {
          label: '禁用',
          value: '0'
        }
      ]
    },
    {
      field: 'createAt',
      label: '创建时间',
      typeInfo: 'datepicker',
      placeholder: '创建时间',
      otherProps: {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ],
  labelWidth: '86px',
  itemStyle: {
    padding: '4px 10px'
  },
  // 使用方式一：写死
  // layoutStyle = {
  //   span: 12 // 写死 -> 24/12 屏幕中显示两个
  // }
  // 使用方式二：根据屏幕大小自动适配
  layoutStyle: {
    xl: 6, // 24/6 四份，
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
}

export default searchConfig
