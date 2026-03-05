import React from 'react'
import { Button } from '../../components'

export function Home() {
  return (
    <div>
      <h1>home aqui</h1>
      <Button onClick={() => console.log("boton funcionando")} 
      className="bg-blue-600 rounded-full p-2 ml-6 mt-6 font-semibold " >
        boton que hace "algo"
        </Button>
    </div>
  )
}
