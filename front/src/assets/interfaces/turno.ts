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
    dni: string;
    dia: string;
    hora: string;
    duracion: string;
    estado: boolean;
}

export interface Turno {
    id: string; // ID del turno
    dia: string; // Día del turno (por ejemplo, '2023-10-30')
    hora: string; // Hora del turno (por ejemplo, '14:30')
    duracion: string; // Tiempo en minutos (duración del turno)
    precio: number; // Precio de la sesion
    contratacion_id: number; // ID de la contratación asociada
    paciente_dni: number; // ID del paciente
    paciente_nombre: string;
    paciente:Paciente,
    estado: boolean; // ID del estado del turno
    colaborador_id?: number; // ID del colaborador asignado
    observaciones?: string; // Observaciones adicionales (opcional)
    fecha_creacion: Date; // Fecha de creación del turno (por ejemplo, '2023-10-30T12:00:00Z')
    fecha_actualizacion?: Date; // Fecha de la última actualización del turno
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