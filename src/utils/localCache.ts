class LocalCache {
  // 1. 设置localstorage
  setLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  // 2. 拿到某个localstorage
  getLocalStorage(key: string) {
    const localCache = window.localStorage.getItem(key)
    if (localCache) {
      return JSON.parse(localCache)
    }
  }
  // 3. 删除某个localstorage
  deleteLocalStorage(key: string) {
    window.localStorage.removeItem(key)
  }
  // 4. 清除localstorage
  clearLocalStorage() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
// 1. 设置localstorage
// export function setLocalStorage(key: string, value: any) {
//   window.localStorage.setItem(key, JSON.stringify(value))
// }
// 2. 拿到某个localstorage
// export function getLocalStorage(key: string) {
//   let getMess = window.localStorage.getItem(key)
//   if (getMess) {
//     getMess = JSON.parse(getMess)
//   }
//   return getMess
// }
// 3. 删除某个localstorage
// export function deleteLocalStorage(key: string) {
//   window.localStorage.removeItem(key)
// }
// 4. 清除localstorage
// export function clearLocalStorage() {
//   window.localStorage.clear()
// }
