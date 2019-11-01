import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import plugin from '@/components' // 插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
// 使用插件
Vue.use(plugin)
// 使用自定义全局组件(插件)
Vue.use(ElementUI)
// axios 全局挂载
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// main.js 职责入口文件
// 职责1：创建根实例
// 职责2：依赖项目需要的全局资源
