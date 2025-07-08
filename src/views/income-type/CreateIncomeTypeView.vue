<script setup>
// Crear Nuevo Tipo de Ingreso
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


async function crearTipoIngreso() {
    try {
        const response = await api.post('tipo-ingresos/', form)
        enviado.value = true
        console.log('Tipo de Ingreso creado con éxito:', response.data)
    } catch (error) {
        console.error('Error al crear Tipo de Ingreso:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Crear Tipo de Ingreso</h2>
        <div v-if="loading">Cargando datos</div>
        <div v-else>
            <form @submit.prevent="crearTipoIngreso">
                <div class="mb-3">
                    <label for="tinombre" class="form-label fw-bold">Nombre</label>
                    <input type="text" id="tinombre" class="form-control" v-model="form.nombre"
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