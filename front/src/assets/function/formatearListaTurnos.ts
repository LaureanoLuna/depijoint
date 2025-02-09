import { Paciente, PacienteSelect } from "../interfaces/paciente";
import { Turno, TurnoInterface, TurnoLista } from "../interfaces/turno";

export function formatearListaTurnos(turnos: Turno[]): TurnoLista[] {
  const arr: TurnoLista[] = []; // Inicializa un array para almacenar los turnos formateados

  turnos.forEach((turno: Turno) => {
    const listaTurno: TurnoLista = {
      id: turno.id,
      dia: turno.dia,
      hora: turno.hora,
      duracion: turno.duracion,
      estado: turno.estado,
      nombre: turno.nombre,
      dni: turno.dni,
      consentimiento: true//turno.paciente?.consentimiento.tiene,
    };
    arr.push(listaTurno); // Agrega el turno formateado al array
  });

  return arr; // Devuelve el array de turnos formateados
}

export function listaPacienteReducida(pacientes: Paciente[]): PacienteSelect[] {
  const arr: PacienteSelect[] = [];

  pacientes.forEach((paciente: Paciente) => {
    const listapaciente: PacienteSelect = {
      pacienteId: paciente.pacienteId,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      dni: paciente.dni,
      email: paciente.email,
      telefono: paciente.telefono,
    };
    arr.push(listapaciente);
  });
  return arr;
}
