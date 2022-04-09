// main.ts 项目入口文件
import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
// 全局导入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
// 自定义插件入口 global
import global from './global'

// createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
createApp(App).use(router).use(store).use(global).mount('#app')
