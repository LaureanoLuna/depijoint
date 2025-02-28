import Cabecera from "@/assets/components/Cabecera";
import AddZona from "./AddZona";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import { ColumnDef } from "@tanstack/react-table";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Zona } from "@/assets/interfaces/zona";
import { useZonaContext } from "./context/ZonaContext";
import { InputCheckBox } from "@/assets/components/InputCheckBox";
import ModalDetalles from "./modals/ModalDetalles";

export default function TablaZonas() {
  const { z, handleConDeshabilitado, conDesabilitado } =
    useZonaContext();

  const Columnas: ColumnDef<Zona>[] = [
    {
      accessorKey: "tipo",
      header: ({ column }) => {
        return <CabeceraColumna column={column} title="Tipo" />;
      },
    },
    {
      accessorKey: "codigo",
      header: ({ column }) => {
        return <CabeceraColumna column={column} title="Codigo" />;
      },
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => {
        return <CabeceraColumna column={column} title="Nombre" />;
      },
      getGroupingValue: (row) => `${row.nombre} ${row.descripcion} `,
    },
    {
      accessorKey: "descripcion",
      maxSize: 25,
      header: ({ column }) => {
        return <CabeceraColumna column={column} title="Descripcion" />;
      },
      cell: (info) => (info.getValue() as string)?.slice(0, 25) + "...",
    },
    {
      accessorKey: "precio",
      header: ({ column }) => {
        return <CabeceraColumna column={column} title="Precio" />;
      },
      cell: (info) => "$" + info.getValue(),
    },
    {
      accessorKey: "tiempo",
      header: ({ column }) => {
        return <CabeceraColumna column={column} title="Tiempo" />;
      },
      cell: (info) => info.getValue() + " min",
    },
    {
      accessorKey:"deshabilitado",
      header: () => (
        <InputCheckBox
          id="inputCheckDeshabilitadosZona"
          label={"Deshabilitados"}
          marcado={conDesabilitado}
          onChange={handleConDeshabilitado}
        />
      ),
      cell: ({ row }) => {
        const zona = row.original;
        return (
            <ModalDetalles zona={zona} />
        );
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
        columns={Columnas}
        data={z}
        opcionesFilto={["Tipo", "Codigo", "Nombre"]}
        tieneDeshabilotado = {true}
      />
    </>
  );
}
