import Cabecera from "@/assets/components/Cabecera";
import { CabeceraColumna } from "@/assets/components/dataTable/CabeceraColumna";
import { Tabla } from "@/assets/components/dataTable/Tabla";
import GrupoBotones from "@/assets/components/GrupoBotones";
import { InputFecha } from "@/assets/components/InputFecha";
import { Turno, TurnoLista } from "@/assets/interfaces/turno";
import { ColumnDef } from "@tanstack/react-table";
import AddTurno from "./AddTurno";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import {
  FaCashRegister,
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
import useAsignadoAccion from "@/assets/hooks/useAsignadoAccion";
import { useEffect, useState } from "react";

export default function TablaTurnos() {
  const { turnosFiltador, setDia, dia, turnoAsignado, quitarTurno } =
    useDepiJoint();
  const { getPaciente } = usePacienteAccion();
  // Definición de columnas para la tabla
  const Columna: ColumnDef<Turno>[] = [
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
        const { asignarTurno, getAsinado } = useAsignadoAccion();
        const [col, setCol] = useState<Colaborador[]>([]);

        useEffect(() => {
          const estaAsignado = () => {
            if (row.original.estado) {
              const turnoA = getAsinado(row.original.id);
              const colaborador = getColaboradores().find(
                (c) => c.colaboradorId.toString() === turnoA?.colaboradorId
              );
              setCol(colaborador ? [colaborador] : getColaboradores());
            } else {
              setCol(getColaboradores());
            }
          };

          estaAsignado();
        }, [row.original.estado, row.original.id]);

        return (
          <SeleccionColaboradores
            deshabilitado={row.original.estado ?? false}
            opciones={col}
            funccion={(e: string) => {
              asignarTurno(row.original, e);
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
              onClick: () => {},
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
        return (
          <GrupoBotones
            botonesAccion={[
              {
                variante: "confirm",
                estilo: `${turno.estado ? "hidden" : "flex"}`,
                icono: <FaCheck color="success" />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "confirmar",
                onClick: () => {
                  turnoAsignado(turno);
                },
              },
              {
                variante: "outline",
                estilo: `${!turno.estado ? "hidden" : "flex"}`,
                icono: <FaCashRegister color="success" />,
                tamaño: "icon",
                is_tooltip: true,
                text_tooltip: "Abonar",
                onClick: () => {
                  turnoAsignado(turno);
                },
              },
              {
                variante: "delete",
                estilo: `${turno.estado ? "hidden" : "flex"}`,
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
                estilo: `${turno.estado ? "hidden" : "flex"} w-full`,

                texto: "confirmar",
                is_tooltip: false,
                onClick: () => {
                  turnoAsignado(turno);
                },
              },
              {
                variante: "outline",
                tamaño: "sm",
                estilo: `${!turno.estado ? "hidden" : "flex"} w-full`,

                texto: "Abonar",
                is_tooltip: false,
                onClick: () => {
                  turnoAsignado(turno);
                },
              },
              {
                variante: "delete",
                estilo: `${turno.estado ? "hidden" : "flex"} w-full`,

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
