import axios from 'axios'

// axios的实例对象
// 1.模拟get请求
axios.get('http://httpbin.org/get').then((res) => {
  console.log(res)
})

// 2.get请求,并且传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'chirs',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.config.params['name'])
//     console.log(res.config.params.name)
//   })

// 3.post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'stone',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.config.data)
//   })

// 额外补充的Promise中类型的使用
// Promise本身是可以有类型, resolve和reject中传入的值必须是string类型
// new Promise<string>((resolve, reject) => {
//   resolve('success')
//   reject('error')
// })
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// 4.axios的配置选项
// 4.1. 全局的配置
axios.defaults.baseURL = 'http://httpbin.org'
// 如果请求时间超过 `timeout` 的值，则请求会被中断
axios.defaults.timeout = 2000
// 4.2. 每一个请求单独的配置
// axios
//   .get('/get', {
//     timeout: 5000
//   })
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// 4.3.post请求
// axios.post('/post', {
//   timeout: 10000
// })

// 5.axios.all -> 多个请求, 一起返回
// axios
//   .all([
//     axios.get('/get', { params: { name: 'hello' } }),
//     axios.post('/post', { name: 'lee' })
//   ])
//   .then((res) => {
//     res.forEach((arr) => {
//       console.log(arr.data)
//     })
//   })
// 6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数

axios.interceptors.request.use(
  (config) => {
    // 做一些，添加token，加载loading动画
    console.log('请求拦截成功')
    // 拦截处理完成后要返回出去，否则请求不到数据
    return config
  },
  (err) => {
    console.log('请求拦截失败')
    return err
  }
)

axios.interceptors.response.use(
  (config) => {
    console.log('响应拦截成功')
    return config
  },
  (err) => {
    console.log('响应拦截失败')
    return err
  }
)
