import { IForm } from '@/base-ui/form/type'
const modalConfig: IForm = {
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
      field: 'password',
      label: '用户密码',
      typeInfo: 'password',
      placeholder: '请输入用户密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      label: '手机号',
      typeInfo: 'text',
      placeholder: '请输入手机号'
    },
    {
      field: 'departmentId',
      label: '选择部门',
      typeInfo: 'select',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      label: '选择角色',
      typeInfo: 'select',
      placeholder: '请选择角色',
      options: []
    }
  ],
  labelWidth: '86px',
  itemStyle: {
    padding: '4px 10px'
  },
  // 使用方式一：写死
  layoutStyle: {
    span: 24 // 写死 -> 24/12 屏幕中显示两个
  }
  // 使用方式二：根据屏幕大小自动适配
  // layoutStyle: {
  //   xl: 6, // 24/6 四份，
  //   lg: 8,
  //   md: 12,
  //   sm: 24,
  //   xs: 24
  // }
}

export default modalConfig
