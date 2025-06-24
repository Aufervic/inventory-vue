<script setup>
import { ref, onMounted, computed, watch } from 'vue'
//import axios from 'axios'

const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 4

const movimientos = ref([])

onMounted(() => {
  movimientos.value = [
    { id: 1, fecha_movimiento: "2025-06-17", observaciones: "Una observación God", id_equipo_id: 1, ubicacion_id: 1 },
    { id: 2, fecha_movimiento: "2025-06-18", observaciones: "Otra observación God", id_equipo_id: 2, ubicacion_id: 3 },
    { id: 3, fecha_movimiento: "2025-06-18", observaciones: "Otra observación God", id_equipo_id: 2, ubicacion_id: 3 },
    { id: 4, fecha_movimiento: "2025-06-18", observaciones: "Otra observación God", id_equipo_id: 2, ubicacion_id: 3 },
    { id: 5, fecha_movimiento: "2025-06-18", observaciones: "Otra observación God", id_equipo_id: 2, ubicacion_id: 3 },
    { id: 6, fecha_movimiento: "2025-06-18", observaciones: "Otra observación God", id_equipo_id: 2, ubicacion_id: 3 },
    { id: 7, fecha_movimiento: "2025-06-18", observaciones: "Otra observación God", id_equipo_id: 2, ubicacion_id: 3 },
  ]
})

// Reiniciar página al cambiar filtro
watch(filtro, () => {
  paginaActual.value = 1
})



async function eliminarMovimiento(movimiento) {
  if (!confirm(`¿Estás seguro de que deseas eliminar el Movimiento "${movimiento.codigo_patrimonial}"?`)) {
    return;
  }

  try {
    //await axios.delete(`http://127.0.0.1:8000/api/movimientos/${movimiento.id}`);
    movimientos.value = movimientos.value.filter(e => e.id !== movimiento.id);
    alert('Movimiento eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el Movimiento:', error);
    alert('Hubo un problema al eliminar el Movimiento');
  }
}



const movimientosFiltrados = computed(() => {
  const f = filtro.value.toLowerCase()
  return movimientos.value.filter(
    (m) =>
      m.fecha_movimiento.toLowerCase().includes(f) ||
      m.observaciones.toLowerCase().includes(f) ||
      ("" + m.id_equipo_id).toLowerCase().includes(f) ||
      ("" + m.ubicacion_id).toLowerCase().includes(f)
  )
})

const totalPaginas = computed(() =>
  Math.ceil(movimientosFiltrados.value.length / porPagina)
)

const movimientosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return movimientosFiltrados.value.slice(inicio, inicio + porPagina)
})


</script>



<template>
  <div class="container-fluid">
    <h1 class="mb-4">
      <i class="bi bi-arrow-left-right me-2"></i> Movimientos
    </h1>

    <!-- Botón nuevo -->
    <div class="mb-3 text-end">
      <router-link to="/movement/new" class="btn btn-success">
        <i class="bi bi-plus-circle me-1"></i> Nuevo Movimiento
      </router-link>
    </div>

    <!-- Búsqueda -->
    <div class="mb-3">
      <input v-model="filtro" type="text" class="form-control"
        placeholder="Buscar por equipo, ubicación, observaciones, etc." />
    </div>

    <!-- Tabla -->
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Equipo</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movimiento, index) in movimientosPaginados" :key="index">
            <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>
            <td>{{ movimiento.id }}</td>
            <td>{{ movimiento.fecha_movimiento }}</td>
            <td>{{ movimiento.observaciones }}</td>
            <td>{{ movimiento.id_equipo_id }}</td>
            <td>{{ movimiento.ubicacion_id }}</td>

            <td class="text-center">
              <router-link :to="`/movement/${movimiento.id}`" class="btn btn-sm btn-outline-primary me-1"
                title="Ver detalles de Movimiento">
                <i class="bi bi-eye"></i>
              </router-link>

              <router-link :to="`/movement/update/${movimiento.id}`" class="btn btn-sm btn-outline-success me-1"
                title="Editar Movimiento">
                <i class="bi bi-pencil"></i>
              </router-link>

              <button class="btn btn-sm btn-outline-danger" title="Eliminar Movimiento"
                @click.prevent="eliminarMovimiento(movimiento)">
                <i class="bi bi-trash"></i>
              </button>
            </td>

          </tr>
          <tr v-if="movimientosFiltrados.length === 0">
            <td colspan="6" class="text-center">No se encontraron movimientos.</td>
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
