import { IForm } from '@/base-ui/form/type'
const searchConfig: IForm = {
  formConfig: [
    {
      field: 'name',
      label: '角色名',
      typeInfo: 'text',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      label: '角色介绍',
      typeInfo: 'text',
      placeholder: '请输入角色介绍'
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
