import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import ListEquipmentView from './../views/equipment/ListEquipmentView.vue'
import UpdateEquipmentView from './../views/equipment/UpdateEquipmentView.vue'
import CreateEquipmentView from './../views/equipment/CreateEquipmentView.vue'
import DetailEquipmentView from './../views/equipment/DetailEquipmentView.vue'
import DashBoardView from './../views/DashboardView.vue'
import ListUbicationView from '@/views/ubication/ListUbicationView.vue'
import CreateUbicationView from '@/views/ubication/CreateUbicationView.vue'
import UpdateUbicationView from '@/views/ubication/UpdateUbicationView.vue'
import DetailUbicationView from '@/views/ubication/DetailUbicationView.vue'

const routes = [
  { path: '/', component: ListEquipmentView },
  { path: '/equipment/new', component: CreateEquipmentView},
  { path: '/equipment/update/:id', component: UpdateEquipmentView, props: true},
  { path: '/equipment/:id', component: DetailEquipmentView, props: true},
  { path: '/dashboard', component: DashBoardView },
  { path: '/ubication', component: ListUbicationView },
  { path: '/ubication/new', component: CreateUbicationView },
  { path: '/ubication/update/:id', component: UpdateUbicationView },
  { path: '/ubication/:id', component: DetailUbicationView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router