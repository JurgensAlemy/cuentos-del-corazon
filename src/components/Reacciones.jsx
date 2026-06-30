import { motion } from 'framer-motion'

const tiposReaccion = [
    { id: 'meAyudo', emoji: '💪', label: 'Esto me ayudó' },
    { id: 'meIdentifique', emoji: '🤝', label: 'Me identifiqué' },
    { id: 'meGusto', emoji: '❤️', label: 'Me gustó mucho' },
]

export default function Reacciones({ reacciones = {}, onReaccionar }) {
    return (
        <div className="flex flex-wrap gap-2">
            {tiposReaccion.map((t) => (
                <motion.button
                    key={t.id}
                    whileTap={{ scale: 1.3 }}
                    onClick={() => onReaccionar(t.id)}
                    className="flex items-center gap-1.5 bg-gray-50 hover:bg-innova-blue-light px-3 py-1.5 rounded-full text-sm transition-colors"
                >
                    <span>{t.emoji}</span>
                    <span className="text-gray-600">{t.label}</span>
                    {reacciones[t.id] > 0 && (
                        <span className="bg-white text-innova-blue font-bold text-xs px-1.5 py-0.5 rounded-full min-w-[18px]">
                            {reacciones[t.id]}
                        </span>
                    )}
                </motion.button>
            ))}
        </div>
    )
}