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
import LoginView from '@/views/LoginView.vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { isAuth } from '@/store/auth'

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

  { path:'/login', component: LoginView}



]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// guardia global que protege las rutas
router.beforeEach((to, from, next) => {
  //const isAuth = localStorage.getItem('auth') === 'true'
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isAuth.value) {
    next('/login')
  } else if (to.path === '/login' && isAuth.value) {
    next('/')
  } else {
    next()
  }
})

export default router