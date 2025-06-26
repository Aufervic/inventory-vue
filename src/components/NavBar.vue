<script setup>
import { logout, username } from '@/store/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

function cerrarSesion() {
    logout()
    router.push('/login')
}
</script>

<template>
    <nav class="navbar navbar-expand navbar-light bg-light px-3 border-bottom">
        <span class="navbar-brand">Panel de Control</span>

        <div class="ms-auto d-flex align-items-center gap-3">
            <span class="text-muted">
                <i class="bi bi-person-circle me-1"></i> {{ username }}
            </span>
            <button class="btn btn-sm btn-outline-danger" @click="cerrarSesion">
                <i class="bi bi-box-arrow-right"></i> Salir
            </button>
        </div>
    </nav>
</template>
