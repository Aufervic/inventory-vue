<template>
  <div class="container mt-4">
    <!-- Bienvenida -->
    <h2 class="mb-4">Bienvenido, {{ username }} 👋</h2>

    <!-- Tarjetas resumen -->
    <div class="row mb-4">
      <div class="col-md-3" v-for="card in resumen" :key="card.label">
        <div class="card text-white" :class="card.color">
          <div class="card-body">
            <h5 class="card-title">
              <i :class="['bi', card.icon, 'me-2']"></i> {{ card.label }}
            </h5>
            <p class="card-text fs-4">{{ card.valor }}</p>
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
        <Pie :data="data" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  ArcElement,
} from 'chart.js'

const username = 'Aufer'

const resumen = [
  { label: 'Inventarios', valor: 12, icon: 'bi-clipboard', color: 'bg-primary' },
  { label: 'Equipos', valor: 256, icon: 'bi-pc', color: 'bg-success' },
  { label: 'Oficinas', valor: 14, icon: 'bi-building', color: 'bg-secondary' },
  { label: 'Desaparecidos', valor: 13, icon: 'bi-exclamation-triangle', color: 'bg-danger' },
]


ChartJS.register(Title, Tooltip, Legend, ArcElement)

const data = {
  labels: ['Bueno', 'Regular', 'Malogrado'],
  datasets: [{
    label: 'Estado de Equipos',
    data: [50, 20, 5],
    backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
  }]
}

</script>

<style scoped>
.card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
