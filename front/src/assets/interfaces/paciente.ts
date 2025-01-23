
export interface Paciente {
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    email: string;
    direccion: string;
    fechaNac: Date;
    consentimiento: { tiene: boolean, archivo?: string }
}

