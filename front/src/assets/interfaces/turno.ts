import { Paciente } from "./paciente";

export interface TurnoData {
    id: string;
    paciente: Paciente;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean;
}