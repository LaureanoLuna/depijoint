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

  /**
   * Busca un paciente por su DNI.
   * @param dni - Objeto que contiene el DNI del paciente a buscar.
   * @returns Una promesa que resuelve cuando se encuentra el paciente.
   */
  const buscaPaciente = async (dni: PersonaSearch): Promise<void> => {
    const localStorageP: Paciente[] = JSON.parse(localStorage.getItem("pacientes") || "[]");

    // Busca el paciente en la lista usando el DNI
    const pac = localStorageP.find((paciente) => paciente.dni === dni.dni);

    // Si no se encuentra el paciente, se sale de la función
    if (!pac) setPaciente(undefined);

    // Actualiza el estado con el paciente encontrado
    setPaciente(pac);
  };

  /**
 * Obtiene un paciente a partir de su DNI.
 * 
 * @param dni - El DNI del paciente que se desea buscar.
 * @returns Una promesa que resuelve a un objeto Paciente o undefined si no se encuentra.
 */
const getPaciente = async (dni: string): Promise<Paciente | undefined> => {
  // Recuperar la lista de pacientes del localStorage
  const pacientesJson = localStorage.getItem("pacientes") || "[]";
  const pacientes: Paciente[] = JSON.parse(pacientesJson);

  // Buscar el paciente por su DNI
  const paciente = pacientes.find((p: Paciente) => p.dni === dni);
  
  return paciente; // Retornar el paciente encontrado o undefined si no se encuentra
};


  // Retorna el paciente y la función de búsqueda
  return { paciente, buscaPaciente, getPaciente };
};

export default usePacienteAccion;