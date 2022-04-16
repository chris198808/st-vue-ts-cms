type typeInfo = 'text' | 'password' | 'select' | 'datepicker'
export interface IFormConfig {
  // 基本属性
  field: string
  label: string
  typeInfo: typeInfo
  placeholder?: string
  rules?: any[]
  // 针对select
  options?: any[]
  // 针对特殊的属性
  //如datepicker，start - placehoder, end - placehorder, type = daterange的配合使用
  otherProps?: any
}
export interface IForm {
  formConfig: IFormConfig[]
  labelWidth: string
  // 设置el-form-item的单独样式
  itemStyle: any
  // 设置自适应布局 xl lg md sm xs，还是固定布局 :span=8
  layoutStyle: any
}
