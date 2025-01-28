import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import { InputFecha } from "@/assets/components/InputFecha";
import useDateFilter from "@/assets/hooks/useDateFilter";
import { TurnoLista } from "@/assets/interfaces/turno";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import AddTurno from "./AddTurno";

export const Columna: ColumnDef<TurnoLista>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => <CabeceraColumna column={column} title="Nombre" />,
  },
  {
    accessorKey: "hora",
    header: ({ column }) => <CabeceraColumna column={column} title="Horario" />,
  },
  {
    accessorKey: "duracion",
    header: ({ column }) => (
      <CabeceraColumna column={column} title="Duracion" />
    ),
  },
];

export default function TablaTurnos() {
  const [date, setDate] = useState<Date>(new Date());

  const { filteredTurnos } = useDateFilter({ fecha: date });
  return (
    <>
      <Cabecera
        titulo="Turnos"
        descripcion="Turnos del dia"
        contenidoMedio={<InputFecha date={date} funcDate={setDate} />}
        botonAccion={<AddTurno />}
      />
      <Tabla
        columns={Columna}
        data={filteredTurnos}
        opcionesFilto={["Nombre", "Hora", "Duracion"]}
      />
    </>
  );
}
