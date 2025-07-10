<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/services/api'

const form = reactive({
    id: '',
    estado: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(() => {
    loading.value = false
})


async function crearEstado() {
    try {
        enviado.value = true
        await api.post('estados/', form)
        console.log('Estado creado con éxito')
    } catch (error) {
        console.error('Error al crear Estado:', error)
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <div class="container mt-4">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2>Crear Estado</h2>
        <div v-if="loading">Cargando datos</div>
        <div v-else>
            <form @submit.prevent="crearEstado">
                <div class="mb-3">
                    <label for="estado" class="form-label fw-bold">Estado</label>
                    <input type="text" id="estado" class="form-control" v-model="form.estado"
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