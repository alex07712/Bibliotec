import { NavLink } from "react-router-dom";
import { Home, Settings, BookOpen, X, Users, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function MenuLateral({ isOpen, toggleSidebar }) {
    const { user } = useContext(AuthContext);
    const rol = user?.rol || "usuario";

    const menuItems = [
        { name: "Inicio", path: "/home", icon: <Home size={20} />, roles: ['admin', 'usuario'] },
        { name: "Libros", path: "/gestion", icon: <Settings size={20} />, roles: ['admin'] },
        { name: "Catálogo", path: "/catalogo", icon: <BookOpen size={20} />, roles: ["admin", 'usuario'] },
        { name: "Prestamos", path: "/prestamos", icon: <BookOpen size={20} />, roles: ['admin', 'usuario'] },
        { name: "Usuarios", path: "/usuarios", icon: <Users size={20} />, roles: ['admin'] }
    ];

    return (
        <>
            {/* Overlay para cerrar al hacer clic fuera - solo visible en móvil */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
            
            <aside className={`
                fixed inset-y-0 left-0 z-50
                bg-slate-800 text-slate-100
                w-64 transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:relative lg:h-screen
                border-r border-slate-700 shadow-xl
                flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Botón de cerrar - solo visible en móvil */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 p-2 rounded-lg text-slate-300 hover:bg-slate-700 lg:hidden"
                >
                    <X size={24} />
                </button>

                {/* Perfil del usuario */}
                <div className="flex flex-col items-center p-6 border-b border-slate-700">
                    {user?.imagen ? (
                        <img
                            src={user.imagen}
                            className="w-20 h-20 rounded-full object-cover border-2 border-amber-500 shadow-md"
                            alt="Avatar"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center border-2 border-amber-500">
                            <User size={40} className="text-slate-300" />
                        </div>
                    )}
                    <h3 className="mt-3 text-lg font-semibold text-white">{user?.nombre || "Usuario"}</h3>
                    <p className="text-sm text-amber-400 capitalize">{rol}</p>
                </div>

                {/* Menú de navegación */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems
                        .filter(item => item.roles.includes(rol))
                        .map((menuitem) => (
                            <NavLink
                                key={menuitem.name}
                                to={menuitem.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) toggleSidebar();
                                }}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                        ? 'bg-amber-600 text-white shadow-md'
                                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`
                                }
                            >
                                {menuitem.icon}
                                <span>{menuitem.name}</span>
                            </NavLink>
                        ))}
                </nav>
            </aside>
        </>
    );
}