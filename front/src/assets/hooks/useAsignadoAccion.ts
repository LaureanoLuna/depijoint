import { format } from "date-fns";
import { Asignado } from "../interfaces/asignado";
import useTurnoAccion from "./useTurnoAccion";
import { Turno } from "../interfaces/turno";

/**
 * Hook para gestionar la asignación de turnos a colaboradores.
 * Permite obtener, asignar y quitar asignaciones de turnos.
 */
export default function useAsignadoAccion() {
  const { getTurnos, setTurnos, cancelarTurno, getTurnosTratamiento } = useTurnoAccion();

  /**
   * Obtiene los turnos asignados a un colaborador en un día específico.
   * @param colaboradorId - ID del colaborador.
   * @param dia - Fecha del día a consultar.
   * @returns Lista de turnos asignados al colaborador en ese día.
   */
  const getTurnosAsignados = (colaboradorId: string, dia: Date): Asignado[] => {
    const asignados = JSON.parse(localStorage.getItem("asignados") || "[]");
    return asignados.filter(
      (a: Asignado) => a.colaboradorId === colaboradorId && a.dia === format(dia, "yyyy-MM-dd")
    );
  };

  /**
   * Obtiene todas las asignaciones almacenadas en el localStorage.
   * @returns Lista de asignaciones.
   */
  const getAsignados = (): Asignado[] => JSON.parse(localStorage.getItem("asignados") || "[]");

  /**
   * Obtiene una asignación específica por ID de turno.
   * @param turnoId - ID del turno.
   * @returns Asignación encontrada o undefined si no existe.
   */
  const getAsignado = (turnoId: string): Asignado | undefined =>
    getAsignados().find((t) => t.turnoId === turnoId);

  /**
   * Asigna un turno a un colaborador.
   * @param turno - Datos del turno a asignar.
   * @param colaboradorId - ID del colaborador.
   * @returns True si la asignación fue exitosa, false en caso contrario.
   */
  const asignarTurno = (turno: Turno, colaboradorId: string): boolean => {
    if (!turno || !colaboradorId) {
      console.error("Faltan datos: turno o colaboradorId");
      return false;
    }

    const { id, dia, dni, duracion, hora, nombre, contratacion_id } = turno;
    const asignados = getAsignados();
    const existente = getAsignado(id);

    if (existente) eliminarAsignacion(existente.id);

    const nuevaAsignacion: Asignado = {
      id: asignados.length.toString(),
      turnoId: id,
      turnoNumero: getTurnosTratamiento(contratacion_id).length,
      dia,
      nombre,
      dni,
      hora,
      colaboradorId,
      tiempo: duracion,
      estado: false,
      fechaAlta: new Date(),
      fechaBaja: null,
    };

    asignados.push(nuevaAsignacion);
    localStorage.setItem("asignados", JSON.stringify(asignados));
    return true;
  };

  /**
   * Quita la asignación de un turno.
   * @param turnoId - ID del turno a desasignar.
   * @returns True si la eliminación fue exitosa, false en caso contrario.
   */
  const quitarAsignacion = async (turnoId: string): Promise<boolean> => {
    try {
      const asignados = getAsignados();
      const asignacion = asignados.find((a) => a.turnoId === turnoId);
      const turno = getTurnos().find((t) => t.id === turnoId);

      if (!asignacion || !turno) throw new Error("No se encontró la asignación o el turno");

      turno.estado = false;
      setTurnos(turno);
      return (await eliminarAsignacion(asignacion.id)) && (await cancelarTurno(turno.id));
    } catch (error) {
      console.error("Error al quitar asignación:", error);
      return false;
    }
  };

  /**
   * Elimina una asignación por ID.
   * @param asignacionId - ID de la asignación a eliminar.
   * @returns True si la eliminación fue exitosa, false en caso contrario.
   */
  const eliminarAsignacion = async (asignacionId: string): Promise<boolean> => {
    try {
      const asignados = getAsignados().filter((a) => a.id !== asignacionId);
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
    getAsignado,
    getAsignados,
    quitarAsignacion,
  };
}
