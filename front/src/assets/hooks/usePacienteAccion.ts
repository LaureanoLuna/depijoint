import { Paciente } from "@/assets/interfaces/paciente";
import { PersonaSearch } from "@/assets/interfaces/persona";
import { useState } from "react";
import useContratacionAccion from "./useContratacionAccion";
import { Contratacion } from "../interfaces/contratacion";

export interface InputPacienteInterface extends Paciente {
  file?: File;
  // Agrega aquí otras propiedades del paciente según sea necesario
}
/**
 * Hook personalizado para manejar la búsqueda y gestión de pacientes.
 * @returns Un objeto que contiene el paciente encontrado y las funciones para buscar y cargar pacientes.
 */
const usePacienteAccion = () => {
  // Estado para almacenar el paciente encontrado
  const [paciente, setPaciente] = useState<Paciente | undefined>(undefined);
  const { getContrataciones } = useContratacionAccion();

  /**
   * Obtiene la lista de pacientes almacenados en localStorage.
   * @returns Un array de pacientes.
   */
  const getPacientes = (): Paciente[] => {
    const localStorageP: Paciente[] = JSON.parse(
      localStorage.getItem("pacientes") || "[]"
    );
    return localStorageP;
  };

  /**
   * Busca un paciente por su DNI.
   * @param dni - El DNI del paciente a buscar.
   * @returns El paciente encontrado o undefined si no se encuentra.
   */
  const getPaciente = (dni: string): Paciente | undefined => {
    return getPacientes().find((p: Paciente) => p.dni === dni);
  };

  /**
   * Carga un nuevo paciente en el almacenamiento local.
   * @param data - Objeto con los datos del nuevo paciente.
   * @returns {boolean} - Indica si se cargó correctamente.
   */
  const cargarPaciente = (data: InputPacienteInterface): boolean => {
    
    const { file, ...pacienteNuevo } = data;

    // Verificar si el paciente ya existe
    if (getPaciente(pacienteNuevo.dni)) return false;

    const pacientesRegistrados: Paciente[] = getPacientes();
    pacienteNuevo.pacienteId = asignarPacienteId(pacientesRegistrados.length);

    // Asignar consentimiento
    pacienteNuevo.consentimiento.tiene = Boolean(file);
    console.log(pacienteNuevo);

    // Agregar nuevo paciente a la lista
    pacientesRegistrados.push(pacienteNuevo as Paciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientesRegistrados));
    return true;
  };

  /**
   * Asigna un ID único al paciente.
   * @param length - Longitud actual de la lista de pacientes.
   * @returns Nuevo ID para el paciente.
   */
  const asignarPacienteId = (length: number): number => length;

  /**
   * Busca un paciente por su DNI.
   * @param dni - Objeto que contiene el DNI del paciente a buscar.
   * @returns Una promesa que resuelve cuando se encuentra el paciente.
   */
  const buscaPaciente = async (dni: PersonaSearch): Promise<void> => {
    const localStorageP: Paciente[] = getPacientes();

    // Busca el paciente en la lista usando el DNI
    const pac = localStorageP.find((paciente) => paciente.dni === dni.dni);

    // Actualiza el estado con el paciente encontrado o undefined
    setPaciente(pac || undefined);
  };

  /**
   * Obtiene las contrataciones asociadas a un paciente específico.
   * @param pacienteId - ID del paciente para buscar sus contrataciones.
   * @returns Un array de contrataciones asociadas al paciente.
   */
  const getContratacionesPaciente = (pacienteId: any): Contratacion[] => {
    return getContrataciones().filter(
      (c: Contratacion) => c.pacienteDni === pacienteId
    );
  };

  // Retorna el paciente y las funciones de búsqueda y carga
  return {
    paciente,
    buscaPaciente,
    getPacientes,
    getPaciente,
    cargarPaciente,
    getContratacionesPaciente,
  };
};

export default usePacienteAccion;
