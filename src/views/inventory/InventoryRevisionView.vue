<template>
    <div class="container mt-3">
        <button @click="$router.go(-1)" class="btn btn-outline-primary btn-sm mb-3">← Volver</button>
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
        <div class="d-flex justify-content-end mb-2">
            <button class="btn btn-outline-success me-2" @click="exportarExcel(revisiones)">
                <i class="bi bi-file-earmark-excel"></i> Excel
            </button>
            <button class="btn btn-outline-danger" @click="exportarPDF(revisiones)">
                <i class="bi bi-file-earmark-pdf"></i> PDF
            </button>
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
                        <td>{{ formatearFecha(revision.fecha_revision) }}</td>

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
    <ToastAlert :texto="mensajeToast.texto" :tipo="mensajeToast.tipo" :keyRefresh="mensajeToast.key" />
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ToastAlert from '@/components/ui/ToastAlert.vue'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatearFecha } from '@/utils/fechas'


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
    texto: '',
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

function mostrarToast(texto, tipo = 'danger') {
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


async function exportarExcel(data, inventarioNombre = 'Inventario', filename = 'reporte_inventario') {
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Revisiones')

    // 🧾 1. Título principal
    sheet.mergeCells('A1', 'H1') // combinamos de A1 a H1
    const tituloCell = sheet.getCell('A1')
    tituloCell.value = 'Reporte de Revisión de Equipos'
    tituloCell.font = { size: 16, bold: true }
    tituloCell.alignment = { vertical: 'middle', horizontal: 'center' }

    // 🗓️ 2. Subtítulo con nombre de inventario y fecha
    sheet.mergeCells('A2', 'H2')
    const fechaCell = sheet.getCell('A2')
    fechaCell.value = `Inventario: ${inventarioNombre}`
    fechaCell.font = { italic: true }
    fechaCell.alignment = { horizontal: 'right' }


    sheet.mergeCells('A3', 'H3')
    const fechaCell2 = sheet.getCell('A3')
    fechaCell2.value = `Fecha de generación: ${new Date().toLocaleDateString()}`
    fechaCell2.font = { italic: true }
    fechaCell2.alignment = { horizontal: 'right' }

    // Espacio vacío antes de tabla
    sheet.addRow([])

    // 🧱 3. Encabezados de la tabla con clave

    const headerRow = sheet.addRow([
        'Nro', 'Inventario', 'Equipo', 'Ubicación', 'Estado',
        'Encontrado', 'Observaciones', 'Fecha'
    ])
    headerRow.eachCell(cell => {
        cell.font = { bold: true }
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0F7FA' }
        }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
    })

    sheet.columns = [
        { key: 'nro', width: 6 },
        { key: 'inventario_id', width: 15 },
        { key: 'equipo_id', width: 15 },
        { key: 'ubicacion_ercontrada', width: 20 },
        { key: 'estado_encontrado', width: 15 },
        { key: 'encontrado', width: 12 },
        { key: 'observaciones', width: 30 },
        { key: 'fecha_revision', width: 15 },
    ]


    // 🧮 4. Agregar datos
    data.forEach((item, index) => {
        sheet.addRow({
            nro: index + 1,
            ...item,
            inventario_id: Number(item.inventario_id),
            equipo_id: Number(item.equipo_id),
            ubicacion_ercontrada: Number(item.ubicacion_ercontrada),
            estado_encontrado: Number(item.estado_encontrado),
            encontrado: item.encontrado ? 'Sí' : 'No',
        })
    })


    // 📦 7. Descargar
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    saveAs(blob, filename)
}

function exportarPDF(data, inventarioNombre = 'Inventario', filename = 'reporte_inventario.pdf') {
    const doc = new jsPDF()

    // 🧾 1. Título principal
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Reporte de Revisión de Equipos', 105, 20, { align: 'center' })

    // 🗓️ 2. Subtítulo con nombre del inventario y fecha
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Inventario: ${inventarioNombre}`, 14, 30)
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 36)

    // 📋 3. Datos para tabla
    const body = data.map((item, index) => [
        index + 1,
        item.inventario_id,
        item.equipo_id,
        item.ubicacion_ercontrada,
        item.estado_encontrado,
        item.encontrado ? 'Sí' : 'No',
        item.observaciones,
        item.fecha_revision
    ])

    // 📑 4. Generar tabla
    autoTable(doc, {
        startY: 45, // posición inicial
        head: [[
            'Nro', 'Inventario', 'Equipo', 'Ubicación', 'Estado',
            'Encontrado', 'Observaciones', 'Fecha'
        ]],
        body: body,
        styles: {
            fontSize: 9,
            cellPadding: 3,
            valign: 'middle'
        },
        headStyles: {
            fillColor: [22, 160, 133], // verde azulado
            textColor: [255, 255, 255],
            halign: 'center',
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { halign: 'center', cellWidth: 10 },  // Nro
            1: { halign: 'center' }, // Inventario
            2: { halign: 'center' }, // Equipo
            5: { halign: 'center' }, // Encontrado
            7: { halign: 'center' }, // Fecha
        }
    })

    // 💾 5. Guardar PDF
    doc.save(filename)
}

</script>


<style scoped></style>