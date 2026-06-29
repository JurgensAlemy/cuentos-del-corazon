import { motion } from 'framer-motion'

const colores = ['#f7941d', '#8dc63f', '#1e5fae', '#dc2626', '#a855f7']

export default function Confetti() {
    const piezas = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colores[i % colores.length],
        size: 6 + Math.random() * 6,
        delay: Math.random() * 0.3,
        duration: 1.2 + Math.random() * 0.8,
        rotacion: Math.random() * 360,
    }))

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {piezas.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-sm"
                    style={{
                        left: `${p.x}%`,
                        top: '-20px',
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                    }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{
                        y: window.innerHeight + 20,
                        opacity: [1, 1, 0],
                        rotate: p.rotacion,
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        ease: 'easeIn',
                    }}
                />
            ))}
        </div>
    )
}