<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const ubicacion = ref({})


onMounted(async () => {
    try {
        const response = await api.get(`ubicaciones/${props.id}`)
        ubicacion.value = response.data
    } catch (error) {
        console.error(error)
    }
})


</script>

<template>

    <div class="container mt-5">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2 class="mb-4">Detalles de la Ubicación</h2>

        <div v-if="ubicacion" class="card shadow-sm border-0">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="card-title text-primary mb-0">{{ ubicacion.nombre }}</h4>
                            <button @click="$router.push({ name: 'UpdateUbication', params: { id: ubicacion.id } })"
                                class="btn btn-success btn-sm">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                        </div>


                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ ubicacion.id }}</li>
                            <li class="list-group-item"><strong>Nombre:</strong> {{ ubicacion.nombre }}</li>
                        </ul>
                        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm">← Volver</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            Ubicación no encontrada.
        </div>
    </div>

</template>

<style scoped></style>