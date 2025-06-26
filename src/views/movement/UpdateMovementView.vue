<script setup>
import { reactive, ref, onMounted } from 'vue'
//import api from '@/services/api'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    fecha_movimiento: '',
    observaciones: '',
    id_equipo_id: '',
    ubicacion_id: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


const equipos = ref([]);
const ubicaciones = ref([]);

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
            fecha_movimiento: "2025-06-18",
            observaciones: "Un buena observación",
            id_equipo_id: 1,
            ubicacion_id: 1
        });
        
        equipos.value = [
            {id: 1, codigo_patrimonial: "Laptop"},
            {id: 1, codigo_patrimonial: "Mouse"},
            {id: 1, codigo_patrimonial: "Teclado"},
        ];
        ubicaciones.value = [
            {id:1, nombre: "Ubicacion 1"},
            {id:2, nombre: "Ubicacion 2"},
            {id:3, nombre: "Ubicacion 3"},

        ]

    } catch (error) {
        console.error('Error al Cargar Datos:', error)
    } finally {

    }

})

// Función al enviar el formulario
async function actualizarMovimiento() {
    try {
        //const response = await api.put(`movimiento/${props.id}`, form)
        enviado.value = true
        console.log('Movimiento actualizado con éxito:', undefined)
    } catch (error) {
        console.error('Error al actualizar Movimiento:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Actualizar Movimiento</h2>

        <form @submit.prevent="actualizarMovimiento">
             <div class="mb-3">
                <label for="fecha" class="form-label fw-bold">Fecha</label>
                <input type="date" id="fecha" class="form-control" v-model="form.fecha_movimiento" required />
            </div>

           
            <div class="mb-3">
                <label for="observaciones" class="form-label fw-bold">Observaciones</label>
                <textarea type="text" id="observaciones" class="form-control" v-model="form.observaciones"
                    required></textarea>
            </div>

            <div class="mb-3">
                <label for="equipo" class="form-label fw-bold">Equipo</label>
                <select id="equipo" class="form-select" v-model="form.id_equipo_id" required>
                    <option value="">Selecciona un Equipo</option>
                    <option v-for="equipo in equipos" :value="equipo.id" :key="equipo.id">{{ equipo.codigo_patrimonial }}</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="ubicacion" class="form-label fw-bold">Ubicación</label>
                <select id="ubicacion" class="form-select" v-model="form.ubicacion_id" required>
                    <option value="">Selecciona una Ubicación</option>
                    <option v-for="ubicacion in ubicaciones" :value="ubicacion.id" :key="ubicacion.id">{{
                        ubicacion.nombre }}</option>
                </select>
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