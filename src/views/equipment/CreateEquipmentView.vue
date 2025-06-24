<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const form = reactive({
    id: '',
    codigo_patrimonial: '',
    descripcion: '',
    numero_serie: '',
    marca: '',
    modelo: '',
    fecha_alta: '',
    fecha_compra: '',
    numero_o_c: '',
    numero_nea: '',
    centro_costos: '',
    tipo_ingreso: '',
    estado: '',
    ubicacion: ''
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)

const tiposIngresos = ref([])
const estados = ref([])
const ubicaciones = ref([])



onMounted(async () => {
    try {
        loading.value = true
        const [tiposResponse, estadosResponse, ubicacionesResponse] = await Promise.all([
            axios.get('http://127.0.0.1:8000/api/tipoingreso/'),
            axios.get('http://127.0.0.1:8000/api/estados/'),
            axios.get('http://127.0.0.1:8000/api/ubicaciones/'),
        ])



        tiposIngresos.value = tiposResponse.data
        estados.value = estadosResponse.data
        ubicaciones.value = ubicacionesResponse.data

    } catch (error) {
        console.error('Error al cargar datos', error)
    } finally {
        loading.value = false
    }
})


async function crearEquipo() {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/equipos/', form)
        enviado.value = true
        console.log('Equipo creado con éxito:', response.data)
    } catch (error) {
        console.error('Error al crear Equipo:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Crear Equipo Nuevo</h2>
        <div v-if="loading">Cargando datos</div>
        <div v-else>
            <form @submit.prevent="crearEquipo">
                <div class="mb-3">
                    <label for="cod-patrimonial" class="form-label fw-bold">Código Patrimonial</label>
                    <input type="text" id="cod-patrimonial" class="form-control" v-model="form.codigo_patrimonial"
                        required />
                </div>

                <div class="mb-3">
                    <label for="descripcion" class="form-label fw-bold">Descripción</label>
                    <textarea type="text" id="descripcion" class="form-control" v-model="form.descripcion"
                        required></textarea>
                </div>

                <div class="mb-3">
                    <label for="num-serie" class="form-label fw-bold">Número de Serie</label>
                    <input type="text" id="num-serie" class="form-control" v-model="form.numero_serie" required />
                </div>

                <div class="mb-3">
                    <label for="marca" class="form-label fw-bold">Marca</label>
                    <input type="text" id="marca" class="form-control" v-model="form.marca" required />
                </div>

                <div class="mb-3">
                    <label for="modelo" class="form-label fw-bold">Modelo</label>
                    <input type="text" id="modelo" class="form-control" v-model="form.modelo" required />
                </div>

                <div class="mb-3">
                    <label for="fecha-alta" class="form-label fw-bold">Fecha de Alta</label>
                    <input type="date" id="fecha-alta" class="form-control" v-model="form.fecha_alta" required />
                    <!--
                        <small class="form-text text-muted">Seleccione una fecha válida.</small>
                    -->
                </div>

                <div class="mb-3">
                    <label for="fecha-compra" class="form-label fw-bold">Fecha de Compra</label>
                    <input type="date" id="fecha-compra" class="form-control" v-model="form.fecha_compra" required />
                </div>

                <div class="mb-3">
                    <label for="num-o-c" class="form-label fw-bold">Número OC</label>
                    <input type="text" id="num-o-c" class="form-control" v-model="form.numero_o_c" required />
                </div>

                <div class="mb-3">
                    <label for="num-nea" class="form-label fw-bold">Número NEA</label>
                    <input type="text" id="num-nea" class="form-control" v-model="form.numero_nea" required />
                </div>

                <div class="mb-3">
                    <label for="centro-costos" class="form-label fw-bold">Centro de Costos</label>
                    <input type="text" id="centro-costos" class="form-control" v-model="form.centro_costos" required />
                </div>

                <div class="mb-3">
                    <label for="tipo_ingreso" class="form-label fw-bold">Tipo de Ingreso</label>
                    <select id="tipo_ingreso" class="form-select" v-model="form.tipo_ingreso" required>
                        <option value="">Selecciona un Tipo de Ingreso</option>
                        <option v-for="tipo in tiposIngresos" :value="tipo.id" :key="tipo.id">{{ tipo.nombre }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="estado" class="form-label fw-bold">Estado</label>
                    <select id="estado" class="form-select" v-model="form.estado" required>
                        <option value="">Selecciona un Estado</option>
                        <option v-for="estado in estados" :value="estado.id" :key="estado.id">{{ estado.estado }}
                        </option>

                    </select>
                </div>
                <div class="mb-3">
                    <label for="ubicacion" class="form-label fw-bold">Ubicación</label>
                    <select id="ubicacion" class="form-select" v-model="form.ubicacion" required>
                        <option value="">Selecciona una Ubicación</option>
                        <option value="100">Algo</option>
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


<style lang="scss" scoped></style>