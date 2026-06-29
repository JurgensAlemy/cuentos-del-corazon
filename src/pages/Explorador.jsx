import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, MessageCircleHeart, X } from 'lucide-react'
import { emociones } from '../data/emociones'

export default function Explorador() {
    const [seleccionada, setSeleccionada] = useState(null)

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-innova-blue mb-3">
                    Explorador de Emociones
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Toca una emoción y descubre una historia, estrategias para
                    manejarla y una pregunta para reflexionar 💭
                </p>
            </motion.div>

            {/* GRID DE EMOCIONES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {emociones.map((emo, i) => (
                    <motion.button
                        key={emo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSeleccionada(emo)}
                        className={`flex flex-col items-center gap-2 p-6 rounded-2xl shadow-sm border-2 ${emo.bg} ${emo.border} transition-shadow hover:shadow-md`}
                    >
                        <span className="text-5xl">{emo.emoji}</span>
                        <span className={`font-bold ${emo.text}`}>{emo.nombre}</span>
                    </motion.button>
                ))}
            </div>

            {/* MODAL DE LA EMOCIÓN SELECCIONADA */}
            <AnimatePresence>
                {seleccionada && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
                        onClick={() => setSeleccionada(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6 md:p-8 relative max-h-[85vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSeleccionada(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={22} />
                            </button>

                            <div className="text-center mb-6">
                                <span className="text-6xl">{seleccionada.emoji}</span>
                                <h2 className={`text-2xl font-bold mt-2 ${seleccionada.text}`}>
                                    {seleccionada.nombre}
                                </h2>
                            </div>

                            <div className={`rounded-xl p-4 mb-5 ${seleccionada.bg}`}>
                                <p className="text-gray-700 leading-relaxed">
                                    {seleccionada.situacion}
                                </p>
                            </div>

                            <div className="mb-5">
                                <h3 className="flex items-center gap-2 font-bold text-innova-dark mb-3">
                                    <Lightbulb size={18} className={seleccionada.text} />
                                    ¿Cómo puedo manejarla?
                                </h3>
                                <ul className="space-y-2">
                                    {seleccionada.estrategias.map((est) => (
                                        <li
                                            key={est}
                                            className="flex items-start gap-2 text-gray-600 text-sm"
                                        >
                                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${seleccionada.bg.replace('/10', '')} ${seleccionada.border.replace('border', 'bg')}`} />
                                            {est}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={`rounded-xl p-4 flex items-start gap-3 border-2 ${seleccionada.border} ${seleccionada.bg}`}>
                                <MessageCircleHeart size={22} className={`shrink-0 ${seleccionada.text}`} />
                                <p className={`text-sm font-medium ${seleccionada.text}`}>
                                    {seleccionada.pregunta}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}