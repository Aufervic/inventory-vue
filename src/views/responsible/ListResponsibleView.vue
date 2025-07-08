<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/services/api'

const responsables = ref([])

const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 5


onMounted(async () => {
    try{
        const response = await api.get('responsables/')
        responsables.value = response.data
    } catch (error) {
        console.error(error)
    }
})

// Reiniciar página al cambiar filtro
watch(filtro, () => {
    paginaActual.value = 1
})


async function eliminarResponsable(responsable) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el responsable "${responsable.nombre}"?`)) {
        return;
    }

    try {
        await api.delete(`responsables/${responsable.id}`);
        responsables.value = responsables.value.filter(e => e.id !== responsable.id);
        alert('Responsable eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el responsable:', error);
        alert('Hubo un problema al eliminar el responsable');
    }
}

const responsablesFiltrados = computed(() => {
    const f = filtro.value.toLowerCase()
    return responsables.value.filter(
        (r) =>
            r.nombre.toLowerCase().includes(f) ||
            r.apellidos.toLowerCase().includes(f) ||
            r.dni.toLowerCase().includes(f) ||
            r.celular.toLowerCase().includes(f)
    )
})

const totalPaginas = computed(() =>
    Math.ceil(responsablesFiltrados.value.length / porPagina)
)

const responsablesPaginados = computed(() => {
    const inicio = (paginaActual.value - 1) * porPagina
    return responsablesFiltrados.value.slice(inicio, inicio + porPagina)
})


</script>

<template>
    <div class="container-fluid">
        <h1 class="mb-4">
            <i class="bi bi-laptop me-2"></i> Responsables
        </h1>

        <!-- Botón agregar -->
        <div class="mb-3 text-end">
            <router-link to="/responsible/new" class="btn btn-success">
                <i class="bi bi-plus-circle me-1"></i> Nuevo Responsable
            </router-link>
        </div>

        <!-- Búsqueda -->
        <div class="mb-3 text-end">
            <input v-model="filtro" type="text" class="form-control"
                placeholder="Buscar por nombre, apellidos, DNI, celular." />
        </div>

        <!-- Tabla -->
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>DNI</th>
                        <th>Celular</th>
                        <th class="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(responsable, index) in responsablesPaginados" :key="responsable.id">
                        <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>

                        <td>{{ responsable.id }}</td>
                        <td>{{ responsable.nombre }}</td>
                        <td>{{ responsable.apellidos }}</td>
                        <td>{{ responsable.dni }}</td>
                        <td>{{ responsable.celular }}</td>

                        <td class="text-center">
                            <router-link :to="`/responsible/${responsable.id}`"
                                class="btn btn-sm btn-outline-primary me-1" title="Ver detalles">
                                <i class="bi bi-eye"></i>
                            </router-link>

                            <router-link :to="`/responsible/update/${responsable.id}`"
                                class="btn btn-sm btn-outline-success me-1" title="Editar Responsable">
                                <i class="bi bi-pencil"></i>
                            </router-link>

                            <button class="btn btn-sm btn-outline-danger" title="Eliminar Responsable"
                                @click.prevent="eliminarResponsable(responsable)">
                                <i class="bi bi-trash"></i>
                            </button>

                        </td>
                    </tr>
                    <tr v-if="responsablesFiltrados.length === 0">
                        <td colspan="5" class="text-center">No se encontraron responsables.</td>
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
