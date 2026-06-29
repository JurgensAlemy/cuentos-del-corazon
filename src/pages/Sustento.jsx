import { motion } from 'framer-motion'
import {
    GraduationCap, Brain, Lightbulb, Sprout,
    CheckCircle2, Target, Heart, Sparkles,
} from 'lucide-react'

const teorias = [
    {
        icon: Brain,
        title: 'Aprendizaje Socioemocional (SEL)',
        text: 'Marco que desarrolla competencias para reconocer y manejar emociones, mostrar empatía, establecer relaciones positivas y tomar decisiones responsables.',
        color: 'text-innova-orange bg-innova-orange/10',
    },
    {
        icon: Lightbulb,
        title: 'Inteligencia Emocional (Daniel Goleman)',
        text: 'La capacidad de identificar, comprender y regular las propias emociones y las de los demás, como base del bienestar y la convivencia.',
        color: 'text-innova-green bg-innova-green/10',
    },
    {
        icon: Sprout,
        title: 'Constructivismo',
        text: 'El estudiante construye su propio aprendizaje a partir de la experiencia directa, la reflexión y la creación activa de significados.',
        color: 'text-innova-blue bg-innova-blue-light',
    },
]

const valorAgregado = [
    'Transforma una herramienta digital en un recurso pedagógico',
    'Promueve la autorreflexión, empatía, creatividad y comunicación',
    'Integra a la familia en la valoración de las producciones',
    'Reemplaza Book Creator: todo el proceso ocurre en una sola plataforma',
]

const caracteristicas = [
    { label: 'Innovadora', desc: 'Combina narrativa digital con desarrollo emocional' },
    { label: 'Inclusiva', desc: 'Múltiples formas de expresión: texto, dibujo, voz e imagen' },
    { label: 'Viable', desc: 'No requiere base de datos ni infraestructura compleja' },
    { label: 'Replicable', desc: 'Aplicable a otras aulas y niveles de Unidocencia' },
]

export default function Sustento() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* TÍTULO */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 bg-innova-blue-light text-innova-blue text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                    <GraduationCap size={16} /> Para Docentes y Familias
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-innova-blue mb-3">
                    Sustento Teórico
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    ¿Por qué esta propuesta debe ser seleccionada?
                </p>
            </motion.div>

            {/* JUSTIFICACIÓN PRINCIPAL */}
            <motion.section
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-10 border-l-4 border-innova-orange"
            >
                <div className="flex items-start gap-4">
                    <div className="bg-innova-orange/10 p-3 rounded-xl shrink-0">
                        <Target className="text-innova-orange" size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-innova-dark mb-3">
                            Responde a una necesidad prioritaria
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Este proyecto debe ser seleccionado ya que responde a una
                            necesidad prioritaria de la Institución Educativa en el nivel
                            de Unidocencia. Según los resultados obtenidos en el 2025, el{' '}
                            <span className="font-bold text-innova-orange">
                                60% de los estudiantes
                            </span>{' '}
                            presenta dificultades para reconocer, expresar y regular sus
                            emociones, afectando su aprendizaje y convivencia escolar.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            "Cuentos digitales que nacen del corazón" integra el
                            aprendizaje socioemocional con la creación de cuentos
                            digitales, permitiendo que los estudiantes expresen sus
                            emociones mediante textos, dibujos, imágenes y audios.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* TEORÍAS */}
            <h2 className="text-2xl font-bold text-innova-blue text-center mb-6">
                Fundamentación teórica
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {teorias.map((t, i) => {
                    const Icon = t.icon
                    return (
                        <motion.div
                            key={t.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 }}
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

            {/* VALOR AGREGADO */}
            <motion.section
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-10 border-l-4 border-innova-blue"
            >
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="text-innova-blue" size={22} />
                    <h2 className="text-xl font-bold text-innova-dark">Valor agregado</h2>
                </div>
                <ul className="space-y-3">
                    {valorAgregado.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle2 size={18} className="text-innova-green shrink-0 mt-0.5" />
                            {item}
                        </li>
                    ))}
                </ul>
            </motion.section>

            {/* CARACTERÍSTICAS */}
            <h2 className="text-2xl font-bold text-innova-blue text-center mb-6">
                Características de la propuesta
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {caracteristicas.map((c, i) => (
                    <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-3"
                    >
                        <div className="bg-innova-green/10 p-2 rounded-lg shrink-0">
                            <CheckCircle2 className="text-innova-green" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-innova-dark">{c.label}</h3>
                            <p className="text-gray-500 text-sm">{c.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CIERRE */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-innova-blue-light rounded-2xl p-8 text-center"
            >
                <Heart className="text-innova-orange mx-auto mb-3" size={32} fill="currentColor" />
                <p className="text-innova-dark font-medium max-w-2xl mx-auto leading-relaxed">
                    Su implementación contribuirá al bienestar emocional de los
                    estudiantes y al fortalecimiento de una convivencia escolar basada
                    en el respeto y la empatía.
                </p>
            </motion.div>
        </div>
    )
}