import { Paciente } from "./paciente";

export interface TurnoInterface {
    id: string;
    paciente: Paciente;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean;
}

export interface TurnoAdd {
    paciente: Paciente;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean ;
}