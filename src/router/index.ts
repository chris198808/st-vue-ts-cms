import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/localCache'
import { firstPage } from '@/utils/map-menu'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFind',
    component: () => import('@/views/other/not-find.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  // to的路径 不等于 login，判断一下是否携带token，如果没有携带token，统一跳转到login页
  if (to.path !== '/login') {
    const token = localCache.getLocalStorage('token')
    if (!token) {
      return '/login'
    }
  }
  // console.log(router.getRoutes())
  // console.log(to)
  if (to.path === '/main') {
    return firstPage
  }
})

export default router
