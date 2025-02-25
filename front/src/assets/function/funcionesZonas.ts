import { Zona } from "../interfaces/zona";

export function formatearCodigo(codigo: string): string {
    // Convierte el código a un número para eliminar ceros a la izquierda existentes
    const numeroCodigo = Number(codigo);
    
    // Convierte de nuevo a string y usa padStart para rellenar con ceros a la izquierda
    const codigoFormateado = numeroCodigo.toString().padStart(6, '0');
    
    return codigoFormateado;
}

/**
 * Funcion que calculara la suma de los tiempos que tienen las Zonas pasadas por parametro
 * el objetivo es usarlo tanto para los combos como para los contratos de tratamientos realizados
 * 
 * @param zonas 
 * @return 
 */
export function calcularTiempo(zonas:Zona[]) {
    return zonas.reduce((total,zona:Zona ) => total + Number(zona.tiempo),0)
}

/**
 * Funcion que calculara la suma de los precios que tienen las Zonas pasadas por parametro
 * El objetivo es usarlo tanto para los combos como para los contratos de tratamientos realizados
 * 
 * @param zonas 
 * @return 
 */
export function calcularPrecio(zonas:Zona[]) {    
    return zonas.reduce((total,zona:Zona ) => total + Number(zona.precio),0)
}