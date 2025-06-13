<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['id'])

const form = reactive({
    id: '',
    codigo_patrimonial: '',
    descripcion: '',
    numero_serie: '',
    marca: '',
    modelo: '',
    fecha_alta: '',
    fecha_compra: '',
    numero_o_c: '',
    numero_nea: '',
    centro_costos: '',
    tipo_ingreso: '',
    estado: '',
    ubicacion: ''
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)


onMounted(()=>{
    axios
        .get(`http://127.0.0.1:8000/api/equipos/${props.id}`)
        .then(response => (Object.assign(form, response.data)))
        .catch(error => console.log(error))

})

// Función al enviar el formulario
function enviarFormulario() {
    console.log('Formulario enviado:', form)
    enviado.value = true

    // Simular limpieza después de enviar (opcional)
    // form.nombre = ''
    // form.email = ''
    // form.rol = ''
}

</script>

<template>
    <div class="container mt-4">
        <h2>Actualizar Equipo</h2>

        <form @submit.prevent="enviarFormulario">
            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Código Patrimonial</label>
                <input type="text" id="nombre" class="form-control" v-model="form.codigo_patrimonial" required />
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Descripción</label>
                <input type="text" id="nombre" class="form-control" v-model="form.descripcion" required />
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Número de Serie</label>
                <input type="text" id="nombre" class="form-control" v-model="form.numero_serie" required />
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Marca</label>
                <input type="text" id="nombre" class="form-control" v-model="form.marca" required />
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Modelo</label>
                <input type="text" id="nombre" class="form-control" v-model="form.modelo" required />
            </div>

            <div class="mb-3">
                <label for="fecha" class="form-label fw-bold">Fecha de Alta</label>
                <input type="date" id="fecha" class="form-control" v-model="form.fecha_alta" required />
                <!--
                        <small class="form-text text-muted">Seleccione una fecha válida.</small>
                    -->
            </div>

            <div class="mb-3">
                <label for="fecha" class="form-label fw-bold">Fecha de Compra</label>
                <input type="date" id="fecha" class="form-control" v-model="form.fecha_compra" required />
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Número OC</label>
                <input type="text" id="nombre" class="form-control" v-model="form.numero_o_c" required />
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Número NEA</label>
                <input type="text" id="nombre" class="form-control" v-model="form.numero_nea" required />
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label fw-bold">Centro de Costos</label>
                <input type="text" id="nombre" class="form-control" v-model="form.centro_costos" required />
            </div>

            <!-- Campo email -->
            <!--
            
             <div class="mb-3">
                 <label for="email" class="form-label fw-bold">Correo electrónico</label>
                 <input type="email" id="email" class="form-control" v-model="form.email" required />
             </div>
             -->

            <div class="mb-3">
                <label for="tipo_ingreso" class="form-label fw-bold">Tipo de Ingreso</label>
                <select id="tipo_ingreso" class="form-select" v-model="form.tipo_ingreso" required>
                    <option value="">Selecciona un rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuario</option>
                    <option value="3">Invitado</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="estado" class="form-label fw-bold">Estado</label>
                <select id="estado" class="form-select" v-model="form.estado" required>
                    <option value="">Selecciona un rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuario</option>
                    <option value="3">Invitado</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="ubicacion" class="form-label fw-bold">Ubicación</label>
                <select id="ubicacion" class="form-select" v-model="form.ubicacion" required>
                    <option value="">Selecciona un rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuario</option>
                    <option value="3">Invitado</option>
                </select>
            </div>

            <!-- Botón de envío -->
            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>

        <!-- Mostrar datos enviados -->
        <div v-if="enviado" class="alert alert-success mt-4">
            <strong>Formulario enviado:</strong>
            <pre>{{ form }}</pre>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>