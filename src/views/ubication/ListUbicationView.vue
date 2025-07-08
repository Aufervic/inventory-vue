<script setup>

import { ref, onMounted, watch, computed } from 'vue'
import api from '@/services/api'

// Paginación
const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 4

const ubicaciones = ref([])

onMounted(async () => {
    try {
        const response = await api.get('ubicaciones/')
        ubicaciones.value = response.data
    } catch(error){
        console.error(error)
    }
})


// Reiniciar página al cambiar filtro
watch(filtro, () => {
    paginaActual.value = 1
})


async function eliminarUbicacion(ubicacion) {
    if (!confirm(`¿Estás seguro de que deseas eliminar la Ubicación "${ubicacion.nombre}"?`)) {
        return;
    }

    try {
        await api.delete(`ubicaciones/${ubicacion.id}/`);
        ubicaciones.value = ubicaciones.value.filter(e => e.id !== ubicacion.id);
        alert('Ubicación eliminada correctamente.');
    } catch (error) {
        console.error('Error al eliminar la Ubicación:', error);
        alert('Hubo un problema al eliminar la Ubicación');
    }
}



// paginación
const ubicacionesFiltradas = computed(() => {
    const f = filtro.value.toLowerCase()
    return ubicaciones.value.filter(
        (estd) =>
            ("" + estd.id).toLowerCase().includes(f) ||
            estd.nombre.toLowerCase().includes(f)
    )
})

const totalPaginas = computed(() =>
    Math.ceil(ubicacionesFiltradas.value.length / porPagina)
)

const ubicacionesPaginadas = computed(() => {
    const inicio = (paginaActual.value - 1) * porPagina
    return ubicacionesFiltradas.value.slice(inicio, inicio + porPagina)
})

</script>


<template>
    <div class="container-fluid">
        <h1 class="mb-4">
            <i class="bi bi-geo-alt me-2"></i> Ubicaciones
        </h1>

        <!-- Botón nuevo -->
        <div class="mb-3 text-end">
            <router-link to="/ubication/new" class="btn btn-success">
                <i class="bi bi-plus-circle me-1"></i> Nueva Ubicación
            </router-link>
        </div>

        <!-- Búsqueda -->
        <div class="mb-3">
            <input v-model="filtro" type="text" class="form-control" placeholder="Buscar por ID, nombre." />
        </div>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ubicacion, index) in ubicacionesPaginadas" :key="index">
                        <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>
                        <td>{{ ubicacion.id }}</td>
                        <td>{{ ubicacion.nombre }}</td>

                        <td class="text-center">
                            <router-link :to="`/ubication/${ubicacion.id}`" class="btn btn-sm btn-outline-primary me-1"
                                title="Ver detalles de Ubicación">
                                <i class="bi bi-eye"></i>
                            </router-link>

                            <router-link :to="`/ubication/update/${ubicacion.id}`" class="btn btn-sm btn-outline-success me-1"
                                title="Editar Ubicación">
                                <i class="bi bi-pencil"></i>
                            </router-link>

                            <button class="btn btn-sm btn-outline-danger" title="Eliminar Ubicación"
                                @click.prevent="eliminarUbicacion(ubicacion)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>

                    </tr>
                    <tr v-if="ubicacionesPaginadas.length === 0">
                        <td colspan="6" class="text-center">No se encontraron ubicaciones.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Paginación -->
        <nav v-if="totalPaginas > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: paginaActual === 1 }">
                    <button class="page-link" @click="paginaActual--" :disabled="paginaActual === 1">Anterior</button>
                </li>
                <li v-for="pagina in totalPaginas" :key="pagina" class="page-item"
                    :class="{ active: pagina === paginaActual }">
                    <button class="page-link" @click="paginaActual = pagina">{{ pagina }}</button>
                </li>
                <li class="page-item" :class="{ disabled: paginaActual === totalPaginas }">
                    <button class="page-link" @click="paginaActual++"
                        :disabled="paginaActual === totalPaginas">Siguiente</button>
                </li>
            </ul>
        </nav>
    </div>

</template>


<style scoped></style>