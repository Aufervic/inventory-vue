<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const movimiento = ref({})

onMounted(async () => {
    try {
        const response = await api.get(`movimientos/${props.id}?expand=equipo,ubicacion`)
        console.log(response.data)
        movimiento.value = response.data
    } catch (error) {
        console.error(error)
    }
})

</script>

<template>

    <div class="container mt-5">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2 class="mb-4">Detalles del Movimiento</h2>

        <div v-if="Object.keys(movimiento).length" class="card shadow-sm border-0">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="card-title text-primary mb-0">{{ movimiento.id }}</h4>
                            <button
                                @click="$router.push({ name: 'UpdateMovement', params: { id: movimiento.id } })"
                                class="btn btn-success btn-sm">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                        </div>

                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ movimiento.id }}</li>
                            <li class="list-group-item"><strong>Fecha del movimiento:</strong> {{
                                movimiento.fecha_movimiento }}</li>
                            <li class="list-group-item"><strong>Observaciones:</strong> {{ movimiento.observaciones }}
                            </li>
                            <li class="list-group-item"><strong>Equipo:</strong> {{
                                movimiento.id_equipo.codigo_patrimonial }}</li>
                            <li class="list-group-item"><strong>Ubicación:</strong> {{ movimiento.ubicacion.nombre }}
                            </li>
                        </ul>
                        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm">← Volver</button>
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