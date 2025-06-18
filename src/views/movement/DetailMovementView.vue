<script setup>
import { ref, onMounted, computed } from 'vue'
//import axios from 'axios'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const movimiento = ref({})


onMounted(() => {
    movimiento.value = {
        fecha_movimiento: "2025-06-18",
        observaciones: "Un buena observación",
        id_equipo_id: 1,
        ubicacion_id: 1,
    }
})

</script>

<template>

    <div class="container mt-5">
        <h2 class="mb-4">Detalles del Movimiento</h2>

        <div v-if="movimiento" class="card shadow-sm border-0">
            <div class="row g-0">
                  <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary">{{ movimiento.id }}</h4>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ movimiento.id }}</li>
                            <li class="list-group-item"><strong>Fecha del movimiento:</strong> {{ movimiento.fecha_movimiento }}</li>
                            <li class="list-group-item"><strong>Observaciones:</strong> {{ movimiento.observaciones }}</li>
                            <li class="list-group-item"><strong>Equipo:</strong> {{ movimiento.id_equipo_id }}</li>
                            <li class="list-group-item"><strong>Ubicación:</strong> {{ movimiento.ubicacion_id }}</li>
                        </ul>
                        <router-link to="/movement" class="btn btn-outline-primary btn-sm">← Volver</router-link>
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