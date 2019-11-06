import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home/index.vue'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/notFound'
import local from '@/utils/store'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome },
        // 文章管理
        { path: '/article', component: Article },
        // 素材管理
        { path: '/image', component: Image },
        // 文章发布
        { path: '/publish', component: Publish },
        // 评论管理
        { path: '/comment', component: Comment },
        // 个人设置
        { path: '/setting', component: Setting },
        // 个人设置
        { path: '/fans', component: Fans }
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
