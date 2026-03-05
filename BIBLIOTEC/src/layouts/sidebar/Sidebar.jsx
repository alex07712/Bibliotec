import { NavLink } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-48 min-h-screen bg-gray-800 p-4">
<<<<<<< HEAD
      <NavLink to="/home" className="block bg-gray-500 rounded-full p-2 mt-2 mb-5 font-bold text-white 
      hover:bg-gray-600 hover:text-white active:bg-gray-700 text-center">Home</NavLink>
      <NavLink to="/gestion" className="block bg-gray-500 rounded-full p-2 mb-5 font-bold text-white
      hover:bg-gray-600 hover:text-white active:bg-gray-700 text-center">Gestión</NavLink>
      <NavLink to="/prestamos" className="block bg-gray-500 rounded-full p-2 mb-5 font-bold text-white
      hover:bg-gray-600 hover:text-white active:bg-gray-700 text-center">Préstamos</NavLink>
=======
      <NavLink to="/home" className="block p-3 text-white">Home</NavLink>
      <NavLink to="/gestion" className="block p-3 text-white">Gestión</NavLink>
      <NavLink to="/prestamos" className="block p-3 text-white">Préstamos</NavLink>
>>>>>>> decaf1f6acf6f3e4a9fd5260d987f3c9319ea146
    </aside>
  )
}
