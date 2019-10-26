// xios 不是vue插件 是基于JavaScript的
import axios from 'axios'
// 对axios进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/' // 基准地址

export default axios
