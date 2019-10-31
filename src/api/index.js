// axios 不是vue插件 是基于JavaScript的
import axios from 'axios'
import local from '@/utils/store'
import router from '@/router'
import JSONBIG from 'json-bigint'
// 对axios进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/' // 基准地址
axios.defaults.transformResponse = [(data) => {
  // 对data进行格式转换  data就是后台响应的json字符串
  // 如果没数据呢？data === null 使用JSONBIG.parse(null) 报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 设置默认请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorzation = `Bearer ${local.getUser().token}`
// }
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 拦截成功
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应了拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, function (err) {
  // 对响应错误做点什么
  if (err.response.status === 401) {
    // window.location.href = 'http://localhost:8080/#/login'
    // window.location.hash = '#/login'
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
