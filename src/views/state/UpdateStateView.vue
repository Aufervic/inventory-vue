<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    estado: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(async () => {
    loading.value = true
    try{
        const response = await api.get(`estados/${props.id}`)
        Object.assign(form, response.data)
    } catch (error){
        console.error(error)
    }
})

// Función al enviar el formulario
async function actualizarUbicacion() {
    try {
        const response = await api.put(`estados/${props.id}/`, form)
        enviado.value = true
        console.log('Estado actualizado con éxito:', response.data)
    } catch (error) {
        console.error('Error al actualizar Estado:', error)
    } 
}

</script>

<template>
    <div class="container mt-4">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2>Actualizar Estado</h2>

        <form @submit.prevent="actualizarUbicacion">
            <div class="mb-3">
                <label for="estado" class="form-label fw-bold">Estado</label>
                <input type="text" id="estado" class="form-control" v-model="form.estado"
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