// mini store :V
import { ref } from 'vue'

export const isAuth = ref(localStorage.getItem('auth') === 'true')
export const username = ref(localStorage.getItem('username') || '')

export function login(name = 'admin') {
  localStorage.setItem('auth', 'true')
  localStorage.setItem('username', name)
  
  isAuth.value = true
  username.value = name
}


export function logout() {
  localStorage.removeItem('auth')
  localStorage.removeItem('username')
  
  isAuth.value = false
  username.value = ''
}
