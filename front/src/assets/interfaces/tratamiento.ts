import TratamientoItems from "./tratamientoItems";
export interface Tratamiento {
  id: number;
  fechaContratacion: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado: boolean;
  descripcion?: string;
  pacienteDni: string;
  zonas: TratamientoItems[];
}


