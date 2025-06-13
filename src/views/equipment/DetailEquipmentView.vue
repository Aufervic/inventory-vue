<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const equipment = ref({})


onMounted(() => {
    axios
        .get(`http://127.0.0.1:8000/api/equipos/${props.id}`)
        .then(response => (equipment.value = response.data))
        .catch(error => console.log(error))
})

// Clase de color según estado
const estadoClase = computed(() => {
  if (!equipment.value) return ''
  switch (equipment.value.estado) {
    case 'Activo':
      return 'badge bg-success'
    case 'En reparación':
      return 'badge bg-warning text-dark'
    case 'Inactivo':
      return 'badge bg-secondary'
    default:
      return 'badge bg-light text-dark'
  }
})

</script>

<template>

    <div class="container mt-5">
        <h2 class="mb-4">Detalles del Equipo</h2>

        <div v-if="equipment" class="card shadow-sm border-0">
            <div class="row g-0">
                <!-- Imagen de ejemplo (opcional) -->
                <div class="col-md-4 d-flex align-items-center justify-content-center bg-light">
                    <i class="bi bi-hdd-network text-secondary" style="font-size: 5rem;"></i>
                </div>


                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary">{{ equipment.codigo_patrimonial }}</h4>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ equipment.id }}</li>
                            <li class="list-group-item"><strong>Código Patrimonial:</strong> {{ equipment.codigo_patrimonial }}</li>
                            <li class="list-group-item"><strong>Descripción:</strong> {{ equipment.descripcion }}</li>
                            <li class="list-group-item"><strong>Número de Serie:</strong> {{ equipment.numero_serie }}</li>
                            <li class="list-group-item"><strong>Marca:</strong> {{ equipment.marca }}</li>
                            <li class="list-group-item"><strong>Modelo:</strong> {{ equipment.modelo }}</li>
                            <li class="list-group-item"><strong>Fecha de Alta:</strong> {{ equipment.fecha_alta }}</li>
                            <li class="list-group-item"><strong>Fecha de Compra:</strong> {{ equipment.fecha_compra }}</li>
                            <li class="list-group-item"><strong>Número OC:</strong> {{ equipment.numero_o_c }}</li>
                            <li class="list-group-item"><strong>Número NEA:</strong> {{ equipment.numero_nea }}</li>
                            <li class="list-group-item"><strong>Centro de Costos:</strong> {{ equipment.centro_costos }}</li>
                            <li class="list-group-item"><strong>Tipo de Ingreso:</strong> {{ equipment.tipo_ingreso }} </li>
                            <li class="list-group-item"><strong>Estado:</strong>
                                <span :class="estadoClase">{{ equipment.estado }}</span>
                            </li>
                            <li class="list-group-item"><strong>Ubicación:</strong> {{ equipment.ubicacion }} </li>
                        </ul>
                        <router-link to="/" class="btn btn-outline-primary btn-sm">← Volver</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            Equipo no encontrado.
        </div>
    </div>

</template>

<style scoped></style>