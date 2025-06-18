<script setup>

import { ref, onMounted } from 'vue'
//import axios from 'axios'

const ubicaciones = ref([])

onMounted(() => {
    ubicaciones.value = [
        {id: 1, nombre: "Ubicación 1"},
        {id: 2, nombre: "Ubicación 2"},
        {id: 3, nombre: "Ubicación 3"},
    ]
 
})


async function eliminarUbicacion(ubicacion) {
  if (!confirm(`¿Estás seguro de que deseas eliminar la Ubicación "${ubicacion.nombre}"?`)) {
    return;
  }

  try {
    //await axios.delete(`http://127.0.0.1:8000/api/ubicaciones/${ubicacion.id}`);
    ubicaciones.value = ubicaciones.value.filter(e => e.id !== ubicacion.id);
    alert('Ubicación eliminada correctamente.');
  } catch (error) {
    console.error('Error al eliminar la Ubicación:', error);
    alert('Hubo un problema al eliminar la Ubicación');
  }
}

</script>


<template>
    <div>
        <h1>Ubicaciones</h1>
        <router-link to="/ubication/new">
            <button>Agregar Nueva Ubicación</button>
        </router-link>
        <div class="container mt-4">
            <h2>Tabla de Ubicaciones</h2>
            <table class="table table-striped table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ubicacion, index) in ubicaciones" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ ubicacion.id }}</td>
                        <td>{{ ubicacion.nombre }}</td>
                        
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <router-link :to="`/ubication/${ubicacion.id}`" class="dropdown-item">Ver
                                            Detalles</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="`/ubication/update/${ubicacion.id}`"
                                            class="dropdown-item">Editar</router-link>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"
                                            @click.prevent="eliminarUbicacion(ubicacion)">Eliminar</a>
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