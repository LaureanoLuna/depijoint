import { Asignado } from "../interfaces/asignado";
import useTurnoAccion from "./useTurnoAccion";

export default function useAsignadoAccion() {
  const { getTurnos,setTurnos } = useTurnoAccion();
  const getTurnosAsignados = (colaboradorId: string): Asignado[] => {
    const asignados = localStorage.getItem("asignados");
    return !asignados
      ? []
      : JSON.parse(asignados).filter(
          (a: Asignado) => a.colaboradorId === colaboradorId
        );
  };

  const getAsignados = (): Asignado[] | undefined => {
    const asignados = localStorage.getItem("asignados");
    if (!asignados) return;
    return JSON.parse(asignados);
  };

  const getAsinado = (turnoId: string): Asignado | undefined => {
    const turno =
      getAsignados()?.find((t) => t.turnoId === turnoId) || undefined;
    return turno;
  };

  const asignarTurno = (turno: any, colaborador: string): boolean => {
    let bool = false;

    try {
      if (!turno || !colaborador) {
        throw new Error("Faltan datos: turno o colaboradorId");
      }

      const { id, dia, dni, duracion, hora, nombre } = turno;
      const asignacion: Asignado = {
        id: "1", // Considera usar un ID único real
        turnoId: id,
        dia: dia,
        nombre: nombre,
        dni: dni,
        hora: hora,
        colaboradorId: colaborador,
        tiempo: duracion,
        estado: false,
        fechaAlta: new Date(),
        fechaBaja: null,
      };

      const local = JSON.parse(localStorage.getItem("asignados") || "[]");
      local.push(asignacion);
      localStorage.setItem("asignados", JSON.stringify(local));
      bool = true;
    } catch (error) {
      console.error("Error al asignar turno:", error);
      bool = false;
    }

    return bool;
  };

  const quitarAsignacion = (turnoId: string): boolean => {
    let bool = false;

    try {
      const asignados = getAsignados();
      if (!asignados) {
        throw new Error("No hay asignaciones");
      }

      const index = asignados.findIndex((a) => a.turnoId === turnoId);
      const turno = getTurnos().find((t) => t.id === turnoId);
      if (!turno) {
        throw new Error("No se encontró el turno");
      }

      if (index === -1) {
        throw new Error("No se encontró la asignación");
      }
      turno.estado = false;
      setTurnos(turno);
      asignados[index].fechaBaja = new Date();
      asignados[index].estado = true;
      localStorage.setItem("asignados", JSON.stringify(asignados));
      bool = true;
    } catch (error) {
      console.error("Error al quitar asignación:", error);
      bool = false;
    }

    return bool;
  };

  return { asignarTurno, getTurnosAsignados, getAsinado, getAsignados, quitarAsignacion };
}
