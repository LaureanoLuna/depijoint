import Cabecera from "@/assets/components/Cabecera";
import AddZona from "./AddZona";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import { ColumnDef } from "@tanstack/react-table";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Zona } from "@/assets/interfaces/zona";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { useEffect } from "react";
import { useZonaContext } from "./context/ZonaContext";
import { InputCheckBox } from "@/assets/components/InputCheckBox";
import ModalDetalles from "./modals/ModalDetalles";

export default function TablaZonas() {
  const { z, handleEstadoZona, handleConDeshabilitado, conDesabilitado } =
    useZonaContext();

  useEffect(() => {
    console.log("se renderiza");
  }, []);

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
      id: "zonaAcciones",
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
          <div className="grid border grid-cols-2">
            <ModalDetalles zona={zona} />
            <GrupoBotones
              botonesAccion={[
                {
                  variante: "confirm",
                  icono: <FaCheck color="success" />,
                  estilo: `${!zona.deshabilitado ? "hidden" : "flex"}`,
                  tamaño: "icon",
                  is_tooltip: true,
                  text_tooltip: "Habilitar",
                  onClick: () => {
                    handleEstadoZona(zona.zonaId, "habilita");
                  },
                },

                {
                  variante: "delete",
                  estilo: `${zona.deshabilitado ? "hidden" : "flex"}`,
                  icono: <FaRegTimesCircle color="delete" />,
                  tamaño: "icon",
                  is_tooltip: true,
                  text_tooltip: "Deshabilitar",
                  onClick: () => {
                    handleEstadoZona(zona.zonaId, "deshabilita");
                  },
                },
              ]}
              botonesDropdown={[
                {
                  variante: "alert",
                  tamaño: "sm",
                  texto: "Editar",
                  is_tooltip: false,
                  onClick: () => {},
                },
                {
                  variante: "confirm",
                  tamaño: "sm",
                  estilo: `${zona.deshabilitado ? "hidden" : "flex"} w-full`,
                  texto: "Habilitar",
                  is_tooltip: false,
                  onClick: () => {
                    handleEstadoZona(zona.zonaId, "habilita");
                  },
                },
                {
                  variante: "delete",
                  estilo: `${zona.deshabilitado ? "hidden" : "flex"} w-full`,
                  tamaño: "sm",
                  texto: "Deshabilitar",
                  is_tooltip: false,
                  onClick: () => {
                    handleEstadoZona(zona.zonaId, "deshabilita");
                  },
                },
              ]}
              key={zona.zonaId}
            />

          </div>
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
      />
    </>
  );
}
