import { useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'

export default function ImageUploader({ value, onChange }) {
    const inputRef = useRef(null)

    const handleFile = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => onChange?.(reader.result)
        reader.readAsDataURL(file)
    }

    if (value) {
        return (
            <div className="relative inline-block">
                <img src={value} alt="Imagen del cuento" className="max-h-56 rounded-xl border-2 border-gray-200" />
                <button
                    onClick={() => onChange?.(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
                >
                    <X size={14} />
                </button>
            </div>
        )
    }

    return (
        <div>
            <button
                onClick={() => inputRef.current.click()}
                className="flex items-center gap-2 bg-white border-2 border-dashed border-gray-300 hover:border-innova-blue text-gray-500 hover:text-innova-blue px-5 py-4 rounded-xl w-full justify-center"
            >
                <ImagePlus size={20} /> Agregar una imagen o foto
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
            />
        </div>
    )
}