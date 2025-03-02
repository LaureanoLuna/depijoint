import { useState } from "react";
import { Tratamiento } from "../interfaces/contratacion";
import { Zona } from "../interfaces/zona";
import { calcularTiempo } from "../function/funcionesZonas";
import useZonaAccion from "./useZonaAccion";

const useContratacionAccion = () => {
  // Estado para almacenar la contratacion seleccionada
  const [contratacion, setContratacion] = useState<Tratamiento | undefined>(
    undefined
  );
  const {getZonas} = useZonaAccion()

  // Función para establecer la contratacion
  const setContratacionAccion = (contratacion: Tratamiento) => {
    setContratacion(contratacion);
  };

  const getContrataciones = (): Tratamiento[] => {
    const contrataciones: Tratamiento[] = JSON.parse(
      localStorage.getItem("tratamientos") || "[]"
    );
    return contrataciones;
  };

  const getContratacion = (dni: string): Tratamiento | undefined => {
    const contratacion = getContrataciones().find(
      (c: Tratamiento) => c.pacienteDni === dni && c.estado === false
    );

    if (!contratacion) return undefined;

    return contratacion;
  };

  // Función para buscar una contratacion por DNI
  const searchContratacion = (dni: string): void => {
    const contratacionesLocalStorage: Tratamiento[] = JSON.parse(
      localStorage.getItem("tratamientos") || "[]"
    );

    // Buscar la contratacion que coincide con el DNI
    const contratacionFind = contratacionesLocalStorage.find(
      (x) => x.pacienteDni === dni && x.estado === false
    );

    // Establecer la contratacion encontrada o undefined si no se encuentra
    setContratacion(contratacionFind || undefined);
  };

  const itemsTratamiento = async (dniPaciente: string): Promise<Zona[]> => {
    const tratamiento = await getContratacion(dniPaciente);
    if (!tratamiento) return []; // Si no hay tratamiento, devuelve un array vacío
    const zonas = await getZonas(); // Obtén todas las zonas disponibles
    // Filtra las zonas de tratamiento que están disponibles
    const zonasFiltradas: Zona[] = tratamiento.zonas.filter((z) =>
        zonas.some((zona) => zona.zonaId === z.zonaId)
    );
    // Mapea las zonas filtradas y maneja la lógica para zonas de tipo "C"
    const zonasResultantes = await Promise.all(zonasFiltradas.map(async (y) => {
        if (y.tipo === "C") {
            const zonasHijasIds = JSON.parse(y.zonaPadreId || "[]"); // Obtén los IDs de las zonas hijas
            const zonasHijas = await Promise.all(zonasHijasIds.map(async (id:number) => {
                const zonaHija = zonas.find(z => z.zonaId === id); // Busca la zona hija en las zonas disponibles
                return zonaHija; // Devuelve la zona hija encontrada
            }));
            return zonasHijas.filter(Boolean); // Filtra las zonas hijas que no son undefined
        }
        return y; // Devuelve la zona tal como está si no es de tipo "C"
    }));
    // Aplana el array resultante en caso de que haya zonas hijas
    return zonasResultantes.flat().filter(Boolean); // Filtra valores undefined
};

  // Función para calcular el tiempo total de sesiones de un paciente
  const calcularTiempoSesion = async (
    pacienteID: string | undefined
  ): Promise<number | undefined> => {
    if (!pacienteID) return;

    const contrataciones: Tratamiento[] = JSON.parse(
      localStorage.getItem("tratamientos") || "[]"
    );

    // Buscar la contratacion correspondiente al pacienteID
    const contratacion: Tratamiento | undefined = contrataciones.find(
      (x: Tratamiento) => x.pacienteDni === pacienteID
    );

    // Si no se encuentra la contratacion, retornar undefined
    if (!contratacion) return;

    // Calcular la suma del tiempo de todas las zonas
    const suma: number = calcularTiempo(contratacion.zonas);

    return suma;
  };



  // Función para calcular el precio total de sesiones de un paciente
  const calcularPrecioSesion = async (
    pacienteID: string | undefined
  ): Promise<number | undefined> => {
    if (!pacienteID) return;

    const contrataciones: Tratamiento[] = JSON.parse(
      localStorage.getItem("tratamientos") || "[]"
    );

    // Buscar la contratacion correspondiente al pacienteID
    const contratacion: Tratamiento | undefined = contrataciones.find(
      (x: Tratamiento) => x.pacienteDni === pacienteID
    );

    // Si no se encuentra la contratacion, retornar undefined
    if (!contratacion) return;

    // Calcular la suma del precio de todas las zonas
    const suma: number = contratacion.zonas.reduce(
      (total, zona: Zona) => total + zona.precio,
      0
    );

    // Retornar el precio promedio (dividido por 6)
    return Number.parseFloat((suma / 6).toFixed(2));
  };

  return {
    contratacion,
    setContratacionAccion,
    searchContratacion,
    calcularTiempoSesion,
    calcularPrecioSesion,
    getContratacion,
    getContrataciones,
    itemsTratamiento
  };
};

export default useContratacionAccion;
