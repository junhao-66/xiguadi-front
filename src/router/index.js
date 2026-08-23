import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: '西高地白梗 - 首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/AboutPage.vue'),
    meta: { title: '关于西高地' }
  },
  {
    path: '/care',
    name: 'Care',
    component: () => import('../pages/CarePage.vue'),
    meta: { title: '养护百科' }
  },
  {
    path: '/growth',
    name: 'Growth',
    component: () => import('../pages/GrowthPage.vue'),
    meta: { title: '成长日记' }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../pages/TestPage.vue'),
    meta: { title: '养前测试' }
  },
  {
    path: '/comments',
    name: 'Comments',
    component: () => import('../pages/CommentsPage.vue'),
    meta: { title: '留言分享' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '西高地白梗'
  next()
})

export default router
