<script setup>
import { reactive, ref, onMounted } from 'vue'
//import api from '@/services/api'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


onMounted(async () => {
    try {
        loading.value = true
        /*const [movimientoResponse, equiposResponse, ubicacionesResponse] = await Promise.all([
            api.get(`movimientos/${props.id}`),
            api.get('equipos/'),
            api.get('ubicaciones/'),
        ]);*/

        //Object.assign(form, equipoResponse.data);
        Object.assign(form, {
            id: props.id,
            nombre: 'Nombre '+props.id,
            fecha_inicio: '2025-06-30',
            fecha_fin: '2025-06-30',
            descripcion: 'Descripción '+props.id,
        });


    } catch (error) {
        console.error('Error al Cargar Datos:', error)
    } finally {

    }

})

// Función al enviar el formulario
async function actualizarInventario() {
    try {
        //const response = await api.put(`movimiento/${props.id}`, form)
        enviado.value = true
        console.log('Inventario actualizado con éxito:', undefined)
    } catch (error) {
        console.error('Error al actualizar Inventario:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2>Actualizar Inventario</h2>

        <form @submit.prevent="actualizarInventario">
            <div class="mb-3">
                <label for="inombre" class="form-label fw-bold">Nombre </label>
                <textarea type="text" id="inombre" class="form-control" v-model="form.nombre" required></textarea>
            </div>

            <div class="mb-3">
                <label for="fecha_inicio" class="form-label fw-bold">Fecha de Inicio</label>
                <input type="date" id="fecha_inicio" class="form-control" v-model="form.fecha_inicio" required />
            </div>

            <div class="mb-3">
                <label for="fecha_fin" class="form-label fw-bold">Fecha Fin</label>
                <input type="date" id="fecha_fin" class="form-control" v-model="form.fecha_fin" required />
            </div>

            <div class="mb-3">
                <label for="descripcion" class="form-label fw-bold">Descripción</label>
                <textarea type="text" id="descripcion" class="form-control" v-model="form.descripcion"
                    required></textarea>
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


<style scoped></style>