import { useRef, useState, useEffect } from 'react'
import { Eraser, Trash2 } from 'lucide-react'

const colores = ['#1a1a1a', '#dc2626', '#f7941d', '#8dc63f', '#1e5fae', '#a855f7']

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
            // Cara
            ctx.beginPath()
            ctx.arc(cx, cy, 110, 0, Math.PI * 2)
            ctx.stroke()
            // Ojos (más separados y arriba)
            ctx.beginPath()
            ctx.arc(cx - 38, cy - 30, 8, 0, Math.PI * 2)
            ctx.arc(cx + 38, cy - 30, 8, 0, Math.PI * 2)
            ctx.stroke()
            // Boca (sonrisa más ancha y curva suave)
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
            // Cabeza (más pequeña y proporcionada)
            ctx.beginPath()
            ctx.arc(cx, cy - 120, 35, 0, Math.PI * 2)
            ctx.stroke()
            // Cuerpo (forma trapezoide simple, más natural que una línea)
            ctx.beginPath()
            ctx.moveTo(cx - 25, cy - 85)
            ctx.lineTo(cx - 45, cy + 40)
            ctx.lineTo(cx + 45, cy + 40)
            ctx.lineTo(cx + 25, cy - 85)
            ctx.closePath()
            ctx.stroke()
            // Brazos
            ctx.beginPath()
            ctx.moveTo(cx - 25, cy - 60)
            ctx.lineTo(cx - 65, cy)
            ctx.moveTo(cx + 25, cy - 60)
            ctx.lineTo(cx + 65, cy)
            ctx.stroke()
            // Piernas
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
            // Base
            ctx.strokeRect(cx - 95, cy - 5, 190, 120)
            // Techo
            ctx.beginPath()
            ctx.moveTo(cx - 115, cy - 5)
            ctx.lineTo(cx, cy - 95)
            ctx.lineTo(cx + 115, cy - 5)
            ctx.closePath()
            ctx.stroke()
            // Puerta
            ctx.strokeRect(cx - 22, cy + 50, 44, 65)
            // Ventana
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
            // Sol
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
            // Nube (3 círculos superpuestos, sin la línea recta que la cruzaba)
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

export default function DrawingCanvas({ value, onChange }) {
    const canvasRef = useRef(null)
    const [drawing, setDrawing] = useState(false)
    const [color, setColor] = useState('#1a1a1a')
    const [grosor, setGrosor] = useState(4)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (value) {
            const img = new Image()
            img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            img.src = value
        }
    }, [])

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
        setDrawing(true)
        const ctx = canvasRef.current.getContext('2d')
        const { x, y } = getPos(e)
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
        onChange?.(canvasRef.current.toDataURL('image/png'))
    }

    const limpiar = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        onChange?.(canvas.toDataURL('image/png'))
    }

    const cargarPlantilla = (plantilla) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        plantilla.dibujar(ctx, canvas.width, canvas.height)
        onChange?.(canvas.toDataURL('image/png'))
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

            <div className="flex flex-wrap items-center gap-3 mb-3 bg-gray-50 p-3 rounded-xl">
                {colores.map((c) => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-innova-blue scale-110' : 'border-white'}`}
                        style={{ backgroundColor: c }}
                    />
                ))}
                <div className="flex items-center gap-2 ml-2">
                    <Eraser size={18} className="text-gray-500" />
                    <input
                        type="range"
                        min="2"
                        max="20"
                        value={grosor}
                        onChange={(e) => setGrosor(Number(e.target.value))}
                        className="w-24"
                    />
                </div>
                <button
                    onClick={limpiar}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 ml-auto"
                >
                    <Trash2 size={16} /> Borrar todo
                </button>
            </div>

            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full bg-white rounded-xl border-2 border-gray-200 cursor-crosshair touch-none"
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