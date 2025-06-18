<script setup>
import { reactive, ref, onMounted } from 'vue'
//import axios from 'axios'

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
        //const response = await axios.post('http://127.0.0.1:8000/api/ubications/', form)
        enviado.value = true
        console.log('Ubicación creada con éxito:', undefined)
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
                    <label for="nombre" class="form-label fw-bold">Nombre</label>
                    <input type="text" id="nombre" class="form-control" v-model="form.nombre"
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