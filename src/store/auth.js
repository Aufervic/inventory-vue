// mini store :V
import { ref } from 'vue'

//export const isAuth = ref(localStorage.getItem('auth') === 'true')
export const isAuth = ref(!!localStorage.getItem('access'))
export const username = ref(localStorage.getItem('username') || '')

export function login({access, refresh, name = 'admin'}) {
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
  localStorage.setItem('username', name)
  //localStorage.setItem('auth', 'true')
  
  isAuth.value = true
  username.value = name
}


export function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('username')
  //localStorage.setItem('auth', 'false')
  
  isAuth.value = false
  username.value = ''
}



export function getAccessToken() {
  return localStorage.getItem('access')
}


export function getRefreshToken(){
  return localStorage.getItem('refresh')
}