<script setup>
import { reactive, ref, onMounted } from 'vue'
//import api from '@/services/api'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    nombre: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(async () => {
    form.value = {id: props.id, nombre: "Un nombre de Tipo de Ingreso"}
    loading.value = true
})

// Función al enviar el formulario
async function actualizarTipoIngreso() {
    try {
        //const response = await api.put(`ubicaciones/${props.id}`, form)
        enviado.value = true
        console.log('Ubicación actualizada con éxito:', undefined)
    } catch (error) {
        console.error('Error al actualizar Ubicación:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Actualizar Tipo de Ingreso</h2>

        <form @submit.prevent="actualizarTipoIngreso">
            <div class="mb-3">
                <label for="tinombre" class="form-label fw-bold">Nombre</label>
                <input type="text" id="tinombre" class="form-control" v-model="form.nombre"
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