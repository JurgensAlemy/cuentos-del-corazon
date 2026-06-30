import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Home, Sparkles, PencilLine, Images, Info } from 'lucide-react'

const navItems = [
    { to: '/', label: 'Inicio', icon: Home, color: 'bg-innova-blue' },
    { to: '/explorador', label: 'Explorador', icon: Sparkles, color: 'bg-innova-green' },
    { to: '/crear', label: 'Crear mi cuento', icon: PencilLine, color: 'bg-innova-orange' },
    { to: '/galeria', label: 'Galería', icon: Images, color: 'bg-purple-500' },
]

export default function Layout() {
    const location = useLocation()

    return (
        <div className="min-h-screen flex flex-col bg-innova-blue-light">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <motion.img
                            src="/logo_cuentos.png"
                            alt="Cuentos del Corazón"
                            className="h-9 w-9 object-contain"
                            whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                            transition={{ duration: 0.5 }}
                        />
                        <span className="font-extrabold text-base sm:text-lg text-innova-blue tracking-tight truncate">
                            Cuentos del Corazón
                        </span>
                    </Link>

                    <nav className="hidden lg:flex gap-2">
                        {navItems.map(({ to, label, icon: Icon, color }) => {
                            const active = location.pathname === to
                            return (
                                <Link key={to} to={to} className="relative">
                                    <motion.div
                                        whileHover={{ y: -3, rotate: active ? 0 : -1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm ${active
                                            ? `${color} text-white`
                                            : 'bg-gray-50 text-gray-500 hover:text-innova-dark'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        {label}
                                    </motion.div>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Nav mobile */}
                <nav className="lg:hidden flex overflow-x-auto gap-2 px-3 pb-3">
                    {navItems.map(({ to, label, icon: Icon, color }) => {
                        const active = location.pathname === to
                        return (
                            <Link key={to} to={to} className="shrink-0">
                                <motion.div
                                    whileTap={{ scale: 0.92 }}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap ${active ? `${color} text-white` : 'bg-gray-50 text-gray-500'
                                        }`}
                                >
                                    <Icon size={14} />
                                    {label}
                                </motion.div>
                            </Link>
                        )
                    })}
                </nav>
            </header>

            <main className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="bg-white border-t py-4 px-4 flex items-center justify-center gap-4 text-sm text-gray-500 relative">
                <span>
                    Hecho con <Heart size={14} className="inline text-innova-orange" fill="currentColor" /> para Innova Schools — Unidocencia
                </span>
                <Link
                    to="/acerca"
                    className="absolute right-4 flex items-center gap-1 text-xs text-gray-400 hover:text-innova-blue"
                >
                    <Info size={14} /> Acerca de
                </Link>
            </footer>
        </div>
    )
}