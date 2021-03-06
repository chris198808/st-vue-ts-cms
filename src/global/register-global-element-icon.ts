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
  Expand,
  Fold,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Menu,
  MessageBox,
  ArrowDown,
  Refresh,
  Edit,
  Delete
} from '@element-plus/icons-vue'
const components = [
  Expand,
  Fold,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Menu,
  MessageBox,
  ArrowDown,
  Refresh,
  Edit,
  Delete
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
