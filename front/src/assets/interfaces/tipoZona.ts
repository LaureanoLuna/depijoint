export interface TipoZona {
  tipoZonaId: number;
  tipoZona: string;
  descripcion: string;
  deshabilitado: boolean;
}

export interface TipoZonaLista extends Omit<TipoZona, "deshabilitado">{}
