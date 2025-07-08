<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const responsable = ref({})


onMounted(async () => {
    try {
        const response = await api.get(`responsables/${props.id}`)
        responsable.value = response.data
    } catch(error){
        console.error(error)
    }
})



</script>

<template>

    <div class="container mt-5">
        <h2 class="mb-4">Detalles del Responsable</h2>

        <div v-if="responsable" class="card shadow-sm border-0">
            <div class="row g-0">
                <!-- Imagen de ejemplo (opcional) -->
                <div class="col-md-4 d-flex align-items-center justify-content-center bg-light">
                    <i class="bi bi-hdd-network text-secondary" style="font-size: 5rem;"></i>
                </div>


                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary">{{ responsable.nombre }}</h4>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ responsable.id }}</li>
                            <li class="list-group-item"><strong>Nombre:</strong> {{ responsable.nombre }}</li>
                            <li class="list-group-item"><strong>Apellidos:</strong> {{ responsable.apellidos }}</li>
                            <li class="list-group-item"><strong>DNI:</strong> {{ responsable.dni }}</li>
                            <li class="list-group-item"><strong>Celular:</strong> {{ responsable.celular }}</li>
                            
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