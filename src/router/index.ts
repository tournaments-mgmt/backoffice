import { createRouter, createWebHistory } from 'vue-router'
import DevView from '@/views/DevView.vue'
import ShowCaseView from '@/views/ShowCaseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dev',
      name: 'dev',
      component: DevView,
    },
    {
      path: '/showcase:tag',
      name: 'home',
      component: ShowCaseView,
    },
  ],
})

export default router
