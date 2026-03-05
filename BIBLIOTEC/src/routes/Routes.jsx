import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Gestion, Prestamos } from '../pages'


export function Rutas() {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/gestion' element={<Gestion/>}/>
      <Route path='/prestamos' element={<Prestamos/>}/>
    </Routes>
  )
}

export default Rutas;