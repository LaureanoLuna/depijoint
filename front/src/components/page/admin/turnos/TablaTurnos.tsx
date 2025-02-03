import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { InputFecha } from "@/assets/components/InputFecha";
import { TurnoLista } from "@/assets/interfaces/turno";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import AddTurno from "./AddTurno";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import { BotonProps } from "@/assets/interfaces/props/BotonProps";
import { FaCheck, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import Seleccion from "@/assets/components/Seleccion";
import useColaboradorAccion from "@/assets/hooks/useColaboradorAccion";


const botonesAccion: BotonProps[] = [
  {
    variante: "confirm",
    icono: <FaCheck color="success" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "confirmar",
  },
  {
    variante: "alert",
    icono: <FaPencilAlt color="alert" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "editar",
  },
  {
    variante: "delete",
    icono: <FaRegTimesCircle color="delete" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "cancelar",
  },
];

const botonesDropdown: BotonProps[] = [
  {
    variante: "confirm",
    tamaño: "sm",
    estilo: "w-full",
    texto: "confirmar",
    is_tooltip: false,
  },
  {
    variante: "alert",
    estilo: "w-full",
    tamaño: "sm",
    texto: "editar",
    is_tooltip: false,
  },
  {
    variante: "delete",
    estilo: "w-full",
    tamaño: "sm",
    texto: "cancelar",
    is_tooltip: false,
  },
];

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
    id: "colaborador",
    cell: ({ row }) => {
      const { getColaboradores } = useColaboradorAccion();
      return (
        <Seleccion opciones={getColaboradores()} titulo="Usuario" funccion={()=>console.log("goo")
        } />
      );
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const turno = row.original;
      return (
        <GrupoBotones botonesAccion={botonesAccion} botonesDropdown={botonesDropdown} key={turno.id} />
      );
    },
  },
];

export default function TablaTurnos() {
  const [reset, setReset] = useState<boolean>(false);
  const { turnosFiltador, setDia, dia } = useDepiJoint();

  useEffect(() => {
    console.log(turnosFiltador);
  }, [turnosFiltador]);

  return (
    <>
      <Cabecera
        titulo="Turnos"
        descripcion="Turnos del dia"
        contenidoMedio={<InputFecha date={dia} funcDate={setDia} />}
        botonAccion={<AddTurno />}
      />
      <Tabla
        columns={Columna}
        data={turnosFiltador}
        opcionesFilto={["Nombre", "Hora", "Duracion"]}
      />
    </>
  );
}