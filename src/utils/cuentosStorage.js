const KEY = 'cuentos-del-corazon:publicados'

export function obtenerCuentos() {
    try {
        const data = localStorage.getItem(KEY)
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

export function guardarCuento(cuento) {
    const actuales = obtenerCuentos()
    const nuevo = {
        ...cuento,
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
    }
    localStorage.setItem(KEY, JSON.stringify([nuevo, ...actuales]))
    return nuevo
}

export function eliminarCuento(id) {
    const actuales = obtenerCuentos()
    localStorage.setItem(KEY, JSON.stringify(actuales.filter((c) => c.id !== id)))
}

export function agregarReaccion(cuentoId, tipoReaccion) {
    const actuales = obtenerCuentos()
    const actualizados = actuales.map((c) => {
        if (c.id !== cuentoId) return c
        const reacciones = c.reacciones || {}
        return {
            ...c,
            reacciones: {
                ...reacciones,
                [tipoReaccion]: (reacciones[tipoReaccion] || 0) + 1,
            },
        }
    })
    localStorage.setItem(KEY, JSON.stringify(actualizados))
    return actualizados.find((c) => c.id === cuentoId)
}

export function agregarComentario(cuentoId, autor, texto) {
    const actuales = obtenerCuentos()
    const actualizados = actuales.map((c) => {
        if (c.id !== cuentoId) return c
        const comentarios = c.comentarios || []
        return {
            ...c,
            comentarios: [
                ...comentarios,
                { id: crypto.randomUUID(), autor, texto, fecha: new Date().toISOString() },
            ],
        }
    })
    localStorage.setItem(KEY, JSON.stringify(actualizados))
    return actualizados.find((c) => c.id === cuentoId)
}