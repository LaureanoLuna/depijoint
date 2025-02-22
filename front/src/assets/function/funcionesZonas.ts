export function formatearCodigo(codigo: string): string {
    // Convierte el código a un número para eliminar ceros a la izquierda existentes
    const numeroCodigo = Number(codigo);
    
    // Convierte de nuevo a string y usa padStart para rellenar con ceros a la izquierda
    const codigoFormateado = numeroCodigo.toString().padStart(6, '0');
    
    return codigoFormateado;
}
