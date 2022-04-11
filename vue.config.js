const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  // 1.直接通过CLI提供给我们的选项来配置
  // outputDir: './build',
  // 2.通过configureWebpack修改webpack的配置
  configureWebpack: {
    devServer: {
      // 默认为true
      historyApiFallback: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      AutoImport({
        /**
         * 解决loading组件加载样式失效：
         * 1. 添加 { importStyle: false })
         * 2. 项目入口文件添加全局样式：
         * import 'element-plus/theme-chalk/el-loading.css'
         */
        resolvers: [ElementPlusResolver({ importStyle: false })]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
