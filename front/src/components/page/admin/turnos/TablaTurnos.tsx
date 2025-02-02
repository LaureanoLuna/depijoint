import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { InputFecha } from "@/assets/components/InputFecha";
import useDateFilter from "@/assets/hooks/useDateFilter";
import { TurnoLista } from "@/assets/interfaces/turno";

import { ColumnDef } from "@tanstack/react-table";

import { useContext, useEffect, useState } from "react";
import AddTurno from "./AddTurno";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";


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
  {
    id: "actions",
    cell: ({ row }) => {
      const turno = row.original;

      return (
        <GrupoBotones key={turno.id} />
      );
    },
  }
];

export default function TablaTurnos() {
  const [reset, setReset] = useState<boolean>(false);

  const { turnosFiltador, setDia, dia } = useDepiJoint()


  useEffect(() => {
    console.log("se renderizo");

  }, [reset, setReset]);
  return (
    <>
      <Cabecera
        titulo="Turnos"
        descripcion="Turnos del dia"
        contenidoMedio={<InputFecha date={dia} funcDate={setDia} />}
        botonAccion={<AddTurno funcion={setReset} elemento={reset} />}
      />
      <Tabla
        columns={Columna}
        data={turnosFiltador}
        opcionesFilto={["Nombre", "Hora", "Duracion"]}
      />
    </>
  );
}
