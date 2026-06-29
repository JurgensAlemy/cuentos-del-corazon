import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Trash2, X, Images as ImagesIcon } from 'lucide-react'
import { obtenerCuentos, eliminarCuento } from '../utils/cuentosStorage'

const emocionInfo = {
    alegria: { emoji: '😊', label: 'Alegría', color: 'border-innova-orange' },
    tristeza: { emoji: '😢', label: 'Tristeza', color: 'border-innova-blue' },
    enojo: { emoji: '😡', label: 'Enojo', color: 'border-red-400' },
    miedo: { emoji: '😨', label: 'Miedo', color: 'border-innova-green' },
}

export default function Galeria() {
    const [cuentos, setCuentos] = useState([])
    const [abierto, setAbierto] = useState(null)

    useEffect(() => {
        setCuentos(obtenerCuentos())
    }, [])

    const borrar = (id) => {
        eliminarCuento(id)
        setCuentos(obtenerCuentos())
        setAbierto(null)
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-innova-blue mb-3">
                    Galería de Cuentos
                </h1>
                <p className="text-gray-600">
                    Los cuentos digitales creados por los estudiantes ✨
                </p>
            </motion.div>

            {cuentos.length === 0 ? (
                <div className="text-center text-gray-400 py-16">
                    <ImagesIcon size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Todavía no hay cuentos publicados en este dispositivo.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cuentos.map((c, i) => {
                        const info = emocionInfo[c.emocion] || {}
                        const portada = c.paginas?.[0]
                        const imagenPortada =
                            portada?.modoVisual === 'dibujo' ? portada?.dibujo : portada?.imagen

                        return (
                            <motion.button
                                key={c.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                onClick={() => setAbierto(c)}
                                className={`bg-white rounded-2xl shadow-sm overflow-hidden text-left border-t-4 ${info.color} hover:-translate-y-1 transition-transform`}
                            >
                                <div className="h-36 bg-gray-50 flex items-center justify-center">
                                    {imagenPortada ? (
                                        <img src={imagenPortada} alt={c.titulo} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-5xl">{info.emoji}</span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-innova-dark truncate">{c.titulo}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        {info.emoji} {info.label} · {c.paginas?.length} página{c.paginas?.length !== 1 && 's'}
                                    </p>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            )}

            {/* MODAL DE LECTURA */}
            <AnimatePresence>
                {abierto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={() => setAbierto(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-6 relative max-h-[85vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setAbierto(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={22} />
                            </button>

                            <div className="flex items-center gap-2 mb-5">
                                <BookOpen className="text-innova-blue" size={22} />
                                <h2 className="text-xl font-bold text-innova-blue">{abierto.titulo}</h2>
                            </div>

                            <div className="space-y-6">
                                {abierto.paginas.map((p, i) => (
                                    <div key={p.id || i} className="grid md:grid-cols-2 gap-4 items-center border-b pb-5 last:border-0">
                                        <p className="text-gray-700 whitespace-pre-line">
                                            {p.texto || 'Sin texto en esta página.'}
                                        </p>
                                        <div className="flex justify-center">
                                            {(p.modoVisual === 'dibujo' ? p.dibujo : p.imagen) ? (
                                                <img
                                                    src={p.modoVisual === 'dibujo' ? p.dibujo : p.imagen}
                                                    alt=""
                                                    className="max-h-48 rounded-xl border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 text-sm">
                                                    Sin ilustración
                                                </div>
                                            )}
                                        </div>
                                        {p.audio && <audio src={p.audio} controls className="md:col-span-2 h-9" />}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => borrar(abierto.id)}
                                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 mt-6"
                            >
                                <Trash2 size={14} /> Eliminar este cuento
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}