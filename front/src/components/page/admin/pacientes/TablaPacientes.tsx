import { useEffect, useState } from "react";
import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Paciente } from "@/assets/interfaces/paciente";
import { ColumnDef } from "@tanstack/react-table";
import AddPaciente from "./AddPaciente";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { FaEye, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import { InputCheckBox } from "@/assets/components/InputCheckBox";

export default function TablaPacientes() {
  const { pacientes, allPacientes, deletePaciente } = useDepiJoint();
  const [conDesabilitado, setConDesabilitado] = useState<boolean>(true);

  useEffect(() => {
    allPacientes(conDesabilitado);
  }, [conDesabilitado]);

  const Columna: ColumnDef<Paciente>[] = [
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="Nombre" />
      ),
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
      id: "consentimiento",
      header: "Consentimiento",
      cell: ({ row }) => {
        const paciente = row.original;
        return paciente.consentimiento.tiene ? (
          <h2>Tiene</h2>
        ) : (
          <h2>NO tiene</h2>
        );
      },
    },
    {
      id: "pacienteActions",
      
      header:()=> (
        <InputCheckBox
          id="inputCheckDeshabilitadosPacientes"
          label={"Deshabilitados"}
          marcado={conDesabilitado}
          onChange={() => setConDesabilitado(!conDesabilitado)}
        />
      ),
      cell: ({ row }) => {
        const paciente = row.original;

        return (
          <GrupoBotones
            botonesAccion={[
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
                onClick: () => {
                  if (
                    window.confirm(
                      "¿Está seguro que desea eliminar el paciente?"
                    )
                  ) {
                    deletePaciente(paciente.dni);
                  }
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
            ]}
            key={paciente.dni}
          />
        );
      },
    },
  ];

  return (
    <>
      <Cabecera
        titulo="Pacientes"
        descripcion="ABM de Pacientes"
        botonAccion={<AddPaciente />}
      />
      <Tabla
        columns={Columna}
        data={pacientes}
        opcionesFilto={["Nombre", "Apellido", "DNI"]}
      />
    </>
  );
}
