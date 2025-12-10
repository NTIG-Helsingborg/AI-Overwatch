import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Live from '../views/Live.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
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

