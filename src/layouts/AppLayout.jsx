import { useState, useContext } from 'react';
import { MenuLateral } from '../components/menu/MenuLateral';
import { Header } from '../components/menu/Header';
import { AuthContext } from '../context/AuthContext';

export const AppLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const { user } = useContext(AuthContext);

    const rol = user?.rol || 'usuario';
    const userName = user?.nombre || (rol === 'admin' ? 'Administrador' : 'Estudiante');

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar fijo */}
            <MenuLateral isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* Contenido principal scrollable */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header userName={userName} toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};