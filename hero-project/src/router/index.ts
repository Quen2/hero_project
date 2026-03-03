import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/select',
      name: 'select',
      component: () => import('../views/Select.vue'),
    },
    {
      path: '/battle',
        name: 'battle',
        component: () => import('../views/Battle.vue'),
    }
  ],
})

export default router
