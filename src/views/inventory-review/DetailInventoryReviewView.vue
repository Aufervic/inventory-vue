<script setup>
import { ref, onMounted, computed } from 'vue'
//import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const revisionInventario = ref({})


onMounted(() => {
    /*api
        .get(`equipos/${props.id}`)
        .then(response => (revisionInventario.value = response.data))
        .catch(error => console.log(error))*/

    revisionInventario.value = {
        id: props.id,
        inventario_id: props.id,
        equipo_id: props.id,
        ubicacion_ercontrada: props.id,
        estado_encontrado: props.id,
        encontrado: true, 
        correccion_datos: false, 
        observaciones: "observacion "+props.id, 
        fecha_revision: "2025-06-30"
    }
})

// Clase de color según estado
const estadoClase = computed(() => {
    if (!revisionInventario.value) return ''
    switch (revisionInventario.value.estado) {
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
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2 class="mb-4">Detalles de la Revisión de Inventario</h2>

        <div v-if="revisionInventario" class="card shadow-sm border-0">
            <div class="row g-0">
                <!-- Imagen de ejemplo (opcional) -->
                <div class="col-md-4 d-flex align-items-center justify-content-center bg-light">
                    <i class="bi bi-hdd-network text-secondary" style="font-size: 5rem;"></i>
                </div>


                <div class="col-md-8">
                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="card-title text-primary mb-0">{{ revisionInventario.id }}</h4>
                            <button @click="$router.push({ name: 'UpdateInventoryReview', params: { id: revisionInventario.id } })"
                                class="btn btn-success btn-sm">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                        </div>

                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ revisionInventario.id }}</li>
                            <li class="list-group-item"><strong>Nombre Inventario:</strong> {{
                                revisionInventario.inventario_id }}</li>
                            <li class="list-group-item"><strong>Equipo:</strong> {{ revisionInventario.equipo_id
                                }}</li>
                            <li class="list-group-item"><strong>Ubicación:</strong> {{
                                revisionInventario.ubicacion_ercontrada}}</li>
                            <li class="list-group-item"><strong>Estado:</strong> {{ revisionInventario.estado_encontrado }}</li>
                            <li class="list-group-item"><strong>¿Encontrado?:</strong> {{ revisionInventario.encontrado }}</li>
                            <li class="list-group-item"><strong>¿Datos Corregidos?:</strong> {{ revisionInventario.correccion_datos
                                }}</li>
                            <li class="list-group-item"><strong>Observaciones:</strong> {{
                                revisionInventario.observaciones }}</li>
                            <li class="list-group-item"><strong>Fecha:</strong> {{ revisionInventario.fecha_revision }}
                            </li>
                            
                        </ul>
                        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm">← Volver</button>
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