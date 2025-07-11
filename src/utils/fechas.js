export function formatearFecha(fechaIso) {
    if (!fechaIso) return ''
    const [año, mes, dia] = fechaIso.split('-')
    return `${dia}-${mes}-${año}`
}


export function fechaActualYYYYMMDD() {
  return new Date().toISOString().slice(0, 10)
}