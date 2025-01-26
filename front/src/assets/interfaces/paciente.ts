import { Persona } from "./persona";
export interface Consentimiento {
  tiene: boolean;
  archivo?: string; // Opcional, si no siempre hay un archivo
}
export interface Paciente extends Persona {
  pacienteId: number; // Cambiado a un formato más consistente
  direccion?: string; // Opcional, si no siempre se proporciona
  fechaNac: Date; // Asegúrate de validar que sea una fecha válida
  consentimiento: Consentimiento;
}
