<script setup>
import { ref, onMounted, computed } from 'vue'
//import api from '@/services/api'
import { formatearFecha } from '@/utils/fechas'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const inventario = ref({})


onMounted(() => {
    inventario.value = {
        id: props.id,
        nombre: "Inventario " + props.id,
        fecha_inicio: "2025-06-18",
        fecha_fin: "2025-07-18",
        descripcion: "Un buena descripcion",

    }
})

</script>

<template>

    <div class="container mt-5">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2 class="mb-4">Detalles del Inventario</h2>

        <div v-if="inventario" class="card shadow-sm border-0">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="card-title text-primary mb-0">{{ inventario.id }}</h4>
                            <button @click="$router.push({ name: 'UpdateInventory', params: { id: inventario.id } })"
                                class="btn btn-success btn-sm">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                        </div>

                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ inventario.id }}</li>
                            <li class="list-group-item"><strong>Nombre:</strong> {{ inventario.nombre }}</li>
                            <li class="list-group-item"><strong>Fecha de Inicio:</strong> {{ formatearFecha(inventario.fecha_inicio) }}
                            </li>
                            <li class="list-group-item"><strong>Fecha Fin:</strong> {{ formatearFecha(inventario.fecha_fin) }}</li>
                            <li class="list-group-item"><strong>Descripción:</strong> {{ inventario.descripcion }}</li>
                        </ul>
                        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm">← Volver</button>

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