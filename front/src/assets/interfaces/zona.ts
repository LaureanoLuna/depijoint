export interface Zona {
  zonaId: string; // numero unico
  tipoZona: string; // Z  =tipo zona | C = combo
  codigoZona: string; //000192
  nombre: string; // cara
  descripcion: string; // Zona baja de la cara
  precio: number; // $193.50
  tiempo: Date; // 30 min
  deshabilitado: boolean; // falso;
  sexo: boolean; // true = es mujer; false = es hombre;
  tamañio: string; // C = chico | M  = medio | G = grande 
}
