import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'
import Proyecto from './Proyecto'
import Sustento from './Sustento'

export default function Acerca() {
    const [tab, setTab] = useState('proyecto')

    return (
        <div>
            <div className="max-w-5xl mx-auto px-4 pt-10">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-innova-blue mb-2">
                        Acerca del Proyecto
                    </h1>
                    <p className="text-gray-600">
                        Información para docentes, familias y jurado evaluador
                    </p>
                </motion.div>

                <div className="flex justify-center gap-2 mb-6">
                    <button
                        onClick={() => setTab('proyecto')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-colors ${tab === 'proyecto'
                                ? 'bg-innova-blue text-white border-innova-blue'
                                : 'border-gray-200 text-gray-500 hover:border-innova-blue'
                            }`}
                    >
                        <BookOpen size={16} /> El Proyecto
                    </button>
                    <button
                        onClick={() => setTab('jurado')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-colors ${tab === 'jurado'
                                ? 'bg-innova-blue text-white border-innova-blue'
                                : 'border-gray-200 text-gray-500 hover:border-innova-blue'
                            }`}
                    >
                        <GraduationCap size={16} /> Para el Jurado
                    </button>
                </div>
            </div>

            {tab === 'proyecto' ? <Proyecto /> : <Sustento />}
        </div>
    )
}