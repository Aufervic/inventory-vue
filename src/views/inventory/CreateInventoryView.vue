<script setup>
import { reactive, ref, onMounted } from 'vue'
//import api from '@/services/api'

const form = reactive({
    id: '',
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(async () => {
    loading.value = false
})


async function crearInventario() {
    try {
        //const response = await api.post('movimientos/', form)
        enviado.value = true
        console.log('Inventario creado con éxito:', undefined)
    } catch (error) {
        console.error('Error al crear Inventario:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2>Crear Inventario Nuevo</h2>
        <div v-if="loading">Cargando datos</div>
        <div v-else>
            <form @submit.prevent="crearInventario">
                <div class="mb-3">
                    <label for="inombre" class="form-label fw-bold">Nombre del Inventario</label>
                    <input type="text" id="inombre" class="form-control" v-model="form.nombre"
                        required />
                </div>

                <div class="mb-3">
                    <label for="fecha_inicio" class="form-label fw-bold">Fecha de Inicio</label>
                    <input type="date" id="fecha_inicio" class="form-control" v-model="form.fecha_inicio" required />
                </div>

                <div class="mb-3">
                    <label for="fecha_fin" class="form-label fw-bold">Fecha Fin</label>
                    <input type="date" id="fecha_fin" class="form-control" v-model="form.fecha_fin"/>
                </div>

                <div class="mb-3">
                    <label for="descripcion" class="form-label fw-bold">Descripción</label>
                    <textarea type="text" id="descripcion" class="form-control" v-model="form.descripcion"
                        required></textarea>
                </div>


                <!-- Botón de envío -->
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </form>

            <!-- Mostrar datos enviados -->
            <div v-if="enviado" class="alert alert-success mt-4">
                <strong>Formulario enviado:</strong>
                <pre>{{ form }}</pre>
            </div>
        </div>

    </div>
</template>


<style></style>