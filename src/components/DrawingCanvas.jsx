import { useRef, useState, useEffect } from 'react'
import { Eraser, Trash2 } from 'lucide-react'

const colores = ['#1a1a1a', '#dc2626', '#f7941d', '#8dc63f', '#1e5fae', '#a855f7']

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

    return (
        <div>
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