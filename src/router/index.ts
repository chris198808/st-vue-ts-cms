import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../components/HomePage.vue')
  },
  {
    path: '/hello',
    component: () => import('../components/HelloWorld.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
