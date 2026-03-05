import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-48 min-h-screen bg-gray-800 p-4">
      <NavLink to="/home" className="block p-3 text-white">Home</NavLink>
      <NavLink to="/gestion" className="block p-3 text-white">Gestión</NavLink>
      <NavLink to="/prestamos" className="block p-3 text-white">Préstamos</NavLink>
    </aside>
  )
}
