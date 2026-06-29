import { Volume2, VolumeX } from 'lucide-react'
import { useTTS } from '../utils/useTTS'

export default function BotonLeer({ texto, className = '' }) {
    const { leer, detener, hablando, soportado } = useTTS()

    if (!soportado) return null

    return (
        <button
            onClick={() => (hablando ? detener() : leer(texto))}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${hablando
                    ? 'bg-innova-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-innova-blue-light hover:text-innova-blue'
                } ${className}`}
        >
            {hablando ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {hablando ? 'Detener' : 'Leer en voz alta'}
        </button>
    )
}