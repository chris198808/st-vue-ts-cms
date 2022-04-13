import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/localCache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/user',
    component: () => import('@/views/user/user.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  // to的路径 不等于 login，判断一下是否携带token，如果没有携带token，统一跳转到login页
  if (to.path !== '/login') {
    const token = localCache.getLocalStorage('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
