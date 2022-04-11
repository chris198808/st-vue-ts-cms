// main.ts 项目入口文件
import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
// 全局导入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
//单独引入loading 样式
import 'element-plus/theme-chalk/el-loading.css'
import App from './App.vue'
// 自定义插件入口 global
import global from './global'
// import './server/axios-demo'
// 环境变量演示
// import './server/request/config'

// 测试
// import axios from 'axios'
// axios.get('http://httpbin.org').then((res) => {
//   console.log(res)
// })

// 封装的axios
import stRequest from './server'
// 导入 normalize.css 规范化css
import 'normalize.css'
import '@/assets/css/index.less'

// createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
createApp(App).use(router).use(store).use(global).mount('#app')

// 自定义返回的数据类型
type DateType = {
  data: any
  returnCode: string
  success: boolean
}
// 对STRequest实例对象.request方法的使用
stRequest
  .request<DateType>({
    url: '/home/multidata',
    method: 'get',
    stInterceptors: {
      requestInterceptor: (config) => {
        console.log('对某一个requeste请求拦截')
        return config
      },
      responseInterceptor: (res) => {
        console.log('对某一个response请求拦截')
        return res
      }
    }
    // isShow: false
  })
  .then((res) => {
    console.log('data: ' + res.data)
    console.log('returnCode: ' + res.returnCode)
    console.log('success: ' + res.success)
  })
