import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
