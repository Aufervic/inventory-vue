import axios from 'axios'
import { getAccessToken, getRefreshToken, login, logout } from '@/store/auth'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})


// Interceptor de solicitud
api.interceptors.request.use(config => {
    const token = getAccessToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


// Interceptor de respuesta
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        const status = error.response?.status
        const data = error.response?.data

        // Evitar múltiples reintentos
        if (originalRequest._retry) {
            return Promise.reject(error)
        }

        // Verifica si es error 401 o error 403 por token inválido
        const isAuthError = (
            status === 401 ||
            (status === 403 && data?.code === "token_not_valid")
        )
        if (!isAuthError) {
            return Promise.reject(error)
        }

        // marcar que se reintentará una sola vez
        originalRequest._retry = true

        // Intentar refresh
        const refresh = getRefreshToken()

        if (!refresh) {
            logout()
            return Promise.reject(error)
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh', {
                refresh: refresh,
            })

            const newAccess = response.data.access
            const newRefresh = response.data.refresh  // <-- Nuevo refresh

            login({
                access: newAccess,
                refresh: newRefresh,
                name: localStorage.getItem('username') || '',
            })

            //actualizar cabecera y reintentar solicitud
            originalRequest.headers.Authorization = `Bearer ${newAccess}`

            return api(originalRequest)

        } catch (refreshError) {
            logout()
            return Promise.reject(refreshError)
        }
    }
)


export default api
