// 1.await跟上表达式
function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('执行成功~')
      // reject("执行失败~")
    }, 2000)
  })
}
// async 异步函数 最后一定会返回一个promise
async function foo() {
  // 使用await后返回一个promise
  const res1 = await requestData()
  // 以下执行的代码 可以看做是then中执行的代码
  console.log('后面的代码1', res1)
  console.log('后面的代码2')
  console.log('后面的代码3')

  const res2 = await requestData()
  console.log('res2后面的代码', res2)
}
foo()
