// -> server/request/config.ts

// 开发环境：development -> 开发服务器
// 生产环境：production -> 生产环境的服务器，不会乱改
// 测试环境：test -> 测试环境服务器

// 1.手动修改 容易忘记混乱
// const BASE_URL = "http://httpbin.org/dev"
// const BASE_URL = "http://httpbin.org/prod"
// const BASE_URL = "http://httpbin.org/test"

let BASE_URL = ''
// 2.根据process.env.NODE_ENV的值进行区分
/**
 * NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。
 * 具体的值取决于应用运行的模式。
 * BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符,
 * "production" 下 需要设置 publicPath: './'
 */
if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://httpbin.org/dev'
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  // publicPath: './',
  BASE_URL = 'http://httpbin.org/prod'
} else {
  BASE_URL = 'http://httpbin.org/test'
}
// console.log(BASE_URL)

// 注意导出的形式，ESModule语法，不是对象
export { BASE_URL }

// 3.编写不同的环境变量配置文件
/**
 * 根目录下创建
 * .env.development, .env.production, .env.test三个文件，
 * 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中
 * 通过 process.env.VUE_APP_xxx 可以访问定义的变量
 */
