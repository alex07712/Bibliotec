import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
<<<<<<< HEAD
import { Button } from '../components'
=======
import { Button } from '../components/forms/Button'
>>>>>>> decaf1f6acf6f3e4a9fd5260d987f3c9319ea146

export function Layout() {
  const [Visible, setVisible] = useState(true)

  return (
    <div className="flex">
      {Visible && <Sidebar />}
      <main className="flex-1">
<<<<<<< HEAD
        <header className="bg-white shadow px-4 py-3 flex items-center">
          <Button onClick={() => setVisible(!Visible)} className="text-2xl text-gray-700 hover:text-blue-300">
            ☰
          </Button>
        </header>
=======
        <Button onClick={() => setVisible(!Visible)}>☰</Button>
>>>>>>> decaf1f6acf6f3e4a9fd5260d987f3c9319ea146
        <Outlet />
      </main>
    </div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> decaf1f6acf6f3e4a9fd5260d987f3c9319ea146
