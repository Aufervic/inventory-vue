<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
const data = ref([])

onMounted(() => {
  axios
    .get('http://127.0.0.1:8000/api/equipos/')
    .then(response => (data.value = response.data))
    .catch(error => console.log(error))
})

const post = () => {
  console.log("POST")
}

function editar(equipment) {
  alert(`Editar: ${equipment.codigo_patrimonial}`)
}

function eliminar(equipment) {
  alert(`Eliminar: ${equipment.codigo_patrimonial}`)
}

function verDetalles(equipment) {
  alert(`Detalles de: ${equipment.codigo_patrimonial}`)
}

</script>

<template>
  <div>
    <h1>Equipos</h1>
    <button @click="post">POST</button>
    <div class="container mt-4">
      <h2>Tabla de Equipos</h2>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Código patrimonial</th>
            <th>Número de Serie</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Fecha Alta</th>
            <th>Fecha Compra</th>
            <th>Número OC</th>
            <th>Número NEA</th>
            <th>Centro Costos</th>
            <th>Tipo de Ingreso</th>
            <th>Estado</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(equipment, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ equipment.codigo_patrimonial }}</td>
            <td>{{ equipment.numero_serie }}</td>
            <td>{{ equipment.marca }}</td>
            <td>{{ equipment.modelo }}</td>
            <td>{{ equipment.fecha_alta }}</td>
            <td>{{ equipment.fecha_compra }}</td>
            <td>{{ equipment.numero_o_c }}</td>
            <td>{{ equipment.numero_nea }}</td>
            <td>{{ equipment.centro_costos }}</td>
            <td>{{ equipment.tipo_ingreso }}</td>
            <td>{{ equipment.estado }}</td>
            <td>{{ equipment.ubicacion }}</td>
            <td>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Acciones
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <router-link :to="`/equipment/${equipment.id}`" class="dropdown-item">Ver Detalles</router-link>
                  </li>
                  <li>
                    <router-link :to="`/equipment/update/${equipment.id}`" class="dropdown-item">Editar</router-link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="eliminar(equipment)">Eliminar</a>
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