import Cabecera from "@/assets/components/Cabecera";
import AddZona from "./AddZona";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import { ColumnDef } from "@tanstack/react-table";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Zona } from "@/assets/interfaces/zona";
import { FaCheck, FaEye, FaPen, FaRegTimesCircle } from "react-icons/fa";
import GrupoBotones from "@/assets/components/GrupoBotones";
import Boton from "@/assets/components/Boton";
import { useEffect } from "react";
import { useZonaContext } from "./context/ZonaContext";
import { InputCheckBox } from "@/assets/components/InputCheckBox";

export default function TablaZonas() {
  const {z, deleteZona,handleConDeshabilitado, conDesabilitado} = useZonaContext();
  
  useEffect(()=>{
    console.log("se renderiza");    
  },[])

  const Columnas: ColumnDef<Zona>[] = [
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
            cell: (info) => (info.getValue() as string)?.slice(0, 25) + "..."
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
      id: "zonaVerDetalle",
      header: "Detelles",
      cell: ({ row }) => {
        const {zonaId} = row.original;
        
        return (
          <Boton
            prop={{
              tamaño: "icon",
              variante: "outline",
              icono: <FaEye/>,
              is_tooltip:true,
              text_tooltip:"Ver Mas",
              tipo:"button",
              onClick() {
                console.log(zonaId);                
              },
            }}
          />
        );
      },
    },
    {
      id: "zonaAcciones",
      header:()=> (
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
          <GrupoBotones
            botonesAccion={[
              {
                variante: "alert",
                icono: <FaPen color="success" />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "Editar",
                onClick: () => {},
              },
              {
                variante: "confirm",
                icono: <FaCheck color="success" />,
                estilo: `${!zona.deshabilitado ? "hidden" : "flex"}`,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "Habilitar",
                onClick: (e) => {
                  alert(e)  
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
                  deleteZona(zona.zonaId)
                },
              },
            ]}
            botonesDropdown={[
              {
                variante: "confirm",
                tamaño: "sm",
                estilo: `${zona.deshabilitado ? "hidden" : "flex"} w-full`,
                texto: "Habilitar",
                is_tooltip: false,
                onClick: () => {},
              },
              {
                variante: "alert",
                tamaño: "sm",
                texto: "Editar",
                is_tooltip: false,
                onClick: () => {},
              },
              {
                variante: "delete",
                estilo: `${zona.deshabilitado ? "hidden" : "flex"} w-full`,
                tamaño: "sm",
                texto: "Deshabilitar",
                is_tooltip: false,
                onClick: () => {},
              },
            ]}
            key={zona.zonaId}
          />
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
        opcionesFilto={["Codigo", "Nombre", "Precio", "Tiempo"]}
      />
    </>
  );
}
