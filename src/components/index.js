// 封装
import myBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-images'
export default {
  install (Vue) {
    //   注册全局组件
    Vue.component('my-bread', myBread)
    Vue.component('my-channel', MyChannel)
    Vue.component('my-image', MyImage)
  }
}
