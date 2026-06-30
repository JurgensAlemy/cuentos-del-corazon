import { useRef, useState, useEffect, useCallback } from 'react'
import { Eraser, Trash2, Undo2 } from 'lucide-react'

const colores = [
    '#1a1a1a', '#ffffff', '#dc2626', '#f7941d', '#facc15',
    '#8dc63f', '#1e5fae', '#06b6d4', '#a855f7', '#ec4899',
    '#78350f', '#6b7280',
]

const plantillas = [
    {
        id: 'carita',
        label: '😊 Carita',
        dibujar: (ctx, w, h) => {
            ctx.strokeStyle = '#cbd5e1'
            ctx.lineWidth = 3
            ctx.lineCap = 'round'
            const cx = w / 2
            const cy = h / 2
            ctx.beginPath()
            ctx.arc(cx, cy, 110, 0, Math.PI * 2)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(cx - 38, cy - 30, 8, 0, Math.PI * 2)
            ctx.arc(cx + 38, cy - 30, 8, 0, Math.PI * 2)
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(cx, cy + 5, 55, 0.15 * Math.PI, 0.85 * Math.PI)
            ctx.stroke()
        },
    },
    {
        id: 'persona',
        label: '🧍 Persona',
        dibujar: (ctx, w, h) => {
            ctx.strokeStyle = '#cbd5e1'
            ctx.lineWidth = 3
            ctx.lineCap = 'round'
            const cx = w / 2
            const cy = h / 2
            ctx.beginPath()
            ctx.arc(cx, cy - 120, 35, 0, Math.PI * 2)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(cx - 25, cy - 85)
            ctx.lineTo(cx - 45, cy + 40)
            ctx.lineTo(cx + 45, cy + 40)
            ctx.lineTo(cx + 25, cy - 85)
            ctx.closePath()
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(cx - 25, cy - 60)
            ctx.lineTo(cx - 65, cy)
            ctx.moveTo(cx + 25, cy - 60)
            ctx.lineTo(cx + 65, cy)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(cx - 20, cy + 40)
            ctx.lineTo(cx - 30, cy + 120)
            ctx.moveTo(cx + 20, cy + 40)
            ctx.lineTo(cx + 30, cy + 120)
            ctx.stroke()
        },
    },
    {
        id: 'casa',
        label: '🏠 Casa',
        dibujar: (ctx, w, h) => {
            ctx.strokeStyle = '#cbd5e1'
            ctx.lineWidth = 3
            ctx.lineJoin = 'round'
            const cx = w / 2
            const cy = h / 2
            ctx.strokeRect(cx - 95, cy - 5, 190, 120)
            ctx.beginPath()
            ctx.moveTo(cx - 115, cy - 5)
            ctx.lineTo(cx, cy - 95)
            ctx.lineTo(cx + 115, cy - 5)
            ctx.closePath()
            ctx.stroke()
            ctx.strokeRect(cx - 22, cy + 50, 44, 65)
            ctx.strokeRect(cx + 35, cy + 15, 35, 35)
            ctx.beginPath()
            ctx.moveTo(cx + 52.5, cy + 15)
            ctx.lineTo(cx + 52.5, cy + 50)
            ctx.moveTo(cx + 35, cy + 32.5)
            ctx.lineTo(cx + 70, cy + 32.5)
            ctx.stroke()
        },
    },
    {
        id: 'sol',
        label: '☀️ Sol y nube',
        dibujar: (ctx, w, h) => {
            ctx.strokeStyle = '#cbd5e1'
            ctx.lineWidth = 3
            ctx.lineCap = 'round'
            const solX = w / 2 - 90
            const solY = h / 2 - 70
            ctx.beginPath()
            ctx.arc(solX, solY, 38, 0, Math.PI * 2)
            ctx.stroke()
            for (let i = 0; i < 8; i++) {
                const ang = (i * Math.PI) / 4
                ctx.beginPath()
                ctx.moveTo(solX + Math.cos(ang) * 50, solY + Math.sin(ang) * 50)
                ctx.lineTo(solX + Math.cos(ang) * 68, solY + Math.sin(ang) * 68)
                ctx.stroke()
            }
            const nubeX = w / 2 + 70
            const nubeY = h / 2 + 40
            ctx.beginPath()
            ctx.arc(nubeX - 35, nubeY, 26, 0, Math.PI * 2)
            ctx.arc(nubeX, nubeY - 12, 32, 0, Math.PI * 2)
            ctx.arc(nubeX + 35, nubeY, 26, 0, Math.PI * 2)
            ctx.fillStyle = '#ffffff'
            ctx.fill()
            ctx.stroke()
        },
    },
]

const stickers = [
    { id: 'logre', emoji: '💪', label: '¡Lo logré!' },
    { id: 'feliz', emoji: '🌟', label: 'Feliz' },
    { id: 'corazon', emoji: '💛', label: 'Cariño' },
    { id: 'zzz', emoji: '😴', label: 'Calma' },
    { id: 'bocadillo', emoji: '💬', label: 'Burbuja' },
    { id: 'estrella', emoji: '✨', label: 'Magia' },
]

const formas = [
    {
        id: 'circulo',
        label: '⚪ Círculo',
        dibujar: (ctx, x, y, color) => {
            ctx.strokeStyle = color
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.arc(x, y, 35, 0, Math.PI * 2)
            ctx.stroke()
        },
    },
    {
        id: 'cuadrado',
        label: '⬛ Cuadrado',
        dibujar: (ctx, x, y, color) => {
            ctx.strokeStyle = color
            ctx.lineWidth = 4
            ctx.strokeRect(x - 30, y - 30, 60, 60)
        },
    },
    {
        id: 'corazonForma',
        label: '❤️ Corazón',
        dibujar: (ctx, x, y, color) => {
            ctx.fillStyle = color
            ctx.beginPath()
            const s = 1.3
            ctx.moveTo(x, y + 22 * s)
            ctx.bezierCurveTo(x - 40 * s, y - 15 * s, x - 18 * s, y - 38 * s, x, y - 14 * s)
            ctx.bezierCurveTo(x + 18 * s, y - 38 * s, x + 40 * s, y - 15 * s, x, y + 22 * s)
            ctx.closePath()
            ctx.fill()
        },
    },
    {
        id: 'estrellaForma',
        label: '⭐ Estrella',
        dibujar: (ctx, x, y, color) => {
            ctx.fillStyle = color
            ctx.beginPath()
            for (let i = 0; i < 5; i++) {
                const angExt = (Math.PI * 2 * i) / 5 - Math.PI / 2
                const angInt = angExt + Math.PI / 5
                const px1 = x + Math.cos(angExt) * 32
                const py1 = y + Math.sin(angExt) * 32
                const px2 = x + Math.cos(angInt) * 14
                const py2 = y + Math.sin(angInt) * 14
                if (i === 0) ctx.moveTo(px1, py1)
                else ctx.lineTo(px1, py1)
                ctx.lineTo(px2, py2)
            }
            ctx.closePath()
            ctx.fill()
        },
    },
]

export default function DrawingCanvas({ value, onChange }) {
    const canvasRef = useRef(null)
    const [drawing, setDrawing] = useState(false)
    const [color, setColor] = useState('#1a1a1a')
    const [grosor, setGrosor] = useState(4)
    const [stickerActivo, setStickerActivo] = useState(null)
    const [formaActiva, setFormaActiva] = useState(null)
    const [historial, setHistorial] = useState([])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (value) {
            const img = new Image()
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                setHistorial([value])
            }
            img.src = value
        }
    }, [])

    const guardarEstado = useCallback(() => {
        const data = canvasRef.current.toDataURL('image/png')
        setHistorial((prev) => [...prev.slice(-9), data]) // guarda hasta 10 pasos
        onChange?.(data)
    }, [onChange])

    const deshacer = () => {
        if (historial.length <= 1) {
            limpiar()
            return
        }
        const nuevoHistorial = historial.slice(0, -1)
        const anterior = nuevoHistorial[nuevoHistorial.length - 1]
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.onload = () => {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            setHistorial(nuevoHistorial)
            onChange?.(anterior)
        }
        img.src = anterior
    }

    const getPos = (e) => {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        return {
            x: ((clientX - rect.left) / rect.width) * canvas.width,
            y: ((clientY - rect.top) / rect.height) * canvas.height,
        }
    }

    const startDraw = (e) => {
        e.preventDefault()
        const ctx = canvasRef.current.getContext('2d')
        const { x, y } = getPos(e)

        if (stickerActivo) {
            ctx.font = '48px sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(stickerActivo.emoji, x, y)
            guardarEstado()
            setStickerActivo(null)
            return
        }

        if (formaActiva) {
            formaActiva.dibujar(ctx, x, y, color)
            guardarEstado()
            setFormaActiva(null)
            return
        }

        setDrawing(true)
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const draw = (e) => {
        if (!drawing) return
        e.preventDefault()
        const ctx = canvasRef.current.getContext('2d')
        const { x, y } = getPos(e)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = color
        ctx.lineWidth = grosor
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    const endDraw = () => {
        if (!drawing) return
        setDrawing(false)
        guardarEstado()
    }

    const limpiar = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        setHistorial([])
        onChange?.(canvas.toDataURL('image/png'))
    }

    const cargarPlantilla = (plantilla) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        plantilla.dibujar(ctx, canvas.width, canvas.height)
        guardarEstado()
    }

    return (
        <div>
            {/* PLANTILLAS */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs text-gray-400 mr-1">Empezar con:</span>
                {plantillas.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => cargarPlantilla(p)}
                        className="text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-innova-blue-light hover:text-innova-blue text-gray-600 transition-colors"
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* FORMAS */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs text-gray-400 mr-1">Formas:</span>
                {formas.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => {
                            setFormaActiva(formaActiva?.id === f.id ? null : f)
                            setStickerActivo(null)
                        }}
                        className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-colors ${formaActiva?.id === f.id
                                ? 'bg-innova-blue text-white'
                                : 'bg-gray-100 hover:bg-innova-blue-light text-gray-600'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* STICKERS */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs text-gray-400 mr-1">Pegatinas:</span>
                {stickers.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => {
                            setStickerActivo(stickerActivo?.id === s.id ? null : s)
                            setFormaActiva(null)
                        }}
                        className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-colors ${stickerActivo?.id === s.id
                                ? 'bg-innova-orange text-white'
                                : 'bg-gray-100 hover:bg-innova-orange/10 text-gray-600'
                            }`}
                    >
                        <span className="text-base">{s.emoji}</span> {s.label}
                    </button>
                ))}
                {(stickerActivo || formaActiva) && (
                    <span className="text-xs text-innova-orange font-medium animate-pulse">
                        👆 Toca el dibujo para pegarla
                    </span>
                )}
            </div>

            {/* COLORES Y CONTROLES */}
            <div className="flex flex-wrap items-center gap-3 mb-3 bg-gray-50 p-3 rounded-xl">
                {colores.map((c) => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-7 h-7 rounded-full border-2 ${color === c ? 'border-innova-blue scale-110' : 'border-white'}`}
                        style={{ backgroundColor: c, boxShadow: c === '#ffffff' ? 'inset 0 0 0 1px #e5e7eb' : 'none' }}
                    />
                ))}
                <div className="flex items-center gap-2 ml-1">
                    <Eraser size={18} className="text-gray-500" />
                    <input
                        type="range"
                        min="2"
                        max="20"
                        value={grosor}
                        onChange={(e) => setGrosor(Number(e.target.value))}
                        className="w-20"
                    />
                </div>
                <div className="flex items-center gap-3 ml-auto">
                    <button
                        onClick={deshacer}
                        disabled={historial.length === 0}
                        className="flex items-center gap-1 text-sm text-innova-blue hover:text-blue-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                        <Undo2 size={16} /> Deshacer
                    </button>
                    <button
                        onClick={limpiar}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                    >
                        <Trash2 size={16} /> Borrar todo
                    </button>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={420}
                height={594}
                className="w-full max-w-xs mx-auto bg-white rounded-xl border-2 border-gray-200 cursor-crosshair touch-none aspect-[210/297]"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
            />
        </div>
    )
}