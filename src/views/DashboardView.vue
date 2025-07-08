<template>
  <div class="container mt-4">
    <!-- Bienvenida -->
    <h2 class="mb-4">Bienvenido, {{ username }} 👋</h2>

    <!-- Tarjetas resumen -->
    <div class="row mb-4">
      <div class="col-md-3" key="inventarios">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-clipboard me-2"></i> Inventarios
            </h5>
            <p class="card-text fs-4">{{ dashboard.total_inventarios }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-3" key="equipos">
        <div class="card text-white bg-success">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-pc me-2"></i> Equipos
            </h5>
            <p class="card-text fs-4">{{ dashboard.total_equipos }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3" key="oficinas">
        <div class="card text-white bg-secondary">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-building me-2"></i> Oficinas
            </h5>
            <p class="card-text fs-4">{{ dashboard.total_oficinas }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3" key="malogrados">
        <div class="card text-white bg-danger">
          <div class="card-body">
            <h5 class="card-title">
              <i class="bi bi-exclamation-triangle me-2"></i> Malogrados
            </h5>
            <p class="card-text fs-4">{{ dashboard.equipos_malogrados }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Accesos rápidos -->
    <div class="mb-4">
      <h4>Accesos rápidos</h4>
      <div class="d-flex flex-wrap gap-2">
        <router-link to="/inventory/new" class="btn btn-success">
          <i class="bi bi-plus-circle me-1"></i> Nuevo inventario
        </router-link>
        <router-link to="/inventory" class="btn btn-primary">
          <i class="bi bi-clipboard-data me-1"></i> Ver inventarios
        </router-link>
      </div>
    </div>
    <div class="mb-4 d-flex justify-content-center">
      <div style="max-width: 400px; width: 100%;">
        <Pie :data="charData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import api from '@/services/api'
import { username } from '@/store/auth'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const dashboard = reactive({
  "total_inventarios": 0,
  "total_equipos": 0,
  "total_oficinas": 0,
  "equipos_buenos": 0,
  "equipos_regulares": 0,
  "equipos_malogrados": 0,
})


onMounted(async () => {
  try {
    const response = await api.get('dashboard/')
    Object.assign(dashboard, response.data)
  } catch (error) {
    console.log(error)
  }
})


const charData = computed(() => ({
  labels: ['Bueno', 'Regular', 'Malogrado'],
  datasets: [{
    label: 'Estado de Equipos',
    data: [
      dashboard.equipos_buenos,
      dashboard.equipos_regulares,
      dashboard.equipos_malogrados,
    ],
    backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
  }],
}))


</script>

<style scoped>
.card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
