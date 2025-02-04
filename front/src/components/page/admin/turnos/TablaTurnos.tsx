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
import { Colaborador } from "@/assets/interfaces/colaboradores";

export default function TablaTurnos() {
  const { turnosFiltador, setDia, dia, asignarTurno, quitarTurno } = useDepiJoint();
  // Funciones para manejar acciones de botones
  const handleConfirm = (turno: TurnoLista) => {
    asignarTurno(turno);
  };

  const handleEdit = (turno: TurnoLista) => {
    console.log(turno);
  };

  const handleDelete = (turno: TurnoLista) => {
    const { quitarTurno } = useDepiJoint();
    quitarTurno(turno.id);
  };

  // Definición de botones para acciones
  const botonesAccion: BotonProps<TurnoLista>[] = [
    {
      variante: "confirm",
      icono: <FaCheck color="success" />,
      tamaño: "icon",
      is_tooltip: true,
      text_tooltip: "confirmar",
      onClick: handleConfirm,
    },
    {
      variante: "alert",
      icono: <FaPencilAlt color="alert" />,
      tamaño: "icon",
      is_tooltip: true,
      text_tooltip: "editar",
      onClick: handleEdit,
    },
    {
      variante: "delete",
      icono: <FaRegTimesCircle color="delete" />,
      tamaño: "icon",
      is_tooltip: true,
      text_tooltip: "cancelar",
      onClick: handleDelete,
    },
  ];

  // Definición de botones para dropdown
  const botonesDropdown: BotonProps<TurnoLista>[] = [
    {
      variante: "confirm",
      tamaño: "sm",
      estilo: "w-full",
      texto: "confirmar",
      is_tooltip: false,
      onClick: handleConfirm,
    },
    {
      variante: "alert",
      estilo: "w-full",
      tamaño: "sm",
      texto: "editar",
      is_tooltip: false,
      onClick: handleEdit,
    },
    {
      variante: "delete",
      estilo: "w-full",
      tamaño: "sm",
      texto: "cancelar",
      is_tooltip: false,
      onClick: handleDelete,
    },
  ];

  // Definición de columnas para la tabla
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
      header: ({ column }) => <CabeceraColumna column={column} title="Duración" />,
    },
    {
      id: "colaboradores",
      header: "Colaborador",
      cell: ({ row }) => {
        const { getColaboradores } = useColaboradorAccion();
        const colaborador = getColaboradores().find(
          (c: Colaborador) => c.colaboradorId.toString() === row.original.colaboradorId
        );

        return row.original.colaboradorId ? (
          <h1>{row.original.colaboradorId}</h1>
        ) : (
          <Seleccion
            opciones={!colaborador ? getColaboradores() : [colaborador]}
            funccion={(e: string) => {
              row.original.colaboradorId = e.trim();
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
        const turno = row.original;
        return (
          <GrupoBotones
            botonesAccion={botonesAccion}
            botonesDropdown={botonesDropdown}
            key={turno.id}
          />
        );
      },
    },
  ];

  // Componente principal para la tabla de turnos


  return (
    <>
      <Cabecera
        titulo="Turnos"
        descripcion="Turnos del día"
        contenidoMedio={<InputFecha date={dia} funcDate={setDia} />}
        botonAccion={<AddTurno />}
      />
      <Tabla
        columns={Columna}
        data={turnosFiltador}
        opcionesFilto={["Nombre", "Hora", "Duración"]}
      />
    </>
  );
}