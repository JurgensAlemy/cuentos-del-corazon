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