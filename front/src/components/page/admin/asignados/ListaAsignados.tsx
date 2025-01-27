
import Cabecera from '@/assets/components/Cabecera'
import TablaComponent from '@/assets/components/TablaComponent'
import React from 'react'

export default function ListaAsignados() {
  return (
    <>
    <Cabecera
    titulo='Asignados'
    descripcion='lista de los turnos asignados'
    botonAccion={ <h1>Filtro</h1> }
    />
    <TablaComponent arrTitulos={['turno','paciente','acciones']}>

    </TablaComponent>
    </>
  )
}
