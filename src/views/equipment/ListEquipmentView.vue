<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import { formatearFecha } from '@/utils/fechas'

const equipos = ref([])

const filtro = ref('')
const paginaActual = ref(1)
const porPagina = 3



onMounted(async () => {
  try {
    const response = await api.get('equipos/?expand=estado,tipo_ingreso,ubicacion,responsable')
    equipos.value = response.data
  } catch (error) {
    console.error(error)
  }
})


async function eliminarEquipo(equipment) {
  if (!confirm(`¿Estás seguro de que deseas eliminar el equipo "${equipment.codigo_patrimonial}"?`)) {
    return;
  }

  try {
    await api.delete(`equipos/${equipment.id}`);
    equipos.value = equipos.value.filter(e => e.id !== equipment.id);
    alert('Equipo eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el equipo:', error);
    alert('Hubo un problema al eliminar el equipo');
  }
}

const equiposFiltrados = computed(() => {
  const f = filtro.value.toLowerCase()
  return equipos.value.filter(
    (e) =>
      e.codigo_patrimonial.toLowerCase().includes(f) ||
      e.marca.toLowerCase().includes(f) ||
      e.modelo.toLowerCase().includes(f)
  )
})

const totalPaginas = computed(() =>
  Math.ceil(equiposFiltrados.value.length / porPagina)
)

const equiposPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return equiposFiltrados.value.slice(inicio, inicio + porPagina)
})

function buscarEquipos() {
  paginaActual.value = 1
}
</script>

<template>
  <div class="container-fluid">
    <h1 class="mb-4">
      <i class="bi bi-laptop me-2"></i> Equipos
    </h1>

    <!-- Botón agregar -->
    <div class="mb-3 text-end">
      <router-link to="/equipment/new" class="btn btn-success">
        <i class="bi bi-plus-circle me-1"></i> Nuevo equipo
      </router-link>
    </div>

    <!-- búsqueda -->
     <div class="mb-3">
      <input v-model="filtro" type="text" class="form-control"
        placeholder="Buscar por código patrimonial, marca, modelo, etc." />
    </div>

     <!-- Tabla -->
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Cód. Patr.</th>
            <th>Número de Serie</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Fecha Alta</th>
            <th>Fecha Compra</th>
            <th>Número OC</th>
            <th>Número NEA</th>
            <th>Centro Costos</th>
            <th>Tipo de Ingreso</th>
            <th>Estado</th>
            <th>Ubicación</th>
            <th>Responsable</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(equipo, index) in equiposPaginados" :key="equipo.id">
            <td>{{ index + 1 + (paginaActual - 1) * porPagina }}</td>

            <td>{{ equipo.id }}</td>
            <td>{{ equipo.codigo_patrimonial }}</td>
            <td>{{ equipo.numero_serie }}</td>
            <td>{{ equipo.marca }}</td>
            <td>{{ equipo.modelo }}</td>
            <td>{{ formatearFecha(equipo.fecha_alta) }}</td>
            <td>{{ formatearFecha(equipo.fecha_compra) }}</td>
            <td>{{ equipo.numero_o_c }}</td>
            <td>{{ equipo.numero_nea }}</td>
            <td>{{ equipo.centro_costos }}</td>
            <td>{{ equipo.tipo_ingreso.nombre }}</td>
            <td>{{ equipo.estado.estado }}</td>
            <td>{{ equipo.ubicacion.nombre }}</td>
            <td>{{ equipo.responsable.nombre }}</td>

            <td class="text-center">
              <router-link :to="`/equipment/${equipo.id}`" class="btn btn-sm btn-outline-primary me-1"
                title="Ver detalles">
                <i class="bi bi-eye"></i>
              </router-link>

              <router-link :to="`/equipment/update/${equipo.id}`" class="btn btn-sm btn-outline-success me-1"
                title="Editar Equipo">
                <i class="bi bi-pencil"></i>
              </router-link>

              <button class="btn btn-sm btn-outline-danger" title="Eliminar Equipo"
                @click.prevent="eliminarEquipo(equipo)">
                <i class="bi bi-trash"></i>
              </button>

            </td>
          </tr>
          <tr v-if="equiposFiltrados.length === 0">
            <td colspan="5" class="text-center">No se encontraron equipos.</td>
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
