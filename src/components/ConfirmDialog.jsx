import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({ abierto, titulo, mensaje, onConfirmar, onCancelar }) {
    return (
        <AnimatePresence>
            {abierto && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[200]"
                    onClick={onCancelar}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center"
                    >
                        <div className="bg-red-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="text-red-500" size={26} />
                        </div>
                        <h3 className="font-bold text-innova-dark text-lg mb-2">{titulo}</h3>
                        <p className="text-gray-500 text-sm mb-6">{mensaje}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={onCancelar}
                                className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-full hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirmar}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-full"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}