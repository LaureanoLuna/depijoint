

import { Colaborador } from "@/assets/interfaces/colaboradores"
import { ColumnDef } from "@tanstack/react-table"
import { CabeceraColumna } from "./CabeceraColumna"



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
        <CabeceraColumna column={column} title="Clavee" />
      ),
  },
]
