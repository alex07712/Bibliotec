import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-40 min-h-screen bg-gray-800 p-4">
      <NavLink to="/home" className="bg-violet-500 rounded-full p-1 font-semibold text-white">Home</NavLink>
      <NavLink to="/gestion" className="bg-violet-500 block p-3 text-white">Gestión</NavLink>
      <NavLink to="/prestamos" className="bg-amber-600 rounded-full p-1 font-semibold text-white">Préstamos</NavLink>
    </aside>
  )
}
