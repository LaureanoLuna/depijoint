import { Asignado } from "../interfaces/asignado";
import useTurnoAccion from "./useTurnoAccion";

export default function useAsignadoAccion() {
  const { getTurnos, setTurnos, cancelarTurno } = useTurnoAccion();
  const getTurnosAsignados = (colaboradorId: string): Asignado[] => {
    const asignados = localStorage.getItem("asignados");
    return !asignados
      ? []
      : JSON.parse(asignados).filter(
          (a: Asignado) => a.colaboradorId === colaboradorId
        );
  };

  const getAsignados = (): Asignado[] => {
    const asignados = localStorage.getItem("asignados");
    if (!asignados) return [];
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

  const quitarAsignacion = async (turnoId: string): Promise<boolean> => {
    try {
      const asignados = getAsignados();
      if (!asignados || asignados.length === 0) {
        throw new Error("No hay asignaciones");
      }

      const asignacionIndex = asignados.findIndex((a) => a.turnoId === turnoId);
      const turno = getTurnos().find((t) => t.id === turnoId);

      if (!turno) {
        throw new Error("No se encontró el turno");
      }
      if (asignacionIndex === -1) {
        throw new Error("No se encontró la asignación");
      }

      // Actualizar el estado del turno
      turno.estado = false;
      setTurnos(turno);

      // Eliminar la asignación y cancelar el turno
      const asignacionEliminada = await eliminarAsignacion(
        asignados[asignacionIndex].id
      );
      const turnoCancelado = await cancelarTurno(turno.id);

      return asignacionEliminada && turnoCancelado;
    } catch (error) {
      console.error("Error al quitar asignación:", error);
      return false;
    }
  };

  const eliminarAsignacion = async (asignacionId: string): Promise<boolean> => {
    const asignados = getAsignados();
    try {
      const indice = asignados.findIndex((a) => a.id === asignacionId);
      if (indice === -1) {
        throw new Error("No se encontró la asignación");
      }

      // Eliminar la asignación del array
      asignados.splice(indice, 1);
      localStorage.setItem("asignados", JSON.stringify(asignados));

      return true;
    } catch (error) {
      console.error("Error al eliminar asignación:", error);
      return false;
    }
  };

  return {
    asignarTurno,
    getTurnosAsignados,
    getAsinado,
    getAsignados,
    quitarAsignacion,
  };
}
