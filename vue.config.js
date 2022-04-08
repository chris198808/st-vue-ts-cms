const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 1.直接通过CLI提供给我们的选项来配置
  // outputDir: './build',
  // 2.通过configureWebpack修改webpack的配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
