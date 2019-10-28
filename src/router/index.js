import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/index.vue'
import Welcome from '@/views/welcome'
import NotFound from '@/views/notFound'
import local from '@/utils/store'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
// 添加路由的 导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
//   // 每次跳转路由前触发
//   // to 跳转到目标 路由对象
//   // from 从哪里跳转过来  路由对象
//   // next 下一步方法  next()放行  next(‘/login’) 拦截
  const user = local.getUser()
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router