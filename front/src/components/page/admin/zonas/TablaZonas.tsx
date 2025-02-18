import Cabecera from "@/assets/components/Cabecera";
import AddZona from "./AddZona";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import useZonaAccion from "@/assets/hooks/useZonaAccion";
import { ColumnDef } from "@tanstack/react-table";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Zona } from "@/assets/interfaces/zona";

export default function TablaZonas() {
  const { getZonas, zonas } = useZonaAccion();

  const Columna: ColumnDef<Zona>[] = [
    {
      accessorKey: "codigoZona",
      header: ({ column }) => {
        <CabeceraColumna column={column} title="codigoZona" />;
      },
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        <CabeceraColumna column={column} title="Nombre" />;
      },
    },
    {
      accessorKey: "descripcion",
      header: ({ column }) => {
        <CabeceraColumna column={column} title="descripcion" />;
      },
    },
    {
      accessorKey: "precio",
      header: ({ column }) => {
        <CabeceraColumna column={column} title="precio" />;
      },
    },
    {
      accessorKey: "tiempo",
      header: ({ column }) => {
        <CabeceraColumna column={column} title="tiempo" />;
      },
    },
  ];
  return (
    <>
      <Cabecera
        titulo="ABM Zonas"
        descripcion="Todos los articulos"
        botonAccion={<AddZona />}
      />
      <Tabla
        columns={Columna}
        data={zonas}
        opcionesFilto={["nombre", "precio"]}
      />
    </>
  );
}
