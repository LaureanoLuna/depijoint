import { Consentimiento, Paciente } from "@/assets/interfaces/paciente";
import { PersonaSearch } from "@/assets/interfaces/persona";
import { useState } from "react";

/**
 * Hook personalizado para manejar la búsqueda de pacientes.
 * @returns Un objeto que contiene el paciente encontrado y la función para buscar un paciente.
 */
const usePacienteAccion = () => {
  // Estado para almacenar el paciente encontrado
  const [paciente, setPaciente] = useState<Paciente | undefined>(undefined);


  const getPacientes = () => {
    const localStorageP: Paciente[] = JSON.parse(
      localStorage.getItem("pacientes") || "[]"
    );
    return localStorageP;
  };

  /*  */
  const getPaciente = (dni: string) => {
    const paciente = getPacientes().find((p: Paciente) => p.dni === dni);
    if (!paciente) return undefined;
    return paciente;
  };


  interface inputPaciente extends Paciente {
    file?: File;
    // Agrega aquí otras propiedades del paciente según sea necesario
  }

  /**
   * Función para cargar un nuevo Paciente
   * @params {Paciente} data - Objeto con los datos del formulario
   * @returns {boolean} - Indica si se cargó correctamente
   */
  const cargarPaciente = (data: inputPaciente): boolean => {
    const { dni, file, ...pacienteNuevo } = data;

    // Verificar si el paciente ya existe
    if (getPaciente(dni)) return false;

    const pacientesRegistrados: Paciente[] = getPacientes();
    pacienteNuevo.pacienteId = asignarPacienteId(pacientesRegistrados.length);

    // Asignar consentimiento
    pacienteNuevo.consentimiento.tiene = Boolean(file);

    // Agregar nuevo paciente a la lista
    pacientesRegistrados.push(pacienteNuevo as Paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientesRegistrados));

    return true;
  };


  /**
   * Asigna un ID único al paciente
   * @param {number} length - Longitud actual de la lista de pacientes
   * @returns {number} - Nuevo ID para el paciente
   */
  const asignarPacienteId = (length: number): number => length;

  /**
   * Busca un paciente por su DNI.
   * @param dni - Objeto que contiene el DNI del paciente a buscar.
   * @returns Una promesa que resuelve cuando se encuentra el paciente.
   */
  const buscaPaciente = async (dni: PersonaSearch): Promise<void> => {
    const localStorageP: Paciente[] = JSON.parse(
      localStorage.getItem("pacientes") || "[]"
    );

    // Busca el paciente en la lista usando el DNI
    const pac = localStorageP.find((paciente) => paciente.dni === dni.dni);

    // Si no se encuentra el paciente, se sale de la función
    if (!pac) setPaciente(undefined);

    // Actualiza el estado con el paciente encontrado
    setPaciente(pac);
  };

  // Retorna el paciente y la función de búsqueda
  return { paciente, buscaPaciente, getPacientes, getPaciente, cargarPaciente };
};

export default usePacienteAccion;
