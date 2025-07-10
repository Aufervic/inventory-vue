<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/services/api'

const form = reactive({
    id: '',
    fecha_movimiento: '',
    observaciones: '',
    id_equipo: '',
    ubicacion: '',
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)

const equipos = ref([])
const ubicaciones = ref([])


onMounted(async () => {
    try {
        loading.value = true
        const [equiposResponse, ubicacionesResponse] = await Promise.all([
            api.get('equipos/'),
            api.get('ubicaciones/'),
        ])

        equipos.value = equiposResponse.data
        ubicaciones.value = ubicacionesResponse.data

    } catch (error) {
        console.error('Error al cargar datos', error)
    } finally {
        loading.value = false
    }
})


async function crearMovimiento() {
    try {
        const response = await api.post('movimientos/', form)
        enviado.value = true
        console.log('Movimiento creado con éxito:', response.data)
    } catch (error) {
        console.error('Error al crear Movimiento:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
        <h2>Crear Movimiento Nuevo</h2>
        <div v-if="loading">Cargando datos</div>
        <div v-else>
            <form @submit.prevent="crearMovimiento">
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
                    <select id="equipo" class="form-select" v-model="form.id_equipo" required>
                        <option value="">Selecciona un Equipo</option>
                        <option v-for="equipo in equipos" :value="equipo.id" :key="equipo.id">{{ equipo.codigo_patrimonial }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="ubicacion" class="form-label fw-bold">Ubicación</label>
                    <select id="ubicacion" class="form-select" v-model="form.ubicacion" required>
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

    </div>
</template>


<style></style>