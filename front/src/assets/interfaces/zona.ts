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
  zonaId: number; // identificador unico 
  tipo: string; // identificador del tipo de zona // "C" = combo, "Z" = simple
  codigo: string; // codigo de la zona identificatorio para el usuario y unico
  nombre: string; // nombre de la zona
  descripcion: string; // descripcion de la zona
  precio: number; // precio de la zona
  tiempo: number; // tiempo de la zona
  deshabilitado: boolean; // si la zona esta deshabilitada
  sexo: "M" | "H"; // sexo de a la cual corresponde 
  tamaño: string; // tamaño de la zona a cubrir
  zonaPadreId?: string; // id de la zona padre, si codigo de la zona es un combo, los items contendran el cogido identificador del combo 
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
