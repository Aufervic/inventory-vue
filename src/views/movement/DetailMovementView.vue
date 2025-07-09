<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const movimiento = ref({})

onMounted(async() => {
    try{
        const response = await api.get(`movimientos/${props.id}`)
        movimiento.value = response.data
    } catch (error) {
        console.error(error)
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
                            <li class="list-group-item"><strong>Equipo:</strong> {{ movimiento.id_equipo }}</li>
                            <li class="list-group-item"><strong>Ubicación:</strong> {{ movimiento.ubicacion }}</li>
                        </ul>
                        <router-link to="/movement" class="btn btn-outline-primary btn-sm">← Volver</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            Movimiento no encontrado.
        </div>
    </div>

</template>

<style scoped></style>