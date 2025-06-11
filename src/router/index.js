import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import DashBoardView from './../views/DashboardView.vue'
import LoginView from './../views/LoginView.vue'


const routes = [
  { path: '/', component: DashBoardView },
  { path: '/login', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router