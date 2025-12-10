import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Live from '../views/Live.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/live',
    name: 'Live',
    component: Live
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

