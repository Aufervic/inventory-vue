import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import ListEquipmentView from './../views/equipment/ListEquipmentView.vue'
import UpdateEquipmentView from './../views/equipment/UpdateEquipmentView.vue'
import DetailEquipmentView from './../views/equipment/DetailEquipmentView.vue'
import DashBoardView from './../views/DashboardView.vue'



const routes = [
  { path: '/', component: ListEquipmentView },
  { path: '/equipment/update/:id', component: UpdateEquipmentView, props: true},
  { path: '/equipment/:id', component: DetailEquipmentView, props: true},
  { path: '/dashboard', component: DashBoardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router