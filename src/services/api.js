import axios from 'axios'
import { getAccessToken, getRefreshToken, logout } from '@/store/auth'

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

        // si no es error 401 o ya se reintentó, lanza error
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error)
        }

        // marcar que se reintentará una sola vez
        originalRequest._retry = true

        // Intentar refresh
        const refresh = getRefreshToken()

        if(!refresh){
            logout()
            return Promise.reject(error)
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh', {
                refresh: refresh,
            })

            const newAccess = response.data.access

            //actualizar cabecera y reintentar solicitud
            originalRequest.headers.Authorization = `Bearer ${newAccess}`

            return api(originalRequest)

        }catch(refreshError){
            logout()
            return Promise.reject(refreshError)
        }
    }
)


export default api
