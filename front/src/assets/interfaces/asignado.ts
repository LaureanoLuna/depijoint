export interface Asignado {
  id: string;
  turnoId: string;
  nombre :string;
  colaboradorId: string;
  hora:string;
  tiempo:string,
  fechaAlta: Date;
  fechaBaja: Date | null;
  estado: boolean;
}
