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
import ListStateView from '@/views/state/ListStateView.vue'
import CreateStateView from '@/views/state/CreateStateView.vue'
import UpdateStateView from '@/views/state/UpdateStateView.vue'
import DetailStateView from '@/views/state/DetailStateView.vue'
import ListMovementView from '@/views/movement/ListMovementView.vue'
import CreateMovementView from '@/views/movement/CreateMovementView.vue'
import UpdateMovementView from '@/views/movement/UpdateMovementView.vue'
import DetailMovementView from '@/views/movement/DetailMovementView.vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/', component: DefaultLayout, children: [
      { path: '/', component: DashBoardView },
      { path: '/equipment', component: ListEquipmentView },
      { path: '/equipment/new', component: CreateEquipmentView },
      { path: '/equipment/update/:id', component: UpdateEquipmentView, props: true },
      { path: '/equipment/:id', component: DetailEquipmentView, props: true },

      { path: '/ubication', component: ListUbicationView },
      { path: '/ubication/new', component: CreateUbicationView },
      { path: '/ubication/update/:id', component: UpdateUbicationView, props: true },
      { path: '/ubication/:id', component: DetailUbicationView, props: true },

      { path: '/state', component: ListStateView },
      { path: '/state/new', component: CreateStateView },
      { path: '/state/update/:id', component: UpdateStateView, props: true },
      { path: '/state/:id', component: DetailStateView, props: true },

      { path: '/movement', component: ListMovementView },
      { path: '/movement/new', component: CreateMovementView },
      { path: '/movement/update/:id', component: UpdateMovementView, props: true },
      { path: '/movement/:id', component: DetailMovementView, props: true },
    ]
  },




]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router