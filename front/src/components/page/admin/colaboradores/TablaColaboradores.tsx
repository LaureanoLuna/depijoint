import { Tabla } from "@/assets/components/dataTable/Tabla";

import { Colaborador } from "@/assets/interfaces/colaboradores";
import { ColumnDef } from "@tanstack/react-table";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import useColaboradorAccion from "@/assets/hooks/useColaboradorAccion";

export const Columna: ColumnDef<Colaborador>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => <CabeceraColumna column={column} title="Nombre" />,
  },
  {
    accessorKey: "usuario",
    header: ({ column }) => <CabeceraColumna column={column} title="Usuario" />,
  },
  {
    accessorKey: "clave",
    header: ({ column }) => <CabeceraColumna column={column} title="Clave" />,
  },
  
];

export default function TablaColaboradores() {
  const { getColaboradores } = useColaboradorAccion();
  return (
    <Tabla
      columns={Columna}
      data={getColaboradores()}
      opcionesFilto={["Nombre", "Usuario", "Clave"]}
    />
  );
}
