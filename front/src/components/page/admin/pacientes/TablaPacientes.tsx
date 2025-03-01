import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Paciente } from "@/assets/interfaces/paciente";
import { ColumnDef } from "@tanstack/react-table";
import AddPaciente from "./AddPaciente";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import {
  FaCheck,
  FaEye,
  FaPencilAlt,
  FaRegTimesCircle,
} from "react-icons/fa";
import { InputCheckBox } from "@/assets/components/InputCheckBox";
import { usePacienteContext } from "./context/PacienteContext";
import {
  HiOutlineClipboardCopy,
  HiOutlineDownload,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import ToolTipComponente from "@/assets/components/ToolTipComponente";
import Boton from "@/assets/components/Boton";

export default function TablaPacientes() {
  const { p, conDesabilitado, handleConDeshabilitado, handleEstadoPaciente } =
    usePacienteContext();

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
      cell: ({ row }) => {
        const paciente = row.original;
        return paciente.consentimiento.tiene ? (
          <ToolTipComponente texto="Descargar" tituloBoton="Descargar">
            <a
              href={paciente.consentimiento.archivo}
              target="_blank"
              download
              className="hover:cursor-pointer"
            >
              <HiOutlineDownload size={"1.5rem"} color="green" />
            </a>
          </ToolTipComponente>
        ) : (
          <ToolTipComponente texto="No tiene" tituloBoton="Descargar">
            <HiOutlineExclamationCircle size={"1.5rem"} color="red" />
          </ToolTipComponente>
        );
      },
    },
    {
      id: "crearTratamiento",
      cell: ({ row }) => {
        return (
          <div>
            <Boton
              prop={{
                is_tooltip: true,
                text_tooltip:"Agregar Tratamiento",
                tamaño: "icon",
                icono: <HiOutlineClipboardCopy />,
                variante: "outline",
              }}
            />
          </div>
        );
      },
    },
    {
      id: "pacienteActions",

      header: () => (
        <InputCheckBox
          id="inputCheckDeshabilitadosPacientes"
          label={"Deshabilitados"}
          marcado={conDesabilitado}
          onChange={handleConDeshabilitado}
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
                estilo: `${!paciente.deshabilitado ? "flex" : "hidden"}`,
                variante: "delete",
                icono: <FaRegTimesCircle color="delete" />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "cancelar",
                onClick: () => {
                  if (
                    window.confirm(
                      "¿Está seguro que desea deshabilitar el paciente?"
                    )
                  ) {
                    handleEstadoPaciente(paciente.dni, "deshabilita");
                  }
                },
              },
              {
                estilo: `${paciente.deshabilitado ? "flex" : "hidden"}`,
                variante: "confirm",
                icono: <FaCheck />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "habilitar",
                onClick: () => {
                  if (
                    window.confirm(
                      "¿Está seguro que desea habilitar el paciente?"
                    )
                  ) {
                    handleEstadoPaciente(paciente.dni, "habilita");
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
        data={p}
        opcionesFilto={["Nombre", "Apellido", "DNI"]}
      />
    </>
  );
}
