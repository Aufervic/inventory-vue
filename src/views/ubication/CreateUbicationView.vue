<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/services/api'

const form = reactive({
    id: '',
    nombre: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(() => {
    loading.value = false
})


async function crearUbicacion() {
    try {
        const response = await api.post('ubicaciones/', form)
        enviado.value = true
        console.log('Ubicación creada con éxito:', response.data)
    } catch (error) {
        console.error('Error al crear Ubicación:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Crear Ubicación</h2>
        <div v-if="loading">Cargando datos</div>
        <div v-else>
            <form @submit.prevent="crearUbicacion">
                <div class="mb-3">
                    <label for="unombre" class="form-label fw-bold">Nombre</label>
                    <input type="text" id="unombre" class="form-control" v-model="form.nombre"
                        required />
                </div>
 
                <!-- Botón de envío -->
                <button type="submit" class="btn btn-primary">Crear</button>
            </form>

            <!-- Mostrar datos enviados -->
            <div v-if="enviado" class="alert alert-success mt-4">
                <strong>Formulario enviado:</strong>
                <pre>{{ form }}</pre>
            </div>
        </div>

    </div>
</template>


<style scoped></style>