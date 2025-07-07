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
        Object.assign(form, [
            { id: 1, nombre: 'Juan', apellidos: 'Pérez Gómez', dni: '74561234', celular: '987654321' },
            { id: 2, nombre: 'María', apellidos: 'López Díaz', dni: '75612345', celular: '976543210' },
            { id: 3, nombre: 'Carlos', apellidos: 'Ramírez Torres', dni: '71234567', celular: '965432109' },
            { id: 4, nombre: 'Lucía', apellidos: 'Fernández Vega', dni: '70123456', celular: '954321098' },
            { id: 5, nombre: 'José', apellidos: 'García Méndez', dni: '79876543', celular: '943210987' },
            { id: 6, nombre: 'Ana', apellidos: 'Sánchez Ruiz', dni: '72345678', celular: '932109876' },
            { id: 7, nombre: 'Luis', apellidos: 'Castro Rojas', dni: '73456789', celular: '921098765' },
            { id: 8, nombre: 'Patricia', apellidos: 'Martínez León', dni: '74567890', celular: '910987654' },
            { id: 9, nombre: 'Ricardo', apellidos: 'Vargas Soto', dni: '75678901', celular: '999876543' },
            { id: 10, nombre: 'Diana', apellidos: 'Cruz Moreno', dni: '76789012', celular: '988765432' }
        ][parseInt(props.id) - 1]);

    } catch (error) {
        console.error('Error al cargar Datos:', error)
    } finally {

    }

})

// Función al enviar el formulario
async function actualizarResponsable() {
    try {
        const response = await api.put(`equipos/${props.id}`, form)
        enviado.value = true
        console.log('Responsable actualizado con éxito:', response.data)
    } catch (error) {
        console.error('Error al actualizar Responsable:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
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