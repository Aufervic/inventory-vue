<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
const equipments = ref([])

onMounted(() => {
  axios
    .get('http://127.0.0.1:8000/api/equipos/')
    .then(response => (equipments.value = response.data))
    .catch(error => console.log(error))
})

const createNewEquipment = () => {
  console.log("POST")
}

function editar(equipment) {
  alert(`Editar: ${equipment.codigo_patrimonial}`)
}

async function eliminarEquipo(equipment) {
  //alert(`Eliminar: ${equipment.codigo_patrimonial}`)
  if (!confirm(`¿Estás seguro de que deseas eliminar el equipo "${equipment.codigo_patrimonial}"?`)) {
    return;
  }

  try {
    await axios.delete(`http://127.0.0.1:8000/api/equipos/${equipment.id}`);
    equipments.value = equipments.value.filter(e => e.id !== equipment.id);
    alert('Equipo eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el equipo:', error);
    alert('Hubo un problema al eliminar el equipo');
  }
}

function verDetalles(equipment) {
  alert(`Detalles de: ${equipment.codigo_patrimonial}`)
}

</script>

<template>
  <div>
    <h1>Equipos</h1>
    <router-link to="/equipment/new">
      <button @click="createNewEquipment">Agregar Equipo Nuevo</button>
    </router-link>
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
          <tr v-for="(equipment, index) in equipments" :key="index">
            <td>{{ equipment.id }}</td>
            <td>{{ equipment.codigo_patrimonial }}</td>
            <td>{{ equipment.numero_serie }}</td>
            <td>{{ equipment.marca }}</td>
            <td>{{ equipment.modelo }}</td>
            <td>{{ equipment.fecha_alta }}</td>
            <td>{{ equipment.fecha_compra }}</td>
            <td>{{ equipment.numero_o_c }}</td>
            <td>{{ equipment.numero_nea }}</td>
            <td>{{ equipment.centro_costos }}</td>
            <td>{{ equipment.tipo_ingreso.nombre }}</td>
            <td>{{ equipment.estado.estado }}</td>
            <td>{{ equipment.ubicacion.nombre }}</td>
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
                    <a class="dropdown-item" href="#" @click.prevent="eliminarEquipo(equipment)">Eliminar</a>
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