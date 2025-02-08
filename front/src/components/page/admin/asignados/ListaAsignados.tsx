import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import useAsignadoAccion from "@/assets/hooks/useAsignadoAccion";
import { Asignado } from "@/assets/interfaces/asignado";
import { ColumnDef } from "@tanstack/react-table";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ListaAsignados() {
  const { colaboradorId } = useParams();
  const { getTurnosAsignados } = useAsignadoAccion()
  // Definición de columnas para la tabla

  const Columna: ColumnDef<Asignado>[] = [
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="pacienteId" />
      ),
    },
    {
      accessorKey: "hora",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="Tiempo" />
      ),
    },
    {
      accessorKey: "tiempo",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="Duración" />
      ),
    },
    {
      id: "acciones",
      cell: ({ row }) => {
        const asignado = row.original;
        return (
          <GrupoBotones
            botonesAccion={[
              {
                variante: "confirm",
                icono: <FaCheck color="success" />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "confirmar",
                onClick: () => {
                  console.log(asignado)
                },
              },
              {
                variante: "delete",
                icono: <FaRegTimesCircle color="delete" />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "cancelar",
                onClick: () => {
                  console.log(asignado)
                },
              },
            ]}
            botonesDropdown={[
              {
                variante: "confirm",
                tamaño: "sm",
                estilo: "w-full",
                texto: "confirmar",
                is_tooltip: false,
                onClick: () => {
                  console.log(asignado)
                },
              },
              {
                variante: "delete",
                estilo: "w-full",
                tamaño: "sm",
                texto: "cancelar",
                is_tooltip: false,
                onClick: () => {
                  console.log(asignado)
                },
              },
            ]}
            key={asignado.id}
          />
        );
      },
    },
  ];
  return (
    <>
      <Cabecera
        titulo="Asignados"
        descripcion="lista de los turnos asignados"
        botonAccion={<h1>Filtro</h1>}
      />
      <Tabla columns={Columna} data={getTurnosAsignados(colaboradorId??"")} opcionesFilto={['pacienteId']} />
    </>
  );
}
