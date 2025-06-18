<script setup>

import { ref, onMounted } from 'vue'
//import axios from 'axios'

const estados = ref([])

onMounted(() => {
    estados.value = [
        {id: 1, estado: "Estado 1"},
        {id: 2, estado: "Estado 2"},
        {id: 3, estado: "Estado 3"},
        {id: 3, estado: "Estado 3"},
        {id: 4, estado: "Estado 4"},
    ]
})


async function eliminarEstado(estado) {
  if (!confirm(`¿Estás seguro de que deseas eliminar el Estado "${estado.estado}"?`)) {
    return;
  }

  try {
    //await axios.delete(`http://127.0.0.1:8000/api/estados/${estado.id}`);
    estados.value = estados.value.filter(e => e.id !== estado.id);
    alert('Estado eliminado correctamente.');
  } catch (error) {
    console.error('Error al eliminar el Estado:', error);
    alert('Hubo un problema al eliminar el Estado');
  }
}

</script>


<template>
    <div>
        <h1>Estados</h1>
        <router-link to="/state/new">
            <button>Agregar Nuevo Estado</button>
        </router-link>
        <div class="container mt-4">
            <h2>Tabla de Estados</h2>
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
                    <tr v-for="(estado, index) in estados" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ estado.id }}</td>
                        <td>{{ estado.estado }}</td>
                        
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
                                    id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acciones
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <router-link :to="`/state/${estado.id}`" class="dropdown-item">Ver
                                            Detalles</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="`/state/update/${estado.id}`"
                                            class="dropdown-item">Editar</router-link>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"
                                            @click.prevent="eliminarEstado(estado)">Eliminar</a>
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