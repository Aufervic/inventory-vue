<script setup>

import { ref, onMounted, computed, watch } from 'vue'
import api from '@/services/api'

// Paginación
const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 4

const estados = ref([])

onMounted(async () => {
    try {
        const response = await api.get('estados/')
        estados.value = response.data
    } catch (error) {
        console.error(error)
    }
})

// Reiniciar página al cambiar filtro
watch(filtro, () => {
    paginaActual.value = 1
})

async function eliminarEstado(estado) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el Estado "${estado.estado}"?`)) {
        return;
    }

    try {
        await api.delete(`estados/${estado.id}`);
        estados.value = estados.value.filter(e => e.id !== estado.id);
        alert('Estado eliminado correctamente.');
    } catch (error) {
        console.error('Error al eliminar el Estado:', error);
        alert('Hubo un problema al eliminar el Estado');
    }
}


// paginación
const estadosFiltrados = computed(() => {
    const f = filtro.value.toLowerCase()
    return estados.value.filter(
        (estd) =>
            ("" + estd.id).toLowerCase().includes(f) ||
            estd.estado.toLowerCase().includes(f)
    )
})

const totalPaginas = computed(() =>
    Math.ceil(estadosFiltrados.value.length / porPagina)
)

const estadosPaginados = computed(() => {
    const inicio = (paginaActual.value - 1) * porPagina
    return estadosFiltrados.value.slice(inicio, inicio + porPagina)
})

</script>


<template>
    <div class="container-fluid">
        <h1 class="mb-4">
            <i class="bi bi-check2-square me-2"></i> Estados
        </h1>

        <!-- Botón nuevo -->
        <div class="mb-3 text-end">
            <router-link to="/state/new" class="btn btn-success">
                <i class="bi bi-plus-circle me-1"></i> Nuevo Estado
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
                    <tr v-for="(estado, index) in estadosPaginados" :key="index">
                        <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>
                        <td>{{ estado.id }}</td>
                        <td>{{ estado.estado }}</td>

                        <td class="text-center">
                            <router-link :to="`/state/${estado.id}`" class="btn btn-sm btn-outline-primary me-1"
                                title="Ver detalles de Estado">
                                <i class="bi bi-eye"></i>
                            </router-link>

                            <router-link :to="`/state/update/${estado.id}`" class="btn btn-sm btn-outline-success me-1"
                                title="Editar Estado">
                                <i class="bi bi-pencil"></i>
                            </router-link>

                            <button class="btn btn-sm btn-outline-danger" title="Eliminar Estado"
                                @click.prevent="eliminarEstado(estado)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>

                    </tr>
                    <tr v-if="estadosFiltrados.length === 0">
                        <td colspan="6" class="text-center">No se encontraron estados.</td>
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