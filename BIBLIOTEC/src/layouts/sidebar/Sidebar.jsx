import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-48 min-h-screen bg-gray-800 p-4">
      <NavLink to="/home" className="block bg-gray-500 rounded-full p-2 mt-2 mb-5 font-bold text-white 
      hover:bg-gray-600 hover:text-white active:bg-gray-700 text-center">Home</NavLink>
      <NavLink to="/gestion" className="block bg-gray-500 rounded-full p-2 mb-5 font-bold text-white
      hover:bg-gray-600 hover:text-white active:bg-gray-700 text-center">Gestión</NavLink>
      <NavLink to="/prestamos" className="block bg-gray-500 rounded-full p-2 mb-5 font-bold text-white
      hover:bg-gray-600 hover:text-white active:bg-gray-700 text-center">Préstamos</NavLink>
    </aside>
  )
}
