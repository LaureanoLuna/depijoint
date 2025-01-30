import { useState, useEffect } from "react";
import { TurnoInterface, TurnoLista } from "../interfaces/turno";
//import { LIST_TURNOS } from "../constant/LIST_TURNOS"; // Asegúrate de que LIST_TURNOS se use correctamente
import { formatearListaTurnos } from "../function/formatearListaTurnos";

/**
 * Hook para filtrar turnos por fecha.
 * @param {Date} fecha - Fecha para filtrar los turnos.
 * @returns {Object} - Objeto con los turnos filtrados y la función para formatear fechas.
 */
function useDateFilter({ fecha = new Date() }: { fecha?: Date }) {
  const [filteredTurnos, setFilteredTurnos] = useState<TurnoLista[]>([]);

  /**
   * Filtra los turnos basados en la fecha proporcionada.
   * @param {TurnoInterface[]} turnos - Lista de turnos a filtrar.
   * @param {Date} fecha - Fecha para filtrar los turnos.
   * @returns {TurnoInterface[]} - Lista de turnos filtrados.
   */
  const dateFilter = (turnos: TurnoInterface[], fecha: Date) => {
    const dia = refactoriDate(fecha);
    return turnos.filter((turno) => turno.dia === dia);
  };

  /**
   * Formatea la fecha en el formato 'YYYY-MM-DD'.
   * @param {Date} date - Fecha a formatear.
   * @returns {string} - Fecha formateada.
   */
  const refactoriDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const turnosDesdeLocalStorage = JSON.parse(localStorage.getItem("turnos") || "[]");
    const turnosFiltrados = dateFilter(turnosDesdeLocalStorage, fecha);
    setFilteredTurnos(formatearListaTurnos(turnosFiltrados));
  }, [fecha]);

  return { filteredTurnos, refactoriDate };
}

export default useDateFilter;