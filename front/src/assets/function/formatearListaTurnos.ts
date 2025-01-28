import { TurnoInterface, TurnoLista } from "../interfaces/turno";

export function formatearListaTurnos(turnos: TurnoInterface[]): TurnoLista[] {
    const arr: TurnoLista[] = []; // Inicializa un array para almacenar los turnos formateados

    turnos.forEach((turno: TurnoInterface) => {
        const listaTurno: TurnoLista = {
            id: turno.id,
            dia: turno.dia,
            hora: turno.hora,
            duracion: turno.duracion,
            estado: turno.estado,
            nombre: turno.paciente.nombre,
            dni: turno.paciente.dni,
            consentimiento: turno.paciente.consentimiento.tiene
        };
        arr.push(listaTurno); // Agrega el turno formateado al array
    });

    return arr; // Devuelve el array de turnos formateados
}