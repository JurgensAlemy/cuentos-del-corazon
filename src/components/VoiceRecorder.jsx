import { useState, useRef } from 'react'
import { Mic, Square, Play, Trash2 } from 'lucide-react'

export default function VoiceRecorder({ value, onChange }) {
    const [grabando, setGrabando] = useState(false)
    const [audioUrl, setAudioUrl] = useState(value || null)
    const mediaRecorderRef = useRef(null)
    const chunksRef = useRef([])

    const iniciarGrabacion = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const recorder = new MediaRecorder(stream)
            mediaRecorderRef.current = recorder
            chunksRef.current = []

            recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(blob)
                setAudioUrl(url)
                onChange?.(url)
                stream.getTracks().forEach((t) => t.stop())
            }

            recorder.start()
            setGrabando(true)
        } catch (err) {
            alert('No se pudo acceder al micrófono. Revisa los permisos del navegador.')
        }
    }

    const detenerGrabacion = () => {
        mediaRecorderRef.current?.stop()
        setGrabando(false)
    }

    const borrar = () => {
        setAudioUrl(null)
        onChange?.(null)
    }

    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
                {!grabando ? (
                    <button
                        onClick={iniciarGrabacion}
                        className="flex items-center gap-2 bg-innova-orange hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium"
                    >
                        <Mic size={18} /> Grabar mi voz
                    </button>
                ) : (
                    <button
                        onClick={detenerGrabacion}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium animate-pulse"
                    >
                        <Square size={18} /> Detener
                    </button>
                )}

                {audioUrl && (
                    <>
                        <audio src={audioUrl} controls className="h-10" />
                        <button onClick={borrar} className="text-red-500 hover:text-red-600">
                            <Trash2 size={18} />
                        </button>
                    </>
                )}
            </div>
            {!audioUrl && !grabando && (
                <p className="text-xs text-gray-400 mt-2">
                    Opcional: grábate contando cómo te sentiste 🎤
                </p>
            )}
        </div>
    )
}