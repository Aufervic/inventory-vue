<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    inventario_id: "",// FK
    equipo_id: "",// FK
    ubicacion_ercontrada: "",// FK
    estado_encontrado: "",// FK
    encontrado: "",
    correccion_datos: "",
    observaciones: "",
    fecha_revision: ""
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)
const loading = ref(true)


const inventarios = ref([])
const equipos = ref([])
const ubicaciones = ref([])
const estados = ref([])

onMounted(async () => {
    try {
        loading.value = true
        /*
        const [revisionInventariosResponse, inventariosResponse, equiposResponse, ubicacionesResponse, estadosResponse] = await Promise.all([
            api.get(`revision-inventarios/${props.id}`),
            api.get('inventarios/'),
            api.get('equipos/'),
            api.get('ubicaciones/'),
            api.get('estados/'),
        ]);*/
        /*
        Object.assign(form, revisionInventariosResponse.data);
        form.tipo_ingreso = form.tipo_ingreso.id
        form.estado = form.estado.id
        form.ubicacion = form.ubicacion.id
        //form = equipoResponse.data*/
        /*
        tiposIngresos.value = tiposResponse.data;
        estados.value = estadosResponse.data;
        ubicaciones.value = ubicacionesResponse.data;*/

        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura dos dígitos
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
        const anio = fecha.getFullYear();

        const currentDate =  `${anio}-${mes}-${dia}`;

        Object.assign(form, {
            id: props.id,
            inventario_id: props.id,// FK
            equipo_id: props.id,// FK
            ubicacion_ercontrada: props.id,// FK
            estado_encontrado: props.id,// FK
            encontrado: true,
            correccion_datos: false,
            observaciones: "Observacion " + props.id,
            fecha_revision: currentDate
        });

        inventarios.value = [
            { id: 1, nombre: "Inventario 1", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 1" },
            { id: 2, nombre: "Inventario 2", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 2" },
            { id: 3, nombre: "Inventario 3", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 3" },
            { id: 4, nombre: "Inventario 4", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 4" },
            { id: 5, nombre: "Inventario 5", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 5" },
            { id: 6, nombre: "Inventario 6", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 6" },
            { id: 7, nombre: "Inventario 7", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 7" },
            { id: 8, nombre: "Inventario 8", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 8" },
            { id: 9, nombre: "Inventario 9", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 9" },
            { id: 10, nombre: "Inventario 10", fecha_inicio: "2025-06-17", fecha_fin: "2025-06-17", descripcion: "Descripción 10" },
        ]

        api
            .get('equipos/')
            .then(response => (equipos.value = response.data))
            .catch(error => console.log(error))

        ubicaciones.value = [
            { id: 1, nombre: "Ubicación 1" },
            { id: 2, nombre: "Ubicación 2" },
            { id: 3, nombre: "Ubicación 3" },
            { id: 4, nombre: "Ubicación 4" },
            { id: 5, nombre: "Ubicación 5" },
            { id: 6, nombre: "Ubicación 6" },
        ]

        estados.value = [
            { id: 1, estado: "Estado 1" },
            { id: 2, estado: "Estado 2" },
            { id: 3, estado: "Estado 3" },
            { id: 3, estado: "Estado 3" },
            { id: 4, estado: "Estado 4" },
        ]

    } catch (error) {
        console.error('Error al cargar Datos:', error)
    } finally {

    }

})

// Función al enviar el formulario
async function actualizarRevisionInventario() {
    try {
        //const response = await api.put(`revision-inventarios/${props.id}`, form)
        enviado.value = true
        console.log('Revisión Inventario actualizada con éxito:', response.data)
    } catch (error) {
        console.error('Error al actualizar Revisión Inventario:', error)
    }
}

</script>

<template>
    <div class="container mt-4">
        <h2>Actualizar Revisión Inventario</h2>

        <form @submit.prevent="actualizarRevisionInventario">
            <div class="mb-3">
                <label for="nombre-inventario" class="form-label fw-bold">Nombre de Inventario</label>
                <select id="nombre-inventario" class="form-select" v-model="form.inventario_id" required>
                    <option value="">Seleccione un Inventario</option>
                    <option v-for="inventario in inventarios" :value="inventario.id" :key="inventario.id">{{
                        inventario.nombre }}</option>
                </select>
            </div>


            <div class="mb-3">
                <label for="equipo" class="form-label fw-bold">Equipo</label>
                <select id="equipo" class="form-select" v-model="form.equipo_id" required>
                    <option value="">Seleccione un Equipo</option>
                    <option v-for="equipo in equipos" :value="equipo.id" :key="equipo.id">{{
                        equipo.codigo_patrimonial }}</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="ubicacion" class="form-label fw-bold">Ubicación</label>
                <select id="ubicacion" class="form-select" v-model="form.ubicacion_ercontrada" required>
                    <option value="">Seleccione una Ubicación</option>
                    <option v-for="ubicacion in ubicaciones" :value="ubicacion.id" :key="ubicacion.id">{{
                        ubicacion.nombre }}</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="estado" class="form-label fw-bold">Estado</label>
                <select id="estado" class="form-select" v-model="form.estado_encontrado" required>
                    <option value="">Seleccione un Estado</option>
                    <option v-for="estado in estados" :value="estado.id" :key="estado.id">{{ estado.estado }}
                    </option>
                </select>
            </div>

            <div class="form-check mb-3">
                <input type="checkbox" id="encontrado" class="form-check-input" v-model="form.encontrado" required />
                <label for="encontrado" class="form-check-label fw-bold">Encontrado</label>
            </div>
            <div class="mb-3">
                <label for="encontrado" class="form-label fw-bold">¿Encontrado?</label>
                <select id="encontrado" class="form-select" v-model="form.encontrado" required>
                    <option :value="true">Sí</option>
                    <option :value="false">No</option>
                </select>
            </div>


            <div class="form-check mb-3">
                <input type="checkbox" id="correccion-datos" class="form-check-input" v-model="form.correccion_datos"
                    required />
                <label for="correccion-datos" class="form-check-label fw-bold">¿Datos corregidos?</label>
            </div>


            <div class="mb-3">
                <label for="observaciones" class="form-label fw-bold">Observaciones</label>
                <textarea type="text" id="observaciones" class="form-control" v-model="form.observaciones"
                    required></textarea>
            </div>

            <div class="mb-3">
                <label for="fecha-revision" class="form-label fw-bold">Fecha</label>
                <input type="date" id="fecha-revision" class="form-control" v-model="form.fecha_revision" required />
                <!--
                        <small class="form-text text-muted">Seleccione una fecha válida.</small>
                    -->
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