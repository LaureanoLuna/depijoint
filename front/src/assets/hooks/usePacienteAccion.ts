import { Paciente } from "@/assets/interfaces/paciente";
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

  /**Funcion para cargar un nuevo Pacinete
   * @params objeto con los datos del formulario
   * @returns Un boolean, el cual indica que se cargo correctamente
   */

  const cargarPaciente = (data: Paciente) => {
    const pacienteNuevo = data;
    if (getPaciente(pacienteNuevo.dni)) return false;
    const pacientesRegistrados: Paciente[] = getPacientes();
    let pacienteId = pacientesRegistrados.length;
    pacienteNuevo.pacienteId = pacienteId;
    let tieneConcentimiento: boolean = pacienteNuevo.consentimiento
      ? true
      : false;
    pacienteNuevo.consentimiento.tiene = tieneConcentimiento;
    pacientesRegistrados.push(pacienteNuevo);
    localStorage.setItem('pacientes', JSON.stringify(pacientesRegistrados))
    return true;
  };

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
