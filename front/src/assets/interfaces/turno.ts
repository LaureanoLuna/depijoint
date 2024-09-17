import { PacienteDate } from "./paciente";

export interface TurnoData {
    id?: string;
    paciente: PacienteDate;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean;
}

export interface TurnoAdd {
    paciente: PacienteDate;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean ;
}