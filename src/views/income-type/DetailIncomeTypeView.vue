<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const tipoDeIngreso = ref({})


onMounted(async () => {
    try {
        const response = await api.get(`tipo-ingresos/${props.id}`)
        tipoDeIngreso.value = response.data
    } catch (error) {
        console.error(error)
    }
})


</script>

<template>

    <div class="container mt-5">
        <h2 class="mb-4">Detalles del Tipo Ingreso</h2>

        <div v-if="tipoDeIngreso" class="card shadow-sm border-0">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary">{{ tipoDeIngreso.nombre }}</h4>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ tipoDeIngreso.id }}</li>
                            <li class="list-group-item"><strong>Nombre:</strong> {{ tipoDeIngreso.nombre }}</li>
                        </ul>
                        <router-link to="/income-type" class="btn btn-outline-primary btn-sm">← Volver</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            Tipo de ingreso no encontrado.
        </div>
    </div>

</template>

<style scoped></style>