export interface Persona {
    personaId?: number;
    nombre: string;
    apellido: string;
    dni: string;
    telefono?: string; // Considera agregar validación del formato
    email?: string; // Considera agregar validación del formato
}