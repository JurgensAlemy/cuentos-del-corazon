import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Trash2, X, Images as ImagesIcon, Sparkles } from 'lucide-react'
import BotonLeer from '../components/BotonLeer'

import { obtenerCuentos, eliminarCuento, agregarReaccion, agregarComentario } from '../utils/cuentosStorage'
import ComentariosFamilia from '../components/ComentariosFamilia'
import Reacciones from '../components/Reacciones'
import { sonidoClickSuave, sonidoExito } from '../utils/sounds'

import ConfirmDialog from '../components/ConfirmDialog'
import LectorLibro from '../components/LectorLibro'

const emocionInfo = {
    alegria: { emoji: '😊', label: 'Alegría', color: 'border-innova-orange', bg: 'bg-innova-orange/10 text-innova-orange' },
    tristeza: { emoji: '😢', label: 'Tristeza', color: 'border-innova-blue', bg: 'bg-innova-blue-light text-innova-blue' },
    enojo: { emoji: '😡', label: 'Enojo', color: 'border-red-400', bg: 'bg-red-50 text-red-500' },
    miedo: { emoji: '😨', label: 'Miedo', color: 'border-innova-green', bg: 'bg-innova-green/10 text-innova-green' },
}

export default function Galeria() {
    const [cuentos, setCuentos] = useState([])
    const [abierto, setAbierto] = useState(null)
    const [confirmando, setConfirmando] = useState(false)
    const [filtro, setFiltro] = useState('todas')
    const [leyendo, setLeyendo] = useState(null)

    useEffect(() => {
        setCuentos(obtenerCuentos())
    }, [])

    const borrar = (id) => {
        eliminarCuento(id)
        setCuentos(obtenerCuentos())
        setAbierto(null)
        setConfirmando(false)
    }

    const reaccionar = (cuentoId, tipo) => {
        const actualizado = agregarReaccion(cuentoId, tipo)
        setCuentos(obtenerCuentos())
        if (abierto?.id === cuentoId) setAbierto(actualizado)
        sonidoClickSuave()
    }

    const comentar = (cuentoId, autor, texto) => {
        const actualizado = agregarComentario(cuentoId, autor, texto)
        setCuentos(obtenerCuentos())
        if (abierto?.id === cuentoId) setAbierto(actualizado)
        sonidoExito()
    }

    const cuentosFiltrados = useMemo(() => {
        if (filtro === 'todas') return cuentos
        return cuentos.filter((c) => c.emocion === filtro)
    }, [cuentos, filtro])

    const conteoPorEmocion = useMemo(() => {
        const conteo = {}
        cuentos.forEach((c) => {
            conteo[c.emocion] = (conteo[c.emocion] || 0) + 1
        })
        return conteo
    }, [cuentos])

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-innova-blue mb-3">
                    Galería de Cuentos
                </h1>
                <p className="text-gray-600 mb-3">
                    Los cuentos digitales creados por los estudiantes ✨
                </p>
                <div className="inline-flex items-center gap-2 bg-innova-blue-light text-innova-blue text-sm font-semibold px-4 py-1.5 rounded-full">
                    <Sparkles size={14} />
                    {cuentos.length} cuento{cuentos.length !== 1 && 's'} publicado{cuentos.length !== 1 && 's'}
                </div>
            </motion.div>

            {/* FILTROS POR EMOCIÓN */}
            {cuentos.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    <button
                        onClick={() => setFiltro('todas')}
                        className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${filtro === 'todas'
                            ? 'bg-innova-blue text-white border-innova-blue'
                            : 'border-gray-200 text-gray-500 hover:border-innova-blue'
                            }`}
                    >
                        Todas ({cuentos.length})
                    </button>
                    {Object.entries(emocionInfo).map(([id, info]) => {
                        const cantidad = conteoPorEmocion[id] || 0
                        if (cantidad === 0) return null
                        return (
                            <button
                                key={id}
                                onClick={() => setFiltro(id)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${filtro === id
                                    ? `${info.color} ${info.bg} border-2`
                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                    }`}
                            >
                                {info.emoji} {info.label} ({cantidad})
                            </button>
                        )
                    })}
                </div>
            )}

            {cuentos.length === 0 ? (
                <div className="text-center text-gray-400 py-16">
                    <ImagesIcon size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Todavía no hay cuentos publicados en este dispositivo.</p>
                </div>
            ) : cuentosFiltrados.length === 0 ? (
                <div className="text-center text-gray-400 py-16">
                    <p>No hay cuentos con esta emoción todavía.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cuentosFiltrados.map((c, i) => {
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
                                    {c.reacciones && Object.values(c.reacciones).some((v) => v > 0) && (
                                        <p className="text-xs text-innova-blue mt-1">
                                            {Object.values(c.reacciones).reduce((a, b) => a + b, 0)} reacciones
                                        </p>
                                    )}
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

                            <div className="flex items-center justify-between gap-2 mb-5">
                                <div className="flex items-center gap-2 min-w-0">
                                    <BookOpen className="text-innova-blue shrink-0" size={22} />
                                    <h2 className="text-xl font-bold text-innova-blue truncate">{abierto.titulo}</h2>
                                </div>
                                <button
                                    onClick={() => setLeyendo(abierto)}
                                    className="shrink-0 bg-innova-blue hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full"
                                >
                                    Leer como libro
                                </button>
                            </div>

                            <div className="space-y-6">
                                {abierto.paginas.map((p, i) => (
                                    <div key={p.id || i} className="grid md:grid-cols-2 gap-4 items-center border-b pb-5 last:border-0">
                                        <div>
                                            <p className="text-gray-700 whitespace-pre-line">
                                                {p.texto || 'Sin texto en esta página.'}
                                            </p>
                                            {p.texto && (
                                                <div className="mt-2">
                                                    <BotonLeer texto={p.texto} />
                                                </div>
                                            )}
                                        </div>
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

                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm font-semibold text-innova-dark mb-3">
                                    ¿Qué te pareció este cuento?
                                </p>
                                <Reacciones
                                    reacciones={abierto.reacciones}
                                    onReaccionar={(tipo) => reaccionar(abierto.id, tipo)}
                                />
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <ComentariosFamilia
                                    comentarios={abierto.comentarios}
                                    onComentar={(autor, texto) => comentar(abierto.id, autor, texto)}
                                />
                            </div>

                            <button
                                onClick={() => setConfirmando(true)}
                                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 mt-6"
                            >
                                <Trash2 size={14} /> Eliminar este cuento
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ConfirmDialog
                abierto={confirmando}
                titulo="¿Eliminar este cuento?"
                mensaje="Esta acción no se puede deshacer. El cuento se eliminará para siempre de este dispositivo."
                onConfirmar={() => borrar(abierto.id)}
                onCancelar={() => setConfirmando(false)}
            />

            {leyendo && (
                <LectorLibro
                    titulo={leyendo.titulo}
                    paginas={leyendo.paginas}
                    onCerrar={() => setLeyendo(null)}
                />
            )}
        </div>
    )
}