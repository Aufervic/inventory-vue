<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    nombre: '',
    apellidos: '',
    dni: '',
    celular: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(async () => {
    try {
        loading.value = true

        const response = await api.get(`responsables/${props.id}`)
        Object.assign(form, response.data)
    } catch (error) {
        console.error('Error al cargar Datos:', error)
    } finally {
        loading.value = false
    }

})

// Función al enviar el formulario
async function actualizarResponsable() {
    try {
        const response = await api.put(`responsables/${props.id}/`, form)
        enviado.value = true
        console.log('Responsable actualizado con éxito:', response.data)
    } catch (error) {
        console.error('Error al actualizar Responsable:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2>Actualizar Responsable</h2>

        <form @submit.prevent="actualizarResponsable">
            <div class="mb-3">
                <label for="rnombre" class="form-label fw-bold">Nombre</label>
                <input type="text" id="rnombre" class="form-control" v-model="form.nombre"
                    required />
            </div>

            <div class="mb-3">
                <label for="r-apellidos" class="form-label fw-bold">Apellidos</label>
                <input type="text" id="r-apellidos" class="form-control" v-model="form.apellidos"
                    required />
            </div>

            <div class="mb-3">
                <label for="rdni" class="form-label fw-bold">DNI</label>
                <input type="text" id="rdni" class="form-control" v-model="form.dni" required />
            </div>

            <div class="mb-3">
                <label for="rcelular" class="form-label fw-bold">Celular</label>
                <input type="text" id="rcelular" class="form-control" v-model="form.celular" required />
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