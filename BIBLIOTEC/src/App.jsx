import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Rutas } from './components/routes'

function App() {

  return (
      <BrowserRouter>
      <Rutas/>
      </BrowserRouter>
  );
}

export default App