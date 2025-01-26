import { Persona } from "./persona";

export interface Colaborador extends Persona {
  colaboradorId: number; // Cambiado a un formato más consistente
  usuario: string;
  clave: string; // Considera agregar validación de seguridad
}
