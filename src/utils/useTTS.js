import { useState, useCallback, useEffect, useRef } from 'react'

function elegirMejorVoz() {
    const voces = window.speechSynthesis.getVoices()
    if (!voces.length) return null

    const candidatas = voces.filter((v) => v.lang.startsWith('es'))
    if (!candidatas.length) return null

    // Prioridad: voces "Google" o "Natural" en español (suenan mucho mejor)
    const preferida =
        candidatas.find((v) => /google/i.test(v.name)) ||
        candidatas.find((v) => /natural|neural/i.test(v.name)) ||
        candidatas.find((v) => v.lang === 'es-US') ||
        candidatas[0]

    return preferida
}

export function useTTS() {
    const [hablando, setHablando] = useState(false)
    const [soportado, setSoportado] = useState(true)
    const vozRef = useRef(null)

    useEffect(() => {
        const disponible = 'speechSynthesis' in window
        setSoportado(disponible)
        if (!disponible) return

        const cargarVoz = () => {
            vozRef.current = elegirMejorVoz()
        }

        cargarVoz()
        // Las voces a veces cargan async, este evento avisa cuando ya están listas
        window.speechSynthesis.onvoiceschanged = cargarVoz
    }, [])

    const leer = useCallback((texto) => {
        if (!soportado || !texto) return
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(texto)
        if (vozRef.current) {
            utterance.voice = vozRef.current
            utterance.lang = vozRef.current.lang
        } else {
            utterance.lang = 'es-ES'
        }
        utterance.rate = 1
        utterance.pitch = 1

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