<script setup>
import { ref, onMounted, computed } from 'vue'
//import axios from 'axios'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const ubicacion = ref({})


onMounted(() => {
    ubicacion.value = {id: props.id, nombre: "un nombre"}
})


</script>

<template>

    <div class="container mt-5">
        <h2 class="mb-4">Detalles de la Ubicación</h2>

        <div v-if="ubicacion" class="card shadow-sm border-0">
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary">{{ ubicacion.nombre }}</h4>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>ID:</strong> {{ ubicacion.id }}</li>
                            <li class="list-group-item"><strong>Nombre:</strong> {{ ubicacion.nombre }}</li>
                        </ul>
                        <router-link to="/ubication" class="btn btn-outline-primary btn-sm">← Volver</router-link>
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