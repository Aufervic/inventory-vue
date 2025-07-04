import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import ListEquipmentView from '@/views/equipment/ListEquipmentView.vue'
import UpdateEquipmentView from '@/views/equipment/UpdateEquipmentView.vue'
import CreateEquipmentView from '@/views/equipment/CreateEquipmentView.vue'
import DetailEquipmentView from '@/views/equipment/DetailEquipmentView.vue'
import DashBoardView from '@/views/DashboardView.vue'
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
import ListIncomeTypeView from '@/views/income-type/ListIncomeTypeView.vue'
import CreateIncomeTypeView from '@/views/income-type/CreateIncomeTypeView.vue'
import UpdateIncomeTypeView from '@/views/income-type/UpdateIncomeTypeView.vue'
import DetailIncomeTypeView from '@/views/income-type/DetailIncomeTypeView.vue'
import ListInventoryView from '@/views/inventory/ListInventoryView.vue'
import CreateInventoryView from '@/views/inventory/CreateInventoryView.vue'
import DetailInventoryView from '@/views/inventory/DetailInventoryView.vue'
import UpdateInventoryView from '@/views/inventory/UpdateInventoryView.vue'
import ListInventoryReviewView from '@/views/inventory-review/ListInventoryReviewView.vue'
import CreateInventoryReviewView from '@/views/inventory-review/CreateInventoryReviewView.vue'
import DetailInventoryReviewView from '@/views/inventory-review/DetailInventoryReviewView.vue'
import UpdateInventoryReviewView from '@/views/inventory-review/UpdateInventoryReviewView.vue'
import InventoryRevisionView from '@/views/inventory/InventoryRevisionView.vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { isAuth, logout, getAccessToken, isTokenExpired } from '@/store/auth'

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

      { path: '/income-type', component: ListIncomeTypeView },
      { path: '/income-type/new', component: CreateIncomeTypeView },
      { path: '/income-type/update/:id', component: UpdateIncomeTypeView, props: true },
      { path: '/income-type/:id', component: DetailIncomeTypeView,  props: true},

      { path: '/inventory', component: ListInventoryView },
      { path: '/inventory/new', component: CreateInventoryView },
      { path: '/inventory/update/:id', component: UpdateInventoryView, props: true },
      { path: '/inventory/:id', component: DetailInventoryView,  props: true},
      { path: '/inventory/:id/revision', component: InventoryRevisionView, props: true},
      
      { path: '/inventory-review', component: ListInventoryReviewView },
      { path: '/inventory-review/new', component: CreateInventoryReviewView },
      { path: '/inventory-review/update/:id', component: UpdateInventoryReviewView, props: true },
      { path: '/inventory-review/:id', component: DetailInventoryReviewView,  props: true},
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
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  const token = getAccessToken()
  if(token && isTokenExpired(token)){
    logout()
  }

  if (authRequired && !isAuth.value) {
    next('/login')
  } else if (to.path === '/login' && isAuth.value) {
    next('/')
  } else {
    next()
  }
})

export default router