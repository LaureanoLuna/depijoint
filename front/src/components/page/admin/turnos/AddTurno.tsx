import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function AddTurno() {
  return (
    <div className='py-5'>
      <h2 className='text-2xl mb-5 uppercase'>Ingresar Turno</h2>
      <form className='flex flex-col items-center justify-center w-2/4 m-auto p-5 gap-y-5 text-center'>
        <div className='grid grid-cols-2 gap-2'>
          <Input className='' type='date' value='2024-08-11' placeholder='HORARIO' />
          <Input type='time' placeholder='HORARIO' />
        </div>
        <Input placeholder='DNI DEL PACIENTE' />
        <Input disabled placeholder='NOMBRE COMPLETO' />
        <span className='grid grid-cols-3 gap-2'>
          <Input disabled className='col-span-2' placeholder='CONTRATACION' />
          <Input disabled placeholder='N° DE SESION' />
        </span>
        <Button type='submit' size={"lg"} className='cursor-pointer border focus:border-green-400 '>
          Enviar
        </Button>

    </form>
    </div >
  )
}
