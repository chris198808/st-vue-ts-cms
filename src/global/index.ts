//  global -> index.ts 自定义插件入口文件
/**
 * 创建插件的两种方式：
 * 1.函数，自动运行
 * 2.对象，必须包含一个install()
 */

import { App } from 'vue'
// element-plus 局部引入的常用组件
import registerGlobalElementCpn from './register-global-element-cpn'

/**
 * 自定义插件的入口函数
 */
export default {
  install(app: App) {
    registerGlobalElementCpn.install(app)
  }
}
