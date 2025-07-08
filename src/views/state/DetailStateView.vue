<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const estado = ref({})


onMounted(async () => {
    try {
        const response = await api.get(`estados/${props.id}`)
        estado.value = response.data
    } catch (error) {
        console.error(error)
    }
})


</script>

<template>

    <div class="container mt-5">
        <h2 class="mb-4">Detalles del Estado</h2>

        <div v-if="estado" class="card shadow-sm border-0">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary">{{ estado.estado }}</h4>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ estado.id }}</li>
                            <li class="list-group-item"><strong>Nombre:</strong> {{ estado.estado }}</li>
                        </ul>
                        <router-link to="/state" class="btn btn-outline-primary btn-sm">← Volver</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            Estado no encontrado.
        </div>
    </div>

</template>

<style scoped></style>