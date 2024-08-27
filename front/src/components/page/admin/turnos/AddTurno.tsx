import { Input } from '@/components/ui/input'
import React from 'react'

export default function AddTurno() {
  return (
    <div className='py-5'>
      <h2>Ingresar Turno</h2>
      <form className='flex flex-col items-center justify-center w-2/4 m-auto p-5 gap-y-5 text-center'>
        <span className='grid grid-cols-2 gap-2'>
          <Input className='' type='date' placeholder='HORARIO' />
          <Input type='time' placeholder='HORARIO' />
        </span>
        <Input placeholder='DNI DEL PACIENTE' />
        <Input disabled placeholder='NOMBRE COMPLETO' />
        <span className='grid grid-cols-3 gap-2'>
          <Input disabled className='col-span-2' placeholder='CONTRATACION' />
          <Input disabled placeholder='N° DE SESION' />
        </span>
        <Input type='submit' className='cursor-pointer border hover:border-green-400' />

      </form>
    </div>
  )
}
