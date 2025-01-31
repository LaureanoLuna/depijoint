import { TipoZona } from "./tipoZona";

export interface Zona {
  zonaId: number; // numero unico
  tipoZona: TipoZona; // Z  =tipo zona | C = combo
  codigoZona: string; //000192
  nombre: string; // cara
  descripcion: string; // Zona baja de la cara
  precio: number; // $193.50
  tiempo: number; // 30 min
  deshabilitado: boolean; // falso;
  sexo: string; // true = es mujer; false = es hombre;
  tamaño: string; // C = chico | M  = medio | G = grande
}
