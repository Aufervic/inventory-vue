<script setup>
// lista los tipos de ingresos

import { ref, onMounted, watch, computed } from 'vue'
import api from '@/services/api'

// Paginación
const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 4

const tiposDeIngreso = ref([])

onMounted( async () => {
    try {
        const response = await api.get('tipo-ingresos/')
        tiposDeIngreso.value = response.data
    } catch (error) {
        console.error(error)
    }
})


// Reiniciar página al cambiar filtro
watch(filtro, () => {
    paginaActual.value = 1
})


async function eliminarTipoIngreso(tipoIngreso) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el Tipo de Ingreso"${tipoIngreso.nombre}"?`)) {
        return;
    }

    try {
        await api.delete(`ingresos/${tipoIngreso.id}`);
        tiposDeIngreso.value = tiposDeIngreso.value.filter(e => e.id !== tipoIngreso.id);
        alert('Tipo de Ingreso eliminado correctamente.');
    } catch (error) {
        console.error('Error al eliminar el Tipo de Ingreso:', error);
        alert('Hubo un problema al eliminar el Tipo de Ingreso');
    }
}



// paginación
const tiposDeIngresoFiltrados = computed(() => {
    const f = filtro.value.toLowerCase()
    return tiposDeIngreso.value.filter(
        (tingreso) =>
            ("" + tingreso.id).toLowerCase().includes(f) ||
            tingreso.nombre.toLowerCase().includes(f)
    )
})

const totalPaginas = computed(() =>
    Math.ceil(tiposDeIngresoFiltrados.value.length / porPagina)
)

const tiposDeIngresoPaginados = computed(() => {
    const inicio = (paginaActual.value - 1) * porPagina
    return tiposDeIngresoFiltrados.value.slice(inicio, inicio + porPagina)
})

</script>


<template>
    <div class="container-fluid">
        <h1 class="mb-4">
            <i class="bi bi-box-arrow-in-down me-2"></i> Tipos de Ingreso
        </h1>

        <!-- Botón nuevo -->
        <div class="mb-3 text-end">
            <router-link to="/income-type/new" class="btn btn-success">
                <i class="bi bi-plus-circle me-1"></i> Nuevo Tipo de Ingreso
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
                    <tr v-for="(tipoIngreso, index) in tiposDeIngresoPaginados" :key="index">
                        <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>
                        <td>{{ tipoIngreso.id }}</td>
                        <td>{{ tipoIngreso.nombre }}</td>

                        <td class="text-center">
                            <router-link :to="`/income-type/${tipoIngreso.id}`" class="btn btn-sm btn-outline-primary me-1"
                                title="Ver detalles de Tipo Ingreso">
                                <i class="bi bi-eye"></i>
                            </router-link>

                            <router-link :to="`/income-type/update/${tipoIngreso.id}`" class="btn btn-sm btn-outline-success me-1"
                                title="Editar Tipo de Ingreso">
                                <i class="bi bi-pencil"></i>
                            </router-link>

                            <button class="btn btn-sm btn-outline-danger" title="Eliminar Tipo Ingreso"
                                @click.prevent="eliminarTipoIngreso(tipoIngreso)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>

                    </tr>
                    <tr v-if="tiposDeIngresoPaginados.length === 0">
                        <td colspan="6" class="text-center">No se encontraron tipos de ingreso.</td>
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