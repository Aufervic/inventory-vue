<script setup>
import { ref, onMounted, computed, watch } from 'vue'
//import api from '@/services/api'

const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 4

const inventarios = ref([])

onMounted(() => {
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
})

// Reiniciar página al cambiar filtro
watch(filtro, () => {
  paginaActual.value = 1
})



async function eliminarInventario(inventario) {
  if (!confirm(`¿Estás seguro de que deseas eliminar el Inventario "${inventario.codigo_patrimonial}"?`)) {
    return;
  }

  try {
    //await api.delete(`inventarios/${inventario.id}`);
    inventarios.value = inventarios.value.filter(e => e.id !== inventario.id);
    alert('Inventario eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el Inventario:', error);
    alert('Hubo un problema al eliminar el Inventario');
  }
}



const inventariosFiltrados = computed(() => {
  const f = filtro.value.toLowerCase()
  return inventarios.value.filter(
    (m) =>
      m.nombre.toLowerCase().includes(f) ||
      m.fecha_inicio.toLowerCase().includes(f) ||
      m.fecha_fin.toLowerCase().includes(f) ||
      m.descripcion.toLowerCase().includes(f)
  )
})

const totalPaginas = computed(() =>
  Math.ceil(inventariosFiltrados.value.length / porPagina)
)

const inventariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return inventariosFiltrados.value.slice(inicio, inicio + porPagina)
})


</script>



<template>
  <div class="container-fluid">
    <h1 class="mb-4">
      <i class="bi bi-arrow-left-right me-2"></i> Inventarios
    </h1>

    <!-- Botón nuevo -->
    <div class="mb-3 text-end">
      <router-link to="/inventory/new" class="btn btn-success">
        <i class="bi bi-plus-circle me-1"></i> Nuevo Inventario
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
            <th>Nombre</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inventario, index) in inventariosPaginados" :key="index">
            <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>
            <td>{{ inventario.id }}</td>
            <td>{{ inventario.nombre }}</td>
            <td>{{ inventario.fecha_inicio }}</td>
            <td>{{ inventario.fecha_fin }}</td>
            <td>{{ inventario.descripcion }}</td>

            <td class="text-center">
              <router-link :to="`/inventory/${inventario.id}/revision`" class="btn btn-sm btn-outline-secondary me-1"
                title="Iniciar Inventariado">
                <i class="bi bi-qr-code-scan"></i>
              </router-link>
              <router-link :to="`/inventory/${inventario.id}`" class="btn btn-sm btn-outline-primary me-1"
                title="Ver detalles de Inventario">
                <i class="bi bi-eye"></i>
              </router-link>

              <router-link :to="`/inventory/update/${inventario.id}`" class="btn btn-sm btn-outline-success me-1"
                title="Editar Inventario">
                <i class="bi bi-pencil"></i>
              </router-link>

              <button class="btn btn-sm btn-outline-danger" title="Eliminar Inventario"
                @click.prevent="eliminarInventario(inventario)">
                <i class="bi bi-trash"></i>
              </button>
            </td>

          </tr>
          <tr v-if="inventariosFiltrados.length === 0">
            <td colspan="6" class="text-center">No se encontraron inventarios.</td>
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
