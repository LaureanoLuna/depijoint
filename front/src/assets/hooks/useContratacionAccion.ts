import { useState } from "react";
import { Contratacion } from "../interfaces/contratacion";
import { Zona } from "../interfaces/zona";

const useContratacionAccion = () => {
  // Estado para almacenar la contratacion seleccionada
  const [contratacion, setContratacion] = useState<Contratacion | undefined>(undefined);

  // Función para establecer la contratacion
  const setContratacionAccion = (contratacion: Contratacion) => {
    setContratacion(contratacion);
  };

  const getContratacion = async (dni: string): Promise<Contratacion | undefined> => {
    const contratacionJson = localStorage.getItem("contrataciones") || "[]";
    const contrataciones: Contratacion[] = JSON.parse(contratacionJson);

    const contratacion = contrataciones.find((c: Contratacion) => c.pacienteDni === dni);

    return contratacion;
  }

  // Función para buscar una contratacion por DNI
  const searchContratacion = (dni: string): void => {
    const contratacionesLocalStorage: Contratacion[] = JSON.parse(
      localStorage.getItem("contrataciones") || "[]"
    );

    // Buscar la contratacion que coincide con el DNI
    const contratacionFind = contratacionesLocalStorage.find(
      (x) => x.pacienteDni === dni
    );

    // Establecer la contratacion encontrada o undefined si no se encuentra
    setContratacion(contratacionFind || undefined);
  };

  // Función para calcular el tiempo total de sesiones de un paciente
  const calcularTiempoSesion = async (pacienteID: string | undefined): Promise<number | undefined> => {
    if (!pacienteID) return;

    const contrataciones: Contratacion[] = JSON.parse(
      localStorage.getItem("contrataciones") || "[]"
    );

    // Buscar la contratacion correspondiente al pacienteID
    const contratacion: Contratacion | undefined = contrataciones.find(
      (x: Contratacion) => x.pacienteDni === pacienteID
    );

    // Si no se encuentra la contratacion, retornar undefined
    if (!contratacion) return;

    // Calcular la suma del tiempo de todas las zonas
    const suma: number = contratacion.zonas.reduce(
      (total, zona: Zona) => total + zona.tiempo,
      0
    );

    return suma;
  };



  // Función para calcular el precio total de sesiones de un paciente
  const calcularPrecioSesion = async (pacienteID: string | undefined): Promise<string | undefined> => {
    if (!pacienteID) return;

    const contrataciones: Contratacion[] = JSON.parse(
      localStorage.getItem("contrataciones") || "[]"
    );

    // Buscar la contratacion correspondiente al pacienteID
    const contratacion: Contratacion | undefined = contrataciones.find(
      (x: Contratacion) => x.pacienteDni === pacienteID
    );

    // Si no se encuentra la contratacion, retornar undefined
    if (!contratacion) return;

    // Calcular la suma del precio de todas las zonas
    const suma: number = contratacion.zonas.reduce(
      (total, zona: Zona) => total + zona.precio,
      0
    );

    // Retornar el precio promedio (dividido por 6)
    return (suma / 6).toFixed(2);
  };

  return {
    contratacion,
    setContratacionAccion,
    searchContratacion,
    calcularTiempoSesion,
    calcularPrecioSesion,
    getContratacion
  };
};

export default useContratacionAccion;