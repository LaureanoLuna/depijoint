import { TipoZona } from "./tipoZona";

export interface CreateZonaDto {
  tipoZona: TipoZona;
  codigoZona: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tiempo: number;
  sexo: "M" | "H";
  tamaño: string;
  zonaPadreId?: string;
}

export interface Zona {
  zonaId: number;
  tipoZona: TipoZona;
  codigoZona: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tiempo: number;
  deshabilitado: boolean;
  sexo: "M" | "H";
  tamaño: string;
  zonaPadreId?: number;
}

export interface UpdateZonaDto {
  zonaId?: number;
  tipoZona?: TipoZona;
  codigoZona?: string;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  tiempo?: number;
  deshabilitado?: boolean;
  sexo?: "M" | "H";
  tamaño?: string;
  zonaPadreId?: string;
}

export interface DeleteZonaDto {
  zonaId: number;
}
