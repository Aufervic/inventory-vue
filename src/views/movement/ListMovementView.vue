<script setup>

import { ref, onMounted } from 'vue'
//import axios from 'axios'

const movimientos = ref([])

onMounted(() => {
  movimientos.value = [
    {id: 1, fecha_movimiento: "2025-06-17", observaciones: "Un observación God", id_equipo_id: 1, ubicacion_id: 1},
    {id: 2, fecha_movimiento: "2025-06-18", observaciones: "Otra observación God", id_equipo_id: 2, ubicacion_id: 3}
  ]
})


async function eliminarMovimiento(movimiento) {
  if (!confirm(`¿Estás seguro de que deseas eliminar el Movimiento "${movimiento.codigo_patrimonial}"?`)) {
    return;
  }

  try {
    //await axios.delete(`http://127.0.0.1:8000/api/movimientos/${movimiento.id}`);
    movimientos.value = movimientos.value.filter(e => e.id !== movimiento.id);
    alert('Movimiento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el Movimiento:', error);
    alert('Hubo un problema al eliminar el Movimiento');
  }
}

</script>

<template>
  <div>
    <h1>Movimientos</h1>
    <router-link to="/movement/new">
      <button>Agregar Movimiento Nuevo</button>
    </router-link>
    <div class="container mt-4">
      <h2>Tabla de Movimientos</h2>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Equipo</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movimiento, index) in movimientos" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ movimiento.id }}</td>
            <td>{{ movimiento.fecha_movimiento }}</td>
            <td>{{ movimiento.observaciones }}</td>
            <td>{{ movimiento.id_equipo_id }}</td>
            <td>{{ movimiento.ubicacion_id }}</td>
            <td>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Acciones
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <router-link :to="`/movement/${movimiento.id}`" class="dropdown-item">Ver Detalles</router-link>
                  </li>
                  <li>
                    <router-link :to="`/movement/update/${movimiento.id}`" class="dropdown-item">Editar</router-link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="eliminarMovimiento(movimiento)">Eliminar</a>
                  </li>
                </ul>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped></style>