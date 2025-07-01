<script setup>
import { ref, onMounted, watch, computed } from 'vue'
//import api from '@/services/api'

const revisionInventarios = ref([])

const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 3


onMounted(() => {
  /*api
    .get('revisioninventario/')
    .then(response => (revisionInventarios.value = response.data))
    .catch(error => console.log(error))*/
  revisionInventarios.value = [
    {id: 1, inventario_id: 1, equipo_id: 1, ubicacion_ercontrada: 1, estado_encontrado: 1, encontrado: true, correccion_datos: false, observaciones: "observacion 1", fecha_revision: "2025-06-30"},
    {id: 2, inventario_id: 2, equipo_id: 2, ubicacion_ercontrada: 2, estado_encontrado: 2, encontrado: true, correccion_datos: false, observaciones: "observacion 2", fecha_revision: "2025-06-30"},
    {id: 3, inventario_id: 3, equipo_id: 3, ubicacion_ercontrada: 3, estado_encontrado: 3, encontrado: true, correccion_datos: false, observaciones: "observacion 3", fecha_revision: "2025-06-30"},
    {id: 4, inventario_id: 4, equipo_id: 4, ubicacion_ercontrada: 4, estado_encontrado: 4, encontrado: true, correccion_datos: false, observaciones: "observacion 4", fecha_revision: "2025-06-30"},
    {id: 5, inventario_id: 5, equipo_id: 5, ubicacion_ercontrada: 5, estado_encontrado: 5, encontrado: true, correccion_datos: false, observaciones: "observacion 5", fecha_revision: "2025-06-30"},
    {id: 6, inventario_id: 6, equipo_id: 6, ubicacion_ercontrada: 6, estado_encontrado: 6, encontrado: true, correccion_datos: false, observaciones: "observacion 6", fecha_revision: "2025-06-30"},
    {id: 7, inventario_id: 7, equipo_id: 7, ubicacion_ercontrada: 7, estado_encontrado: 7, encontrado: true, correccion_datos: false, observaciones: "observacion 7", fecha_revision: "2025-06-30"},
    {id: 8, inventario_id: 8, equipo_id: 8, ubicacion_ercontrada: 8, estado_encontrado: 8, encontrado: true, correccion_datos: false, observaciones: "observacion 8", fecha_revision: "2025-06-30"},
  ]
})

// Reiniciar página al cambiar filtro
watch(filtro, () => {
    paginaActual.value = 1
})

async function eliminarRevisionInventario(revInventario) {
  if (!confirm(`¿Estás seguro de que deseas eliminar la Revision de Invetario"${revInventario.codigo_patrimonial}"?`)) {
    return;
  }

  try {
    //await api.delete(`revisioninventario/${revInventario.id}`);
    revisionInventarios.value = revisionInventarios.value.filter(e => e.id !== revInventario.id);
    alert('Revision Inventario eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar la Revision Inventario :', error);
    alert('Hubo un problema al eliminar la Revision Inventario');
  }
}

const revisionInventariosFiltrados = computed(() => {
  const f = filtro.value.toLowerCase()
  return revisionInventarios.value.filter(
    (ri) =>
      ("" +ri.id).toLowerCase().includes(f) ||
      ri.observaciones.toLowerCase().includes(f) ||
      ri.fecha_revision.toLowerCase().includes(f)
  )
})

const totalPaginas = computed(() =>
  Math.ceil(revisionInventariosFiltrados.value.length / porPagina)
)

const revisionInventariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return revisionInventariosFiltrados.value.slice(inicio, inicio + porPagina)
})


</script>

<template>
  <div class="container-fluid">
    <h1 class="mb-4">
      <i class="bi bi-laptop me-2"></i> Revision de Inventario
    </h1>

    <!-- Botón agregar -->
    <div class="mb-3 text-end">
      <router-link to="/inventory-review/new" class="btn btn-success">
        <i class="bi bi-plus-circle me-1"></i> Nueva Revision de Inventario
      </router-link>
    </div>

    <!-- Formulario de búsqueda -->
     <div class="mb-3">
            <input v-model="filtro" type="text" class="form-control" placeholder="Buscar por ID, fecha de revision, observaciones." />
        </div>


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
          <tr v-for="(revInventario, index) in revisionInventariosPaginados" :key="revInventario.id">
            <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>

            <td>{{ revInventario.id }}</td>
            <td>{{ revInventario.inventario_id }}</td>
            <td>{{ revInventario.equipo_id }}</td>
            <td>{{ revInventario.ubicacion_ercontrada }}</td>
            <td>{{ revInventario.estado_encontrado }}</td>
            <td>{{ revInventario.encontrado }}</td>
            <td>{{ revInventario.correccion_datos }}</td>
            <td>{{ revInventario.observaciones }}</td>
            <td>{{ revInventario.fecha_revision }}</td>

            <td class="text-center">
              <router-link :to="`/inventory-review/${revInventario.id}`" class="btn btn-sm btn-outline-primary me-1"
                title="Ver detalles">
                <i class="bi bi-eye"></i>
              </router-link>

              <router-link :to="`/inventory-review/update/${revInventario.id}`" class="btn btn-sm btn-outline-success me-1"
                title="Editar Revision Inventario">
                <i class="bi bi-pencil"></i>
              </router-link>

              <button
                class="btn btn-sm btn-outline-danger"
                title="Eliminar Revision Inventario"
                @click.prevent="eliminarRevisionInventario(revInventario)"
                >
                <i class="bi bi-trash"></i>
              </button>

            </td>
          </tr>
          <tr v-if="revisionInventariosFiltrados.length === 0">
            <td colspan="5" class="text-center">No se encontraron revisiones de inventarios.</td>
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
        <li v-for="pagina in totalPaginas" :key="pagina" class="page-item" :class="{ active: pagina === paginaActual }">
          <button class="page-link" @click="paginaActual = pagina">{{ pagina }}</button>
        </li>
        <li class="page-item" :class="{ disabled: paginaActual === totalPaginas }">
          <button class="page-link" @click="paginaActual++" :disabled="paginaActual === totalPaginas">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
