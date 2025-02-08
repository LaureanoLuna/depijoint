
export interface Usuario {
    id: string;
    nombre:string;
    usuario: string;
    clave: string;
    token: string;
    fechaAlta: Date;
}

export interface LoginUsuario {
    usuario: string;
    clave: string;
}