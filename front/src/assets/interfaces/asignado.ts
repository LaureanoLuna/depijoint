export interface Asignado {
  id: string;
  turnoId: string;
  dia:string;
  nombre :string;
  dni:string;
  colaboradorId: string;
  hora:string;
  tiempo:string,
  fechaAlta: Date;
  fechaBaja: Date | null;
  estado: boolean;
}
