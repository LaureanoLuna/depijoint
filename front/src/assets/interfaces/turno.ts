import { Paciente } from "./paciente";

export interface TurnoInterface {
    id: string;
    paciente: Paciente;
    dia: string;
    hora: string;
    duracion: string;
    monto?: number;
    tiempo?: number;
    estado: boolean;
}

export interface TurnoAdd {
    paciente: Paciente;
    dni: string;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean;
}

export interface TurnoLista {
    id: string;
    nombre: string;
    dni: string;
    consentimiento: boolean;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean;
}