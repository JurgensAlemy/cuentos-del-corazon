import { preguntaAleatoria } from '../data/preguntasRetadoras'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, ArrowRight, Plus, Trash2, Download,
    Pencil, ImageIcon, BookOpen, Sparkles, Images, Mic,
} from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import DrawingCanvas from '../components/DrawingCanvas'
import VoiceRecorder from '../components/VoiceRecorder'
import ImageUploader from '../components/ImageUploader'

import { guardarCuento } from '../utils/cuentosStorage'
import { sonidoGuardar, sonidoExito } from '../utils/sounds'
import Confetti from '../components/Confetti'
import BotonLeer from '../components/BotonLeer'

import ConfirmDialog from '../components/ConfirmDialog'
import LectorLibro from '../components/LectorLibro'

const emocionesDisponibles = [
    { id: 'alegria', emoji: '😊', label: 'Alegría', color: 'bg-innova-orange' },
    { id: 'tristeza', emoji: '😢', label: 'Tristeza', color: 'bg-innova-blue' },
    { id: 'enojo', emoji: '😡', label: 'Enojo', color: 'bg-red-500' },
    { id: 'miedo', emoji: '😨', label: 'Miedo', color: 'bg-innova-green' },
]

const paginaVacia = () => ({
    id: crypto.randomUUID(),
    texto: '',
    modoVisual: 'dibujo', // 'dibujo' | 'imagen'
    dibujo: null,
    imagen: null,
    audio: null,
})

export default function Crear() {
    const [paso, setPaso] = useState('inicio') // inicio | reto | editando | final
    const [titulo, setTitulo] = useState('')
    const [emocion, setEmocion] = useState(null)
    const [paginas, setPaginas] = useState([paginaVacia()])
    const [paginaActual, setPaginaActual] = useState(0)
    const [generandoPDF, setGenerandoPDF] = useState(false)
    const [publicado, setPublicado] = useState(false)
    const [publicando, setPublicando] = useState(false)
    const [mostrarConfeti, setMostrarConfeti] = useState(false)
    const previewRef = useRef(null)
    const [pregunta] = useState(() => preguntaAleatoria())
    const [confirmandoEliminar, setConfirmandoEliminar] = useState(false)
    const [mostrarLector, setMostrarLector] = useState(false)

    const actualizarPagina = (campo, valor) => {
        setPaginas((prev) =>
            prev.map((p, i) => (i === paginaActual ? { ...p, [campo]: valor } : p))
        )
        if (campo === 'dibujo' || campo === 'imagen' || campo === 'audio') {
            sonidoGuardar()
        }
    }

    const agregarPagina = () => {
        setPaginas((prev) => [...prev, paginaVacia()])
        setPaginaActual(paginas.length)
    }

    const eliminarPagina = (index) => {
        if (paginas.length === 1) return
        setPaginas((prev) => prev.filter((_, i) => i !== index))
        setPaginaActual((prev) => Math.max(0, prev - 1))
    }

    const exportarPDF = async () => {
        setGenerandoPDF(true)
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
        const paginasNodos = previewRef.current.querySelectorAll('.pagina-pdf')

        for (let i = 0; i < paginasNodos.length; i++) {
            const canvas = await html2canvas(paginasNodos[i], { scale: 2 })
            const img = canvas.toDataURL('image/jpeg', 0.9)
            if (i > 0) pdf.addPage()
            const pageW = pdf.internal.pageSize.getWidth()
            const pageH = pdf.internal.pageSize.getHeight()
            pdf.addImage(img, 'JPEG', 0, 0, pageW, pageH)
        }

        pdf.save(`${titulo || 'mi-cuento'}.pdf`)
        setGenerandoPDF(false)
    }

    const publicarEnGaleria = () => {
        setPublicando(true)
        setTimeout(() => {
            guardarCuento({ titulo, emocion, paginas })
            setPublicando(false)
            setPublicado(true)
            sonidoExito()
            setMostrarConfeti(true)
            setTimeout(() => setMostrarConfeti(false), 2500)
        }, 600)
    }

    const pagina = paginas[paginaActual]

    // ---------- PANTALLA 1: INICIO ----------
    if (paso === 'inicio') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-extrabold text-innova-blue mb-2">
                        Crear mi cuento ✏️
                    </h1>
                    <p className="text-gray-600">
                        Vamos a crear tu cuento paso a paso. ¡Tú decides la historia!
                    </p>
                </motion.div>

                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
                    <div>
                        <label className="block font-semibold text-innova-dark mb-2">
                            ¿Cómo se llama tu cuento?
                        </label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej: El día que aprendí a calmarme"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-innova-blue"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-innova-dark mb-3">
                            ¿De qué emoción hablará tu cuento?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {emocionesDisponibles.map((e) => (
                                <button
                                    key={e.id}
                                    onClick={() => setEmocion(e.id)}
                                    className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-colors ${emocion === e.id
                                        ? `${e.color} border-transparent text-white`
                                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="text-3xl">{e.emoji}</span>
                                    <span className="text-sm font-medium">{e.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        disabled={!titulo || !emocion}
                        onClick={() => setPaso('reto')}
                        className="w-full flex items-center justify-center gap-2 bg-innova-orange hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-colors"
                    >
                        Empezar a escribir <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        )
    }

    // ---------- PANTALLA 1.5: PREGUNTA RETADORA ----------
    if (paso === 'reto') {
        return (
            <div className="max-w-xl mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-8 text-center"
                >
                    <span className="text-5xl mb-4 block">🤔</span>
                    <h2 className="text-sm font-semibold text-innova-blue uppercase tracking-wide mb-3">
                        Antes de empezar, piensa en esto
                    </h2>
                    <p className="text-xl font-bold text-innova-dark leading-relaxed mb-8">
                        {pregunta}
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                        Puedes contarle esta historia a tu cuento, o inventar una nueva 💭
                    </p>
                    <button
                        onClick={() => setPaso('editando')}
                        className="w-full flex items-center justify-center gap-2 bg-innova-orange hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition-colors"
                    >
                        Ya lo pensé, ¡vamos a escribir! <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => setPaso('inicio')}
                        className="text-sm text-gray-400 hover:text-gray-600 mt-4"
                    >
                        ← Volver
                    </button>
                </motion.div>
            </div>
        )
    }

    // ---------- PANTALLA 2: EDITOR DE PÁGINAS ----------
    if (paso === 'editando') {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-innova-blue truncate">
                        {titulo}
                    </h1>
                    <button
                        onClick={() => setPaso('final')}
                        className="flex items-center gap-2 bg-innova-blue hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full shrink-0"
                    >
                        <BookOpen size={16} /> Ver mi libro
                    </button>
                </div>

                {/* TABS DE PÁGINAS */}
                <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
                    {paginas.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setPaginaActual(i)}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border-2 ${i === paginaActual
                                ? 'bg-innova-blue text-white border-innova-blue'
                                : 'border-gray-200 text-gray-500'
                                }`}
                        >
                            Página {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={agregarPagina}
                        className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border-2 border-dashed border-gray-300 text-gray-500 hover:border-innova-blue hover:text-innova-blue"
                    >
                        <Plus size={16} /> Página
                    </button>
                </div>

                {/* CONTENIDO DE LA PÁGINA ACTUAL */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pagina.id}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-2xl shadow-sm p-6 space-y-5"
                    >
                        <div>
                            <label className="block font-semibold text-innova-dark mb-2">
                                Escribe lo que pasa en esta parte de tu cuento
                            </label>
                            <textarea
                                value={pagina.texto}
                                onChange={(e) => actualizarPagina('texto', e.target.value)}
                                rows={4}
                                placeholder="Había una vez..."
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-innova-blue resize-none"
                            />
                        </div>

                        <div>
                            <label className="font-semibold text-innova-dark mb-2 block">
                                Agrega contenido a esta página
                            </label>

                            <div className="flex bg-gray-100 rounded-full p-1 mb-4 w-fit">
                                <button
                                    onClick={() => actualizarPagina('modoVisual', 'dibujo')}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${pagina.modoVisual === 'dibujo' ? 'bg-white shadow text-innova-blue' : 'text-gray-500'
                                        }`}
                                >
                                    <Pencil size={14} /> Dibujar
                                </button>
                                <button
                                    onClick={() => actualizarPagina('modoVisual', 'imagen')}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${pagina.modoVisual === 'imagen' ? 'bg-white shadow text-innova-blue' : 'text-gray-500'
                                        }`}
                                >
                                    <ImageIcon size={14} /> Imagen
                                </button>
                                <button
                                    onClick={() => actualizarPagina('modoVisual', 'voz')}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${pagina.modoVisual === 'voz' ? 'bg-white shadow text-innova-blue' : 'text-gray-500'
                                        }`}
                                >
                                    <Mic size={14} /> Voz
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={pagina.modoVisual}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {pagina.modoVisual === 'dibujo' && (
                                        <DrawingCanvas
                                            key={pagina.id}
                                            value={pagina.dibujo}
                                            onChange={(data) => actualizarPagina('dibujo', data)}
                                        />
                                    )}
                                    {pagina.modoVisual === 'imagen' && (
                                        <ImageUploader
                                            value={pagina.imagen}
                                            onChange={(data) => actualizarPagina('imagen', data)}
                                        />
                                    )}
                                    {pagina.modoVisual === 'voz' && (
                                        <VoiceRecorder
                                            value={pagina.audio}
                                            onChange={(url) => actualizarPagina('audio', url)}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Indicadores de qué ya se agregó, aunque no esté visible ahora mismo */}
                            <div className="flex gap-3 mt-3 text-xs text-gray-400">
                                {pagina.dibujo && pagina.modoVisual !== 'dibujo' && <span>✏️ Dibujo guardado</span>}
                                {pagina.imagen && pagina.modoVisual !== 'imagen' && <span>🖼️ Imagen guardada</span>}
                                {pagina.audio && pagina.modoVisual !== 'voz' && <span>🎤 Audio guardado</span>}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* NAVEGACIÓN */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={() => setPaginaActual((p) => Math.max(0, p - 1))}
                        disabled={paginaActual === 0}
                        className="flex items-center gap-1 text-gray-500 disabled:opacity-30 hover:text-innova-blue"
                    >
                        <ArrowLeft size={18} /> Anterior
                    </button>

                    {paginas.length > 1 && (
                        <button
                            onClick={() => setConfirmandoEliminar(true)}
                            className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500"
                        >
                            <Trash2 size={14} /> Eliminar esta página
                        </button>
                    )}

                    <button
                        onClick={() =>
                            paginaActual === paginas.length - 1
                                ? agregarPagina()
                                : setPaginaActual((p) => p + 1)
                        }
                        className="flex items-center gap-1 text-innova-blue font-medium hover:underline"
                    >
                        {paginaActual === paginas.length - 1 ? 'Nueva página' : 'Siguiente'} <ArrowRight size={18} />
                    </button>
                </div>

                <button
                    onClick={() => setPaso('inicio')}
                    className="text-sm text-gray-400 hover:text-gray-600 mt-8"
                >
                    ← Cambiar título o emoción
                </button>

                <ConfirmDialog
                    abierto={confirmandoEliminar}
                    titulo="¿Eliminar esta página?"
                    mensaje="Perderás el texto, dibujo y audio de esta página del cuento."
                    onConfirmar={() => {
                        eliminarPagina(paginaActual)
                        setConfirmandoEliminar(false)
                    }}
                    onCancelar={() => setConfirmandoEliminar(false)}
                />
            </div>
        )
    }

    // ---------- PANTALLA 3: LIBRO FINAL ----------
    return (
        <>
            {mostrarConfeti && <Confetti />}
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                    <button
                        onClick={() => setPaso('editando')}
                        className="flex items-center gap-1 text-gray-500 hover:text-innova-blue"
                    >
                        <ArrowLeft size={18} /> Seguir editando
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setMostrarLector(true)}
                            className="flex items-center gap-2 bg-innova-blue hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-full shadow-md"
                        >
                            <BookOpen size={18} />
                            Leer como libro
                        </button>
                        <button
                            onClick={publicarEnGaleria}
                            disabled={publicado}
                            className="flex items-center gap-2 bg-innova-green hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full shadow-md disabled:opacity-60"
                        >
                            <Images size={18} />
                            {publicando ? 'Publicando...' : publicado ? '¡Publicado! ✓' : 'Publicar en la Galería'}
                        </button>
                        <button
                            onClick={exportarPDF}
                            disabled={generandoPDF}
                            className="flex items-center gap-2 bg-innova-orange hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-full shadow-md disabled:opacity-60"
                        >
                            <Download size={18} />
                            {generandoPDF ? 'Generando...' : 'Descargar mi cuento (PDF)'}
                        </button>
                    </div>
                </div>

                <div ref={previewRef} className="space-y-6">
                    {paginas.map((p, i) => (
                        <div
                            key={p.id}
                            className="pagina-pdf bg-white rounded-2xl shadow-sm p-8 grid md:grid-cols-2 gap-6 items-center"
                        >
                            <div>
                                {i === 0 && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles size={18} className="text-innova-orange" />
                                        <h2 className="text-2xl font-extrabold text-innova-blue">{titulo}</h2>
                                    </div>
                                )}
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {p.texto || 'Esta página todavía no tiene texto.'}
                                </p>
                                {p.texto && (
                                    <div className="mt-2">
                                        <BotonLeer texto={p.texto} />
                                    </div>
                                )}
                                {p.audio && (
                                    <audio src={p.audio} controls className="mt-3 h-9" />
                                )}
                            </div>
                            <div className="flex justify-center">
                                {(p.modoVisual === 'dibujo' ? p.dibujo : p.imagen) ? (
                                    <img
                                        src={p.modoVisual === 'dibujo' ? p.dibujo : p.imagen}
                                        alt={`Ilustración página ${i + 1}`}
                                        className="max-h-56 rounded-xl border border-gray-200"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 text-sm">
                                        Sin ilustración
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {mostrarLector && (
                <LectorLibro
                    titulo={titulo}
                    paginas={paginas}
                    onCerrar={() => setMostrarLector(false)}
                />
            )}
        </>
    )
}