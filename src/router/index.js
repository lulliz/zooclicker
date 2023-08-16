import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Handbook from '../views/Handbook.vue'
import Store from '../views/Store.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/handbook',
      name: 'handbook',
      component: Handbook
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    }
  ]
})

export default router
