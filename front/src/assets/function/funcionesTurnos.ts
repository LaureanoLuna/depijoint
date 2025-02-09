import { Turno, TurnoInterface, TurnoLista } from "../interfaces/turno";

const tiempoEnMinutos = (tiempo: string): number => {
  let [h, m] = tiempo.split(":").map(Number);
  return h * 60 + m;
};

export const estaDisponible = (
  nuevoTurno: string,
  duracion: number,
  turnos: TurnoInterface[] | TurnoLista[] | Turno[]
): boolean => {
  let bool = true;
  let turnoNuevoInicio = tiempoEnMinutos(nuevoTurno);
  let turnoNuevoFin = turnoNuevoInicio + duracion;

  turnos.forEach((turno: TurnoInterface | TurnoLista | Turno) => {
    let turnoAgendadoInicio = tiempoEnMinutos(turno.hora);
    let turnoAgendadoFin =
      turnoAgendadoInicio + Number.parseInt(turno.duracion);

    if (
      (turnoNuevoInicio >= turnoAgendadoInicio &&
        turnoNuevoInicio < turnoAgendadoFin) ||
      (turnoNuevoFin > turnoAgendadoInicio &&
        turnoNuevoFin <= turnoAgendadoFin) ||
      (turnoNuevoInicio <= turnoAgendadoInicio &&
        turnoNuevoFin >= turnoAgendadoFin)
    ) {
      bool = false;
    }
  });
  return bool;
};

export const refactoriDate = (date: Date): string => {
  if (!date) return "2000-01-01";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
