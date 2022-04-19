import { useStore } from 'vuex'
// 传入一个当前页面的名称，和一个要验证的方法（增删改查），如果包含这个方法，则返回true
function usePermission(pageName: string, handle: string) {
  const store = useStore()
  const permission = store.state.loginModule.btnPermission
  const verifyPermission = `system:${pageName}:${handle}`
  // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
  return !!permission.find((item: string) => item === verifyPermission)
}
export default usePermission
