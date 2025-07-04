<template>
    <div class="container mt-3">
        <h2>Inventariado - {{ inventario.nombre }}</h2>

        <div class="row g-3 align-items-end">
            <div class="col-md-4">
                <label for="codigo" class="form-label fw-bold">Código de barras</label>
                <input id="codigo" v-model="codigo" @keyup.enter="registrarEquipo" type="text" class="form-control"
                    placeholder="Escanea o digita el código" autofocus />
            </div>

            <div class="col-md-3">
                <label for="ubicacion" class="form-label fw-bold">Ubicación</label>
                <select id="ubicacion" v-model="form.ubicacion_ercontrada" class="form-select" required>
                    <option disabled value="">Seleccione una ubicación</option>
                    <option v-for="u in ubicaciones" :key="u.id" :value="u.id">
                        {{ u.nombre }}
                    </option>
                </select>
            </div>

            <div class="col-md-3">
                <label for="estado" class="form-label fw-bold">Estado del equipo</label>
                <select id="estado" v-model="form.estado_encontrado" class="form-select" required>
                    <option disabled value="">Seleccione estado</option>
                    <option value="1">Bueno</option>
                    <option value="2">Regular</option>
                    <option value="3">Malogrado</option>
                </select>
            </div>

            <div class="col-12">
                <label for="observacion" class="form-label">Observaciones</label>
                <textarea id="observacion" v-model="form.observaciones" class="form-control" rows="2"
                    placeholder="Opcional"></textarea>
            </div>
        </div>


        <div v-if="mensajes.texto" :class="['alert', 'alert-' + mensajes.tipo]">{{ mensajes.texto }}</div>


        <h5 class="mt-4">Equipos registrados:</h5>
        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Inventario</th>
                        <th>Equipo</th>
                        <th>Ubicación Encontrada</th>
                        <th>Estado Encontrado</th>
                        <th>¿Encontrado?</th>
                        <th>¿Datos corregidos?</th>
                        <th>Observaciones</th>
                        <th>Fecha de revisión</th>
                        <th class="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(revision, index) in revisiones" :key="revision.id">
                        <td>{{ index + 1 }}</td>

                        <td>{{ revision.id }}</td>
                        <td>{{ revision.inventario_id }}</td>
                        <td>{{ revision.equipo_id }}</td>
                        <td>{{ revision.ubicacion_ercontrada }}</td>
                        <td>{{ revision.estado_encontrado }}</td>
                        <td>{{ revision.encontrado ? 'ENCONTRADO' : 'DESAPARECIDO' }}</td>
                        <td>{{ revision.correccion_datos ? 'SI' : 'NO' }}</td>
                        <td>{{ revision.observaciones.length > 10 ? revision.observaciones.substring(0, 10) + '...' :
                            revision.observaciones }}</td>
                        <td>{{ revision.fecha_revision }}</td>

                        <td class="text-center">
                            <router-link :to="`/inventory-review/${revision.id}`"
                                class="btn btn-sm btn-outline-primary me-1" title="Ver detalles">
                                <i class="bi bi-eye"></i>
                            </router-link>

                            <router-link :to="`/inventory-review/update/${revision.id}`"
                                class="btn btn-sm btn-outline-success me-1" title="Editar Revision Inventario">
                                <i class="bi bi-pencil"></i>
                            </router-link>

                            <button class="btn btn-sm btn-outline-danger" title="Eliminar Revision Inventario"
                                @click.prevent="eliminarRevision(revision.id)">
                                <i class="bi bi-trash"></i>
                            </button>

                        </td>
                    </tr>
                    <tr v-if="revisiones.length === 0">
                        <td colspan="5" class="text-center">Sin revisiones.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <ToastAlert :texto="mensajeToast.texto" :tipo="mensajeToast.tipo" :keyRefresh="mensajeToast.key"/>
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ToastAlert from '@/components/ui/ToastAlert.vue'




const route = useRoute()
const inventarioId = route.params.id

const inventario = ref({})
const revisiones = ref([])
const ubicaciones = ref([])
const codigo = ref('')
const mensajes = ref({
    tipo: '',// 'success', 'danger', 'info'.
    texto: ''
})
// para el Toast
const mensajeToast = ref({
    tipo: 'danger', // 'success', 'danger', 'info'.
    texto:'',
    key: 0,
})

const form = reactive({
    inventario_id: "",// FK
    equipo_id: "",// FK
    ubicacion_ercontrada: "",// FK
    estado_encontrado: "",// FK
    encontrado: "",
    correccion_datos: "",
    observaciones: "",
    fecha_revision: ""
})

function mostrarToast(texto, tipo='danger'){
    mensajeToast.value.texto = texto
    mensajeToast.value.tipo = tipo
    mensajeToast.value.key++
}

// Carga inventario y sus revisiones
async function registrarEquipo() {
    if (!codigo.value) return

    // Validación: que ubicación y estado estén seleccionados
    if (!form.ubicacion_ercontrada || !form.estado_encontrado) {
        mensajes.value.tipo = 'danger';
        mensajes.value.texto = 'Debe seleccionar una ubicación y estado antes de registrar el equipo.';
        return;
    }

    // valida si ya existe el codigo de barras
    if (revisiones.value.some(rev => rev.equipo_id === codigo.value)) {// ojo
        mensajes.value.tipo = 'danger';
        mensajes.value.texto = 'Este código ya fue ingresado';
        mostrarToast('Este código ya fue ingresado.')
        return
    }

    try {
        /*const res = await axios.post('/api/revision_inventarios/', {
            inventario: inventarioId,
            codigo_equipo: codigo.value
        })*/
        const tempID = revisiones.value.length + 1;
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque los meses empiezan en 0
        const dia = String(fecha.getDate()).padStart(2, '0'); // Asegurar dos dígitos

        const fechaFormateada = `${año}-${mes}-${dia}`;
        revisiones.value.unshift({
            id: tempID,
            inventario_id: inventarioId,
            equipo_id: codigo.value,
            ubicacion_ercontrada: form.ubicacion_ercontrada,
            estado_encontrado: form.estado_encontrado,
            encontrado: true,
            correccion_datos: false,
            observaciones: form.observaciones,
            fecha_revision: fechaFormateada,
        })
        mensajes.value.tipo = "success"
        mensajes.value.texto = 'Equipo registrado correctamente'
        codigo.value = ''
    } catch (error) {
        mensajes.value.tipo = 'danger'
        mensajes.value.texto = 'Error al registrar equipo: ' + error.response?.data?.detail || 'Desconocido'
    }
}

async function eliminarRevision(id) {

    //await axios.delete(`/api/revision_inventarios/${id}/`)
    revisiones.value = revisiones.value.filter(r => "" + r.id !== "" + id)
    console.log(revisiones.value)
}

onMounted(async () => {
    inventario.value = {
        id: inventarioId,
        nombre: "Inventario " + inventarioId,
        fecha_inicio: "2025-06-17",
        fecha_fin: "2025-06-17",
        descripcion: "Descripción " + inventarioId,
    }

    // revisiones del invnetario
    revisiones.value = [
        {
            id: 1,
            inventario_id: inventarioId,
            equipo_id: inventarioId,
            ubicacion_ercontrada: inventarioId,
            estado_encontrado: inventarioId,
            encontrado: true,
            correccion_datos: false,
            observaciones: "observacion " + inventarioId,
            fecha_revision: "2025-06-30",
        },
        {
            id: 2,
            inventario_id: inventarioId,
            equipo_id: inventarioId,
            ubicacion_ercontrada: inventarioId,
            estado_encontrado: inventarioId,
            encontrado: true,
            correccion_datos: false,
            observaciones: "observacion " + inventarioId,
            fecha_revision: "2025-06-30",
        },
        {
            id: 3,
            inventario_id: inventarioId,
            equipo_id: inventarioId,
            ubicacion_ercontrada: inventarioId,
            estado_encontrado: inventarioId,
            encontrado: true,
            correccion_datos: false,
            observaciones: "observacion " + inventarioId,
            fecha_revision: "2025-06-30",
        },
    ]

    ubicaciones.value = [
        { id: 1, nombre: "Ubicación 1" },
        { id: 2, nombre: "Ubicación 2" },
        { id: 3, nombre: "Ubicación 3" },
        { id: 4, nombre: "Ubicación 4" },
        { id: 5, nombre: "Ubicación 5" },
        { id: 6, nombre: "Ubicación 6" },
    ]
})
</script>


<style scoped></style>