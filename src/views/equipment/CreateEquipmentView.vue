<script setup>
import { reactive, ref, onMounted } from 'vue'

const form = reactive({
    nombre: '',
    email: '',
    rol: ''
})

// Bandera para mostrar mensaje de éxito
const enviado = ref(false)

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
        <h2>Formulario de registro</h2>

        <form @submit.prevent="enviarFormulario">
            <!-- Campo nombre -->
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" id="nombre" class="form-control" v-model="form.nombre" required />
            </div>

            <!-- Campo email -->
            <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" id="email" class="form-control" v-model="form.email" required />
            </div>

            <!-- Campo rol (select) -->
            <div class="mb-3">
                <label for="rol" class="form-label">Rol</label>
                <select id="rol" class="form-select" v-model="form.rol" required>
                    <option value="">Selecciona un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                    <option value="guest">Invitado</option>
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