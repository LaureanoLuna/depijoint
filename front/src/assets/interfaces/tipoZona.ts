export interface TipoZona {
  tipoZonaId: number;
  tipo: string;
  descripcion: string;
  deshabilitado: boolean;
}

//export interface TipoZonaLista extends Omit<TipoZona, "deshabilitado">{}
export interface TipoZonaLista extends Pick<TipoZona,'tipo'>{}
