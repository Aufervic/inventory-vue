<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    nombre: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(async () => {
    loading.value = true
})

// Función al enviar el formulario
async function actualizarUbicacion() {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/equipos/${props.id}`, form)
        enviado.value = true
        console.log('Equipo actualizado con éxito:', response.data)
    } catch (error) {
        console.error('Error al actualizar equipo:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Actualizar Ubicación</h2>

        <form @submit.prevent="actualizarUbicacion">
            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Nombre</label>
                <input type="text" id="nombre" class="form-control" v-model="form.nombre"
                    required />
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
</template>


<style lang="scss" scoped></style>