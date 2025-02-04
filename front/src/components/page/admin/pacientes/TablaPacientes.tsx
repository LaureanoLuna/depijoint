import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { PacienteSelect } from "@/assets/interfaces/paciente";
import { ColumnDef } from "@tanstack/react-table";
import AddPaciente from "./AddPaciente";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import usePacienteAccion from "@/assets/hooks/usePacienteAccion";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { FaEye, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import { BotonProps } from "@/assets/interfaces/props/BotonProps";

const botonesAccion: BotonProps[] = [
  {
    variante: "ghost",
    icono: <FaEye color="success" />,
    tamaño: "icon",
    is_tooltip: true,
    text_tooltip: "ver",
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

export const Columna: ColumnDef<PacienteSelect>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => <CabeceraColumna column={column} title="Nom" />,
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => (
      <CabeceraColumna column={column} title="Apellido" />
    ),
  },
  {
    accessorKey: "dni",
    header: ({ column }) => <CabeceraColumna column={column} title="DNI" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const paciente = row.original;

      return (
        <GrupoBotones
          botonesAccion={botonesAccion}
          botonesDropdown={botonesDropdown}
          key={paciente.dni}
        />
      );
    },
  },
];

export default function TablaPacientes() {
  const { getPacientes } = usePacienteAccion();
  return (
    <>
      <Cabecera
        titulo="Pacientes"
        descripcion="ABM de Pacientes"
        botonAccion={<AddPaciente />}
      />
      <Tabla
        columns={Columna}
        data={getPacientes()}
        opcionesFilto={["Nombre", "Apellido", "DNI"]}
      />
    </>
  );
}
