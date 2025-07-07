<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/services/api'

const responsables = ref([])

const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 5


onMounted(() => {
    /*api
        .get('responsables/')
        .then(response => (responsables.value = response.data))
        .catch(error => console.log(error))*/
    responsables.value = [
        { id: 1, nombre: 'Juan', apellidos: 'Pérez Gómez', dni: '74561234', celular: '987654321' },
        { id: 2, nombre: 'María', apellidos: 'López Díaz', dni: '75612345', celular: '976543210' },
        { id: 3, nombre: 'Carlos', apellidos: 'Ramírez Torres', dni: '71234567', celular: '965432109' },
        { id: 4, nombre: 'Lucía', apellidos: 'Fernández Vega', dni: '70123456', celular: '954321098' },
        { id: 5, nombre: 'José', apellidos: 'García Méndez', dni: '79876543', celular: '943210987' },
        { id: 6, nombre: 'Ana', apellidos: 'Sánchez Ruiz', dni: '72345678', celular: '932109876' },
        { id: 7, nombre: 'Luis', apellidos: 'Castro Rojas', dni: '73456789', celular: '921098765' },
        { id: 8, nombre: 'Patricia', apellidos: 'Martínez León', dni: '74567890', celular: '910987654' },
        { id: 9, nombre: 'Ricardo', apellidos: 'Vargas Soto', dni: '75678901', celular: '999876543' },
        { id: 10, nombre: 'Diana', apellidos: 'Cruz Moreno', dni: '76789012', celular: '988765432' }
    ]
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
        //await api.delete(`responsables/${responsable.id}`);
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
