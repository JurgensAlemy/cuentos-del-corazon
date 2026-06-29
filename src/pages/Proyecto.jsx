import { motion } from 'framer-motion'
import { AlertTriangle, Target, BookOpenCheck, Brain, Sprout, Lightbulb } from 'lucide-react'

const teorias = [
    {
        icon: Brain,
        title: 'Aprendizaje Socioemocional (SEL)',
        text: 'Marco que desarrolla competencias para reconocer y manejar emociones, mostrar empatía y construir relaciones sanas.',
        color: 'text-innova-orange bg-innova-orange/10',
    },
    {
        icon: Lightbulb,
        title: 'Inteligencia Emocional de Daniel Goleman',
        text: 'La capacidad de identificar, comprender y regular las propias emociones y las de los demás como base del bienestar.',
        color: 'text-innova-green bg-innova-green/10',
    },
    {
        icon: Sprout,
        title: 'Constructivismo',
        text: 'El estudiante construye su propio aprendizaje a partir de la experiencia, la reflexión y la creación activa.',
        color: 'text-innova-blue bg-innova-blue-light',
    },
]

export default function Proyecto() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* TÍTULO */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-innova-blue mb-3">
                    El Proyecto
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Una propuesta de innovación educativa para fortalecer las
                    competencias socioemocionales en Unidocencia.
                </p>
            </motion.div>

            {/* EL PROBLEMA */}
            <motion.section
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6 border-l-4 border-innova-orange"
            >
                <div className="flex items-start gap-4">
                    <div className="bg-innova-orange/10 p-3 rounded-xl shrink-0">
                        <AlertTriangle className="text-innova-orange" size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-innova-dark mb-2">
                            La necesidad detectada
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            La ficha de autoevaluación socioemocional 2025, junto con
                            observaciones docentes y registros tutoriales, reveló que el{' '}
                            <span className="font-bold text-innova-orange">
                                60% de los estudiantes de Unidocencia
                            </span>{' '}
                            tiene dificultades para identificar, expresar y regular sus
                            emociones. Esto repercute en su desempeño académico, genera
                            frustración y dificulta la convivencia escolar.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* OBJETIVO */}
            <motion.section
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6 border-l-4 border-innova-green"
            >
                <div className="flex items-start gap-4">
                    <div className="bg-innova-green/10 p-3 rounded-xl shrink-0">
                        <Target className="text-innova-green" size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-innova-dark mb-2">
                            Objetivo
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Fortalecer la identificación, expresión y autorregulación de
                            las emociones a través de la creación de cuentos digitales
                            interactivos.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* LA ESTRATEGIA */}
            <motion.section
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-10 border-l-4 border-innova-blue"
            >
                <div className="flex items-start gap-4">
                    <div className="bg-innova-blue-light p-3 rounded-xl shrink-0">
                        <BookOpenCheck className="text-innova-blue" size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-innova-dark mb-2">
                            "Cuentos digitales que nacen del corazón"
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            A diferencia de una actividad convencional de escritura, los
                            estudiantes elaboran cuentos digitales incorporando
                            ilustraciones, imágenes, grabaciones de voz y otros recursos
                            multimedia para expresar, comprender y reflexionar sobre sus
                            emociones.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            La experiencia parte de una pregunta retadora sobre
                            situaciones que generan distintas emociones, y culmina con la
                            creación y socialización de cuentos digitales que plantean
                            alternativas para gestionarlas adecuadamente.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* SUSTENTO TEÓRICO RESUMEN */}
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-innova-blue text-center mb-6"
            >
                Sustentado en
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
                {teorias.map((t, i) => {
                    const Icon = t.icon
                    return (
                        <motion.div
                            key={t.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="bg-white rounded-2xl shadow-sm p-6 text-center hover:-translate-y-1 transition-transform"
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${t.color}`}>
                                <Icon size={26} />
                            </div>
                            <h3 className="font-bold text-innova-dark mb-2">{t.title}</h3>
                            <p className="text-gray-600 text-sm">{t.text}</p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}