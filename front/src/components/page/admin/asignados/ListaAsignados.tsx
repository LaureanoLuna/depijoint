import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import useAsignadoAccion from "@/assets/hooks/useAsignadoAccion";
import useLoginAccion from "@/assets/hooks/useLoginAccion";
import { Asignado } from "@/assets/interfaces/asignado";
import { Usuario } from "@/assets/interfaces/usuario";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ModalObsevaciones from "./ModalObsevaciones";

export default function ListaAsignados() {
  const [user, setUser] = useState<Usuario>();
  const { getTurnosAsignados } = useAsignadoAccion()
  const { isLogin } = useLoginAccion();
  const navegar = useNavigate()

  // Definición de columnas para la tabla

  useEffect(() => {
    const usuario = isLogin()
    if (!usuario) navegar("/login");
    setUser(usuario);
  }, [])

  const Columna: ColumnDef<Asignado>[] = [
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="Nombre" />
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
      id:"detallePaciente",
      cell:({row}) =>{
        const paciente = row.original;
        return (
          <ModalObsevaciones id={paciente.id} />
        )
      }
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
      <Tabla columns={Columna} data={getTurnosAsignados(user?.id ?? "")} opcionesFilto={['nombre']} />
    </>
  );
}
