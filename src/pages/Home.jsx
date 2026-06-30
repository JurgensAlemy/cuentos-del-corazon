import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PencilLine, Sparkles, ArrowRight } from 'lucide-react'
import FloatingEmotions from '../components/FloatingEmotions'

export default function Home() {
    return (
        <div>
            {/* HERO */}
            <section className="relative bg-gradient-to-b from-innova-blue-light to-white py-20 px-4 text-center overflow-hidden">
                <FloatingEmotions />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <span className="inline-block bg-innova-green/20 text-innova-dark text-sm font-semibold px-4 py-1 rounded-full mb-4">
                        Innova Schools — Unidocencia
                    </span>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-innova-blue mb-4 leading-tight">
                        Cuentos que nacen <br /> del corazón{' '}
                        <motion.span
                            className="inline-block"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ❤️
                        </motion.span>
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                        Un espacio donde los niños aprenden a reconocer, expresar y
                        cuidar sus emociones creando sus propios cuentos digitales.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/crear"
                            className="flex items-center gap-2 bg-innova-orange hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
                        >
                            <PencilLine size={20} />
                            Crear mi cuento
                        </Link>
                        <Link
                            to="/explorador"
                            className="flex items-center gap-2 bg-white hover:bg-innova-blue-light text-innova-blue font-semibold px-6 py-3 rounded-full shadow-md transition-colors"
                        >
                            <Sparkles size={20} />
                            Explorar emociones
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* RESUMEN DEL PROYECTO */}
            <section className="py-16 px-4 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            emoji: '🎯',
                            title: 'El objetivo',
                            text: 'Fortalecer la identificación, expresión y autorregulación de las emociones en los estudiantes.',
                            color: 'border-innova-orange',
                        },
                        {
                            emoji: '📖',
                            title: 'La estrategia',
                            text: 'Cuentos digitales interactivos con texto, dibujos, imágenes y grabaciones de voz.',
                            color: 'border-innova-green',
                        },
                        {
                            emoji: '🌱',
                            title: 'El impacto',
                            text: 'Más empatía, autorreflexión, creatividad y mejor convivencia escolar.',
                            color: 'border-innova-blue',
                        },
                    ].map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className={`bg-white rounded-2xl shadow-sm p-6 text-center border-t-4 ${card.color} hover:-translate-y-1 transition-transform`}
                        >
                            <div className="text-4xl mb-3">{card.emoji}</div>
                            <h3 className="font-bold text-innova-blue mb-2">{card.title}</h3>
                            <p className="text-gray-600 text-sm">{card.text}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        to="/proyecto"
                        className="inline-flex items-center gap-1 text-innova-blue font-semibold hover:underline"
                    >
                        Conocer el proyecto completo <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    )
}