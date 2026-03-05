import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Gestion } from '../pages'


export function Rutas() {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/gestion' element={<Gestion/>}/>
    </Routes>
  )
}

export default Rutas;