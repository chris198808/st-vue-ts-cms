import { IForm } from '@/base-ui/form/type'
const searchConfig: IForm = {
  formConfig: [
    {
      field: 'id',
      label: 'id',
      typeInfo: 'text',
      placeholder: '请输入ID'
    },
    {
      field: 'username',
      label: '用户名',
      typeInfo: 'text',
      placeholder: '请输入用户名'
    },
    {
      field: 'sport',
      label: '喜欢的运动',
      typeInfo: 'select',
      placeholder: '请选择喜欢的运动',
      options: [
        {
          label: '足球',
          value: 'footbool'
        },
        {
          label: '蓝球',
          value: 'basketball'
        }
      ]
    },
    {
      field: 'createTime',
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
