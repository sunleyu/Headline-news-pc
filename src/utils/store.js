// 封装的操作本地存贮的模块
// 存储用户相关api
// 约定key key=toutiao
const key = 'toutiao'
const local = {
  // 存储
  setUser (user) {
    //   把user转化为json字符串
    window.sessionStorage.setItem(key, JSON.stringify(user))
  },
  // 获取
  getUser () {
    const jsonStr = window.sessionStorage.getItem(key)
    return JSON.stringify(jsonStr)
  },
  // 清除
  DefaultSerializer () {
    window.sessionStorage.removeItem(key)
  }
}
export default local
