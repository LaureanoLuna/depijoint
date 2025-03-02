import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Paciente } from "@/assets/interfaces/paciente";
import { ColumnDef } from "@tanstack/react-table";
import AddPaciente from "./AddPaciente";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { FaCheck, FaEye, FaPencilAlt, FaRegTimesCircle } from "react-icons/fa";
import { InputCheckBox } from "@/assets/components/InputCheckBox";
import { usePacienteContext } from "./context/PacienteContext";
import {
  HiOutlineClipboardCopy,
  HiOutlineDownload,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import ToolTipComponente from "@/assets/components/ToolTipComponente";
import Boton from "@/assets/components/Boton";
import { Link } from "react-router-dom";
import AddTratamiento from "./modals/AddTratamiento";

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
        return <AddTratamiento paciente={row.original} />;
      },
    },
    {
      accessorKey: "deshabilitado",

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
          <Link className="w-full ml-auto" to={`${paciente.dni}`}>
            <Boton
              prop={{
                is_tooltip: true,
                text_tooltip: "Ver Mas",
                tamaño: "lg",
                variante: "outline",
                icono: <FaEye />,
                estilo: "w-full",
              }}
            />
          </Link>
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
        tieneDeshabilotado={true}
      />
    </>
  );
}
