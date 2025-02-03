import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { InputFecha } from "@/assets/components/InputFecha";
import { TurnoLista } from "@/assets/interfaces/turno";
import { ColumnDef } from "@tanstack/react-table";
import AddTurno from "./AddTurno";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import { BotonProps } from "@/assets/interfaces/props/BotonProps";
import { FaCheck, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import Seleccion from "@/assets/components/Seleccion";
import useColaboradorAccion from "@/assets/hooks/useColaboradorAccion";
import useTurnoAccion from "@/assets/hooks/useTurnoAccion";

const botonesAccion: BotonProps<TurnoLista>[] = [
  {
    variante: "confirm",
    icono: <FaCheck color="success" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "confirmar",
    onClick: (turno: TurnoLista) => {
      // Lógica para confirmar turno
    },
  },
  {
    variante: "alert",
    icono: <FaPencilAlt color="alert" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "editar",
    onClick: (turno: TurnoLista) => {
      console.log(turno);
    },
  },
  {
    variante: "delete",
    icono: <FaRegTimesCircle color="delete" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "cancelar",
    onClick: (turno: TurnoLista) => {
      console.log(turno);
    },
  },
];

const botonesDropdown: BotonProps<TurnoLista>[] = [
  {
    variante: "confirm",
    tamaño: "sm",
    estilo: "w-full",
    texto: "confirmar",
    is_tooltip: false,
    onClick: (turno: TurnoLista) => {
      // Lógica para confirmar turno
    },
  },
  {
    variante: "alert",
    estilo: "w-full",
    tamaño: "sm",
    texto: "editar",
    is_tooltip: false,
    onClick: (turno: TurnoLista) => {
      console.log(turno);
    },
  },
  {
    variante: "delete",
    estilo: "w-full",
    tamaño: "sm",
    texto: "cancelar",
    is_tooltip: false,
    onClick: (turno: TurnoLista) => {
      console.log(turno);
    },
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
    header: ({ column }) => <CabeceraColumna column={column} title="Duracion" />,
  },
  {
    id: "colaborador",
    header: "Colaborador",
    cell: ({ row }) => {      
      const { getColaboradores } = useColaboradorAccion();
      return row.original.colaboradorId ? (
        <h1>{row.original.colaboradorId}</h1>
      ) : (
        <Seleccion
          opciones={getColaboradores()}
          funccion={(e: string) => {
            console.log(row.original);
            row.original.colaboradorId = e;
            
          }}
          titulo={"Usuarios..."}
          name={"usuario"}
        />
      );
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const { confirmarTurno } = useTurnoAccion();

      const turno = row.original;

      const botonesConDatos = botonesAccion.map(boton => ({
        ...boton,
        onClick: () => confirmarTurno(turno), // Asegúrate de que se llame la función
      }));

      return (
        <GrupoBotones
          botonesAccion={botonesConDatos} // Usar los botones con datos
          botonesDropdown={botonesDropdown}
          key={turno.id}
        />
      );
    },
  }
];

export default function TablaTurnos() {
  const { turnosFiltador, setDia, dia } = useDepiJoint();
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