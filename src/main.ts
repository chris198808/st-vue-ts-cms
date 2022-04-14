// main.ts 项目入口文件
import { createApp } from 'vue'
import router from '@/router'
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

// 导入 normalize.css 规范化css
import 'normalize.css'
import '@/assets/css/index.less'
import { setupStore } from '@/store'

// createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
const app = createApp(App)
app.use(store)
// 防止用户刷新页面 vuex中的数据丢失， 每次入口函数执行,通过localCatch重新初始化vuex中用户数据
setupStore()
app.use(router)
app.use(global)
app.mount('#app')
