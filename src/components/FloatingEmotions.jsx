import { motion } from 'framer-motion'

const emojis = ['😊', '😢', '😡', '😨', '😍', '😴', '🤔', '😂']

export default function FloatingEmotions() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {emojis.map((emoji, i) => (
                <motion.span
                    key={i}
                    className="absolute text-4xl select-none"
                    style={{
                        left: `${(i * 13 + 5) % 95}%`,
                        top: `${(i * 23 + 10) % 85}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                    }}
                >
                    {emoji}
                </motion.span>
            ))}
        </div>
    )
}