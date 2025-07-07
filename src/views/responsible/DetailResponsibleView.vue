<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])  // Recibes el parámetro `id` como prop

const responsable = ref({})


onMounted(() => {
    /*api
        .get(`responsables/${props.id}`)
        .then(response => (responsable.value = response.data))
        .catch(error => console.log(error))*/

        responsable.value = [
        { id: 1, nombre: 'Juan', apellidos: 'Pérez Gómez', dni: '74561234', celular: '987654321' },
        { id: 2, nombre: 'María', apellidos: 'López Díaz', dni: '75612345', celular: '976543210' },
        { id: 3, nombre: 'Carlos', apellidos: 'Ramírez Torres', dni: '71234567', celular: '965432109' },
        { id: 4, nombre: 'Lucía', apellidos: 'Fernández Vega', dni: '70123456', celular: '954321098' },
        { id: 5, nombre: 'José', apellidos: 'García Méndez', dni: '79876543', celular: '943210987' },
        { id: 6, nombre: 'Ana', apellidos: 'Sánchez Ruiz', dni: '72345678', celular: '932109876' },
        { id: 7, nombre: 'Luis', apellidos: 'Castro Rojas', dni: '73456789', celular: '921098765' },
        { id: 8, nombre: 'Patricia', apellidos: 'Martínez León', dni: '74567890', celular: '910987654' },
        { id: 9, nombre: 'Ricardo', apellidos: 'Vargas Soto', dni: '75678901', celular: '999876543' },
        { id: 10, nombre: 'Diana', apellidos: 'Cruz Moreno', dni: '76789012', celular: '988765432' }
    ][parseInt(props.id) -1]
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