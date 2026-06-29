import { Link, Outlet, useLocation } from 'react-router-dom'
import { Heart, Home, BookOpen, Sparkles, PencilLine, Images, GraduationCap } from 'lucide-react'

const navItems = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/proyecto', label: 'El Proyecto', icon: BookOpen },
    { to: '/explorador', label: 'Explorador', icon: Sparkles },
    { to: '/crear', label: 'Crear mi cuento', icon: PencilLine },
    { to: '/galeria', label: 'Galería', icon: Images },
    { to: '/sustento', label: 'Para el Jurado', icon: GraduationCap },
]

export default function Layout() {
    const location = useLocation()

    return (
        <div className="min-h-screen flex flex-col bg-innova-blue-light">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo_cuentos.png" alt="Cuentos del Corazón" className="h-9 w-9 object-contain" />
                        <span className="font-bold text-lg text-innova-blue">Cuentos del Corazón</span>
                    </Link>

                    <nav className="hidden md:flex gap-1">
                        {navItems.map(({ to, label, icon: Icon }) => {
                            const active = location.pathname === to
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors ${active ? 'bg-innova-blue text-white' : 'text-gray-600 hover:bg-innova-blue-light'
                                        }`}
                                >
                                    <Icon size={16} />
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Nav mobile simple, abajo del header */}
                <nav className="md:hidden flex overflow-x-auto gap-1 px-3 pb-2">
                    {navItems.map(({ to, label, icon: Icon }) => {
                        const active = location.pathname === to
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${active ? 'bg-innova-blue text-white' : 'bg-innova-blue-light text-gray-600'
                                    }`}
                            >
                                <Icon size={14} />
                                {label}
                            </Link>
                        )
                    })}
                </nav>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
                Hecho con <Heart size={14} className="inline text-innova-orange" fill="currentColor" /> para Innova Schools — Unidocencia
            </footer>
        </div>
    )
}