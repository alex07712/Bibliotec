import React from 'react'
import { Button } from '../../components'

export function Home() {
  return (
    <div>
      <h1>home aqui</h1>
      <Button onClick={() => console.log("boton funcionando")} 
      className="bg-emerald-400 rounded-full p-1 font-semibold " >
        boton hola
        </Button>
    </div>
  )
}
