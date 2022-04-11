// 1. 设置localstorage
export function setLocalStorage(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 2. 拿到某个localstorage
export function getLocalStorage(key: string) {
  let getMess = window.localStorage.getItem(key)
  if (getMess) {
    getMess = JSON.parse(getMess)
  }
  return getMess
}
// 3. 删除某个localstorage
export function deleteLocalStorage(key: string) {
  window.localStorage.removeItem(key)
}
// 4. 清除localstorage
export function clearLocalStorage() {
  window.localStorage.clear()
}
