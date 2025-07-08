<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/services/api'

const form = reactive({
    nombre: '',
    apellidos: '',
    dni: '',
    celular: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)

onMounted(async () => {

    loading.value = false
})

async function crearResponsable() {
    try {
        const response = await api.post('responsables/', form)
        enviado.value = true
        console.log('Responsable creado con éxito:', response.data)
    } catch (error) {
        console.error('Error al crear Responsable:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Crear Responsable Nuevo</h2>
        <div v-if="loading">Cargando datos</div>
        <div v-else>
            <form @submit.prevent="crearResponsable">
                <div class="mb-3">
                    <label for="rnombre" class="form-label fw-bold">Nombre</label>
                    <input type="text" id="rnombre" class="form-control" v-model="form.nombre" required />
                </div>

                <div class="mb-3">
                    <label for="r-apellidos" class="form-label fw-bold">Apellidos</label>
                    <input type="text" id="r-apellidos" class="form-control" v-model="form.apellidos" required />
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

    </div>
</template>


<style lang="scss" scoped></style>