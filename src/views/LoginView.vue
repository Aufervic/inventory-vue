<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/store/auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')


async function handleLogin() {
  error.value = ''

  try {
    const res = await fetch('http://127.0.0.1:8000//api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    if (!res.ok) {
      throw new Error('Credenciales inválidas')
    }

    const data = await res.json()
    
    login({
      access: data.access,
      refresh: data.refresh,
      name: username.value
    })

    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
</script>


<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
    <div class="card shadow p-4 bg-white text-dark" style="min-width: 320px; max-width: 420px;">
      <div class="text-center mb-4">
        <i class="bi bi-hdd-network-fill display-5 text-success mb-2"></i>
        <h4 class="fw-bold mb-0">Sistema de Inventario</h4>
        <small class="text-muted">RED-PAD-FCE - Gestión de Equipos</small>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Usuario</label>
          <input v-model="username" type="text" id="username" class="form-control" placeholder="Ej. admin" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="password" type="password" id="password" class="form-control" placeholder="••••••" required />
        </div>

        <div class="d-grid">
          <button type="submit" class="btn btn-success">
            <i class="bi bi-box-arrow-in-right me-1"></i> Ingresar al sistema
          </button>
        </div>

        <p class="text-danger text-center mt-3" v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
