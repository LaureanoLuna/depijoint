import { Zona } from "./zona";

export interface Contratacion {
  contratacionId: number;
  fechaContratacion: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado: boolean;
  descripcion?: string;
  pacienteDni: string;
  //precioTotal: number;
  tiempoSesion: number;
  zonas: Zona[];
}


