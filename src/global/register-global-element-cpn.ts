// global -> register-global-element-cpn.ts
/**
 * 创建插件的两种方式：
 * 1.函数，自动运行
 * 2.对象，必须包含一个install()
 */

/**
 * 做这个插件的目的：将常用element-plus组件封装成全局组件，将来直接使用
 * 每个应用到的element-plus组件使用都需要，导入/注册组件,如果有很多页面就要导入一大堆element-plus组件
 */
// App<Element> 类型声明
import { App } from 'vue'
import {
  ElButton,
  ElTabPane,
  ElIcon,
  ElTabs,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElSelect,
  ElOption,
  ElCol,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElScrollbar,
  ElDialog,
  ElTree
} from 'element-plus'
const components = [
  ElButton,
  ElTabPane,
  ElIcon,
  ElTabs,
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElAvatar,
  ElSelect,
  ElOption,
  ElCol,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElScrollbar,
  ElDialog,
  ElTree
]
export default {
  install(app: App) {
    for (const cpn of components) {
      // 注册一个选项对象
      // app.component('my-component', {})
      app.component(cpn.name, cpn)
    }
  }
}
