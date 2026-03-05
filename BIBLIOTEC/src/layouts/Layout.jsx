import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Button } from '../components'

export function Layout() {
  const [Visible, setVisible] = useState(true)

  return (
    <div className="flex">
      {Visible && <Sidebar />}
      <main className="flex-1">
        <Button onClick={() => setVisible(!Visible) } className="text-2xl text-gray-700 hover:text-red-500">{""}☰ hola</Button>
        <Outlet />
      </main>
    </div>
  )
}
