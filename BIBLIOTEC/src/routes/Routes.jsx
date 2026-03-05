import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Gestion, Prestamos } from '../pages'
import { Layout } from '../layouts'


export function Rutas() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route path='/home' element={<Home/>}/>
        <Route path='/gestion' element={<Gestion/>}/>
        <Route path='/prestamos' element={<Prestamos/>}/>
        </Route>
    </Routes>
  )
}

export default Rutas;