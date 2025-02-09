import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { InputFecha } from "@/assets/components/InputFecha";
import { TurnoLista } from "@/assets/interfaces/turno";
import { ColumnDef } from "@tanstack/react-table";
import AddTurno from "./AddTurno";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import {
  FaCheck,
  FaRegTimesCircle,
  FaWhatsapp,
} from "react-icons/fa";
import useColaboradorAccion from "@/assets/hooks/useColaboradorAccion";
import { Colaborador } from "@/assets/interfaces/colaboradores";
import Boton from "@/assets/components/Boton";
import usePacienteAccion from "@/assets/hooks/usePacienteAccion";
import { Link } from "react-router-dom";
import SeleccionColaboradores from "../colaboradores/SeleccionColaboradores";

export default function TablaTurnos() {
  const { turnosFiltador, setDia, dia, asignarTurno, quitarTurno } =
    useDepiJoint();
  const { getPaciente } = usePacienteAccion();
  // Definición de columnas para la tabla
  const Columna: ColumnDef<TurnoLista>[] = [
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="Nombre" />
      ),
    },
    {
      accessorKey: "hora",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="Horario" />
      ),
    },
    {
      accessorKey: "duracion",
      header: ({ column }) => (
        <CabeceraColumna column={column} title="Duración" />
      ),
    },
    {
      id: "colaboradores",
      header: "Colaborador",
      cell: ({ row }) => {
        const { getColaboradores } = useColaboradorAccion();
        const colaborador = getColaboradores().find(
          (c: Colaborador) =>
            c.colaboradorId.toString() === row.original.colaboradorId
        );

        return row.original.colaboradorId ? (
          <h1>{row.original.colaboradorId}</h1>
        ) : (
          <SeleccionColaboradores
            opciones={getColaboradores()}
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
      id: "accionWhatsapp",
      header: "Whatsapp",
      cell: ({ row }) => {
        const dniPaciente = row.original.dni;
        const paciente = getPaciente(dniPaciente);
        return (
          <Boton
            prop={{
              tipo: "button",
              tamaño: "icon",
              variante: "outline",
              is_tooltip: true,
              text_tooltip: "WhatsApp",
              onClick: () => { },
              icono: (
                <Link
                  to={`https://wa.me/54${paciente?.telefono}?text=I'm%20interested%20in%20your%20car%20for%20sale`}
                  target={"_blank"}
                >
                  {" "}
                  <FaWhatsapp />
                </Link>
              ),
            }}
          />
        );
      },
    },
    {
      id: "acciones",
      cell: ({ row }) => {
        const turno = row.original;
        console.log(turno);
        
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
                  asignarTurno(turno);
                },
              },
              {
                variante: "delete",
                icono: <FaRegTimesCircle color="delete" />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "cancelar",
                onClick: () => {
                  quitarTurno(turno.id);
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
                  asignarTurno(turno);
                },
              },
              {
                variante: "delete",
                estilo: "w-full",
                tamaño: "sm",
                texto: "cancelar",
                is_tooltip: false,
                onClick: () => {
                  quitarTurno(turno.id);
                },
              },
            ]}
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
