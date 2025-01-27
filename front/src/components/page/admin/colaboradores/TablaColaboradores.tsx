import { Tabla } from '@/assets/components/dataTable/Tabla'

import { Colaborador } from "@/assets/interfaces/colaboradores"
import { ColumnDef } from "@tanstack/react-table"
import { CabeceraColumna } from '@/assets/components/dataTable/CabeceraColumna'
import { LIST_COLABORADORES } from '@/assets/constant/LIST_COLABORADORES'




export const Columna: ColumnDef<Colaborador>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => (
        <CabeceraColumna column={column} title="Nombre" />
      ),
  },
  {
    accessorKey: "usuario",
    header: ({ column }) => (
        <CabeceraColumna column={column} title="Usuario" />
      ),
  },
  {
    accessorKey: "clave",
    header: ({ column }) => (
        <CabeceraColumna column={column} title="Clave" />
      ),
  },
]

export default function TablaColaboradores() {
  return (
    <Tabla columns={Columna} data={LIST_COLABORADORES} />
  )
}
