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

  // devServer: {
  //   // 默认为true
  //   historyApiFallback: true,
  //   // 解决开发阶段跨域访问
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:5000',
  //       // 不希望传递/api，则需要重写路径
  //       pathRewrite: { '^/api': '' },
  //       // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为
  //       changeOrigin: true
  //     }
  //   }
  // },
  // 2.通过configureWebpack修改webpack的配置
  configureWebpack: {
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://152.136.185.210:5000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
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
