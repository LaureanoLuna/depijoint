import { Paciente } from "@/assets/interfaces/paciente";
import { PersonaSearch } from "@/assets/interfaces/persona";
import { useState } from "react";
import useContratacionAccion from "./useContratacionAccion";
import { Contratacion } from "../interfaces/contratacion";

export interface InputPacienteInterface extends Paciente {
  file?: File;
  // Se pueden agregar otras propiedades si es necesario
}

/**
 * Hook personalizado para gestionar las operaciones relacionadas con los pacientes,
 * incluyendo la búsqueda, carga, deshabilitación y habilitación.
 * 
 * @returns Un objeto con el paciente encontrado y las funciones necesarias para manipular pacientes.
 */
const usePacienteAccion = () => {
  // Estado local para almacenar el paciente encontrado
  const [paciente, setPaciente] = useState<Paciente | undefined>(undefined);
  const { getContrataciones } = useContratacionAccion();

  /**
   * Obtiene la lista de pacientes almacenados en el localStorage.
   * Puede filtrar los pacientes deshabilitados según el parámetro `estaDeshabilitado`.
   * 
   * @param estaDeshabilitado - Indica si se deben filtrar los pacientes deshabilitados. 
   * Por defecto es `false`.
   * @returns Un array de pacientes.
   */
  const getPacientes = (estaDeshabilitado: boolean = false): Paciente[] => {
    const pacientes = JSON.parse(localStorage.getItem("pacientes") || "[]");
    return estaDeshabilitado
      ? pacientes.filter((paciente:Paciente) => !paciente.deshabilitado)
      : pacientes;
  };

  /**
   * Busca un paciente por su DNI.
   * 
   * @param dni - El DNI del paciente a buscar.
   * @returns El paciente encontrado o undefined si no se encuentra.
   */
  const getPaciente = (dni: string): Paciente | undefined => {
    return getPacientes().find((paciente) => paciente.dni === dni);
  };

  /**
   * Carga un nuevo paciente en el localStorage.
   * Verifica si el paciente ya existe por su DNI antes de agregarlo.
   * 
   * @param data - Objeto con los datos del nuevo paciente.
   * @returns {boolean} - Indica si el paciente fue agregado correctamente.
   */
  const cargarPaciente = (data: InputPacienteInterface): boolean => {
    const { file, ...pacienteNuevo } = data;

    // Verificar si el paciente ya existe por su DNI
    if (getPaciente(pacienteNuevo.dni)) return false;

    const pacientesRegistrados = getPacientes();
    pacienteNuevo.pacienteId = asignarPacienteId(pacientesRegistrados.length);

    // Asignar consentimiento si se ha cargado un archivo
    pacienteNuevo.consentimiento.tiene = Boolean(file);
    //Asignar el estado del nuevo paciente
    pacienteNuevo.deshabilitado = false;

    // Agregar el nuevo paciente a la lista
    pacientesRegistrados.push(pacienteNuevo as Paciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientesRegistrados));

    return true;
  };

  /**
   * Asigna un ID único a un paciente en base a la longitud actual de la lista de pacientes.
   * 
   * @param length - Longitud actual de la lista de pacientes.
   * @returns El nuevo ID para el paciente.
   */
  const asignarPacienteId = (length: number): number => {
    return length; // Se puede modificar para generar IDs únicos si es necesario
  };

  /**
   * Busca un paciente por su DNI de manera asíncrona.
   * 
   * @param dni - Objeto que contiene el DNI del paciente a buscar.
   * @returns {Promise<void>} - Promesa que resuelve cuando se encuentra el paciente.
   */
  const buscaPaciente = async (dni: PersonaSearch): Promise<void> => {
    const pacientes = getPacientes();
    const pacienteEncontrado = pacientes.find(
      (paciente) => paciente.dni === dni.dni
    );

    setPaciente(pacienteEncontrado || undefined);
  };

  /**
   * Obtiene las contrataciones asociadas a un paciente específico.
   * 
   * @param pacienteId - ID del paciente para buscar sus contrataciones.
   * @returns Un array de contrataciones asociadas al paciente.
   */
  const getContratacionesPaciente = (pacienteId: string): Contratacion[] => {
    return getContrataciones().filter(
      (contratacion) => contratacion.pacienteDni === pacienteId
    );
  };

  /**
   * Deshabilita un paciente en la lista de pacientes.
   * 
   * @param dniPaciente - DNI del paciente a deshabilitar.
   * @returns {boolean} - Indica si el paciente fue deshabilitado correctamente.
   */
  const deshabilitarPaciente = async (dniPaciente: string): Promise<boolean> => {
    const pacientes = getPacientes();
    const pacienteIndex = pacientes.findIndex((p) => p.dni === dniPaciente);

    if (pacienteIndex === -1) return false; // Si no se encuentra el paciente, retorna false

    // Deshabilitar el paciente encontrado
    pacientes[pacienteIndex].deshabilitado = true;

    // Actualizar la lista de pacientes en el localStorage
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    return true;
  };

  /**
   * Habilita un paciente que previamente estaba deshabilitado.
   * 
   * @param dniPaciente - DNI del paciente a habilitar.
   * @returns {boolean} - Indica si el paciente fue habilitado correctamente.
   */
  const habilitarPaciente = async (dniPaciente: string): Promise<boolean> => {
    const pacientes = getPacientes();
    const pacienteIndex = pacientes.findIndex((p) => p.dni === dniPaciente);

    if (pacienteIndex === -1) return false; // Si no se encuentra el paciente, retorna false

    // Habilitar el paciente encontrado
    pacientes[pacienteIndex].deshabilitado = false;

    // Actualizar la lista de pacientes en el localStorage
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    return true;
  };

  // Retorna los datos y las funciones relacionadas con los pacientes
  return {
    paciente,
    buscaPaciente,
    getPacientes,
    getPaciente,
    cargarPaciente,
    getContratacionesPaciente,
    deshabilitarPaciente,
    habilitarPaciente
  };
};

export default usePacienteAccion;
