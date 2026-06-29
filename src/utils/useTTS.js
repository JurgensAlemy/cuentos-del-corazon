import { useState, useCallback, useEffect } from 'react'

export function useTTS() {
    const [hablando, setHablando] = useState(false)
    const [soportado, setSoportado] = useState(true)

    useEffect(() => {
        setSoportado('speechSynthesis' in window)
    }, [])

    const leer = useCallback((texto) => {
        if (!soportado || !texto) return
        window.speechSynthesis.cancel() // corta cualquier lectura anterior

        const utterance = new SpeechSynthesisUtterance(texto)
        utterance.lang = 'es-ES'
        utterance.rate = 0.95
        utterance.pitch = 1.1

        utterance.onstart = () => setHablando(true)
        utterance.onend = () => setHablando(false)
        utterance.onerror = () => setHablando(false)

        window.speechSynthesis.speak(utterance)
    }, [soportado])

    const detener = useCallback(() => {
        window.speechSynthesis.cancel()
        setHablando(false)
    }, [])

    return { leer, detener, hablando, soportado }
}