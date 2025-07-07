<script setup>
import { ref, onMounted, computed } from 'vue'
//import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const inventario = ref({})


onMounted(() => {
    inventario.value = {
        id: props.id,
        nombre: "Inventario "+props.id,
        fecha_inicio: "2025-06-18",
        fecha_fin: "2025-07-18",
        descripcion: "Un buena descripcion",
        
    }
})

</script>

<template>

    <div class="container mt-5">
        <h2 class="mb-4">Detalles del Inventario</h2>

        <div v-if="inventario" class="card shadow-sm border-0">
            <div class="row g-0">
                  <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary">{{ inventario.id }}</h4>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ inventario.id }}</li>
                            <li class="list-group-item"><strong>Nombre:</strong> {{ inventario.nombre }}</li>
                            <li class="list-group-item"><strong>Fecha de Inicio:</strong> {{ inventario.fecha_inicio }}</li>
                            <li class="list-group-item"><strong>Fecha Fin:</strong> {{ inventario.fecha_fin }}</li>
                            <li class="list-group-item"><strong>Descripción:</strong> {{ inventario.descripcion }}</li>
                        </ul>
                        <router-link to="/movement" class="btn btn-outline-primary btn-sm">← Volver</router-link>

                        <router-link :to="`/inventory/${inventario.id}/revision`" class="btn btn-success btn-sm ms-2">
                            <i class="bi bi-clipboard-check me-1"></i>
                            Iniciar revisión
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="alert alert-warning">
            Inventario no encontrado.
        </div>
    </div>

</template>

<style scoped></style>