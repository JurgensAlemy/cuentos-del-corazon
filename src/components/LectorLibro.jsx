import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { useTTS } from '../utils/useTTS'

export default function LectorLibro({ titulo, paginas, onCerrar }) {
    const [indice, setIndice] = useState(0)
    const [leyendoTodo, setLeyendoTodo] = useState(false)
    const { leer, detener, hablando, soportado } = useTTS()

    const pagina = paginas[indice]
    const esPrimera = indice === 0
    const esUltima = indice === paginas.length - 1

    useEffect(() => () => detener(), []) // detiene la voz al desmontar

    const irSiguiente = () => {
        detener()
        setLeyendoTodo(false)
        if (!esUltima) setIndice((i) => i + 1)
    }

    const irAnterior = () => {
        detener()
        setLeyendoTodo(false)
        if (!esPrimera) setIndice((i) => i - 1)
    }

    const leerPaginaActual = () => {
        if (hablando) {
            detener()
            return
        }
        leer(pagina.texto || '')
    }

    const leerDesde = (desde) => {
        if (desde >= paginas.length) {
            setLeyendoTodo(false)
            return
        }
        setIndice(desde)
        setLeyendoTodo(true)
        const texto = paginas[desde].texto
        if (!texto) {
            setTimeout(() => leerDesde(desde + 1), 700)
            return
        }
        leer(texto, () => leerDesde(desde + 1))
    }

    const detenerLecturaTotal = () => {
        detener()
        setLeyendoTodo(false)
    }

    const imagen = pagina.modoVisual === 'dibujo' ? pagina.dibujo : pagina.imagen

    return (
        <div className="fixed inset-0 bg-innova-dark/95 z-[150] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 text-white">
                <h2 className="font-bold truncate flex items-center gap-2">
                    <Sparkles size={18} className="text-innova-orange shrink-0" /> {titulo}
                </h2>
                <div className="flex items-center gap-3">
                    {soportado && (
                        <button
                            onClick={() => (leyendoTodo || hablando ? detenerLecturaTotal() : leerDesde(indice))}
                            className="flex items-center gap-1.5 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full"
                        >
                            {leyendoTodo || hablando ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            {leyendoTodo || hablando ? 'Detener' : 'Leer todo el cuento'}
                        </button>
                    )}
                    {onCerrar && (
                        <button
                            onClick={() => {
                                detenerLecturaTotal()
                                onCerrar()
                            }}
                            className="text-white/70 hover:text-white"
                        >
                            <X size={22} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center gap-2 px-2 pb-4 overflow-hidden">
                <button
                    onClick={irAnterior}
                    disabled={esPrimera}
                    className="text-white/60 hover:text-white disabled:opacity-20 p-2 shrink-0"
                >
                    <ChevronLeft size={32} />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={indice}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-lg shadow-2xl w-full max-w-sm md:max-w-md aspect-[210/297] mx-2 flex flex-col overflow-hidden"
                    >
                        <div className="flex-1 bg-gray-50 min-h-0 relative">
                            {imagen ? (
                                <img src={imagen} alt="" className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm text-center px-6">
                                    Esta página todavía no tiene ilustración
                                </div>
                            )}
                        </div>

                        <div className="p-5 md:p-6 border-t overflow-y-auto shrink-0 max-h-[40%]">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-3 text-sm md:text-base">
                                {pagina.texto || 'Esta página todavía no tiene texto.'}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                {pagina.texto && soportado && (
                                    <button
                                        onClick={leerPaginaActual}
                                        className="flex items-center gap-1.5 text-sm text-innova-blue bg-innova-blue-light px-3 py-1.5 rounded-full"
                                    >
                                        {hablando && !leyendoTodo ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                        {hablando && !leyendoTodo ? 'Detener' : 'Leer esta página'}
                                    </button>
                                )}
                            </div>
                            {pagina.audio && <audio src={pagina.audio} controls className="mt-3 h-9 w-full" />}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button
                    onClick={irSiguiente}
                    disabled={esUltima}
                    className="text-white/60 hover:text-white disabled:opacity-20 p-2 shrink-0"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            <div className="flex justify-center gap-1.5 pb-5">
                {paginas.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            detenerLecturaTotal()
                            setIndice(i)
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${i === indice ? 'bg-innova-orange' : 'bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    )
}