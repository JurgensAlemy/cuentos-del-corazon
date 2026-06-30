import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircleHeart, Send } from 'lucide-react'

export default function ComentariosFamilia({ comentarios = [], onComentar }) {
    const [autor, setAutor] = useState('')
    const [texto, setTexto] = useState('')

    const enviar = () => {
        if (!texto.trim()) return
        onComentar(autor.trim() || 'Familia', texto.trim())
        setTexto('')
    }

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <MessageCircleHeart size={18} className="text-innova-orange" />
                <p className="text-sm font-semibold text-innova-dark">
                    Comentarios de la familia
                </p>
            </div>

            {/* LISTA DE COMENTARIOS */}
            <AnimatePresence>
                {comentarios.length > 0 ? (
                    <div className="space-y-2 mb-4">
                        {comentarios.map((c) => (
                            <motion.div
                                key={c.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-innova-orange/5 border border-innova-orange/20 rounded-xl p-3"
                            >
                                <p className="text-sm text-gray-700">{c.texto}</p>
                                <p className="text-xs text-innova-orange font-medium mt-1">— {c.autor}</p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400 mb-4">
                        Todavía no hay comentarios. ¡Sé el primero en dejar uno!
                    </p>
                )}
            </AnimatePresence>

            {/* FORMULARIO */}
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Tu nombre (ej: Mamá de Sofía)"
                    className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-innova-orange"
                />
                <div className="flex gap-2">
                    <textarea
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Escribe un mensaje bonito sobre este cuento..."
                        rows={2}
                        className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-innova-orange"
                    />
                    <button
                        onClick={enviar}
                        disabled={!texto.trim()}
                        className="bg-innova-orange hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-xl px-4 shrink-0"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}