import { useState, useEffect } from "react";
import { Zona } from "../interfaces/zona";
import { formatearCodigo } from "../function/funcionesZonas";
const useZonaAccion = () => {
  const [zonas, setZonas] = useState<Zona[]>([]);
  
  const cargarZonasDesdeLocalStorage = () => {
    const zonasGuardadas = localStorage.getItem("zonas");
    const zonasParseadas = zonasGuardadas ? JSON.parse(zonasGuardadas) : [];
    setZonas(zonasParseadas);
    return zonasParseadas;
  };
  const guardarZonasEnLocalStorage = (zonasActualizadas: Zona[]) => {
    localStorage.setItem("zonas", JSON.stringify(zonasActualizadas));
  };
  const getZonas = async (): Promise<Zona[]> => {
    return cargarZonasDesdeLocalStorage();
  };
  const getZona = async (id: number): Promise<Zona | undefined> => {
    const zona = zonas.find((z) => z.zonaId === id);
    if (!zona) {
      throw new Error("No se encontró la zona");
    }
    return zona;
  };
  const getZonaPorTipo = async (): Promise<Zona[]> => {
    const zonas = await getZonas();
    return zonas.filter((z) => z.tipo === "Z" && !z.deshabilitado);
  };
  const getNuevoCodigo = (tipo: string): string => {
    const codigo = zonas.filter((z) => z.tipo === tipo).reverse()[0];
    if (!codigo || !codigo.codigo || codigo.codigo.length < 2) {
      throw new Error("Código no encontrado o no válido.");
    }
    const x = Number(codigo.codigo.slice(2)) + 1;
    return formatearCodigo(x.toString());
  };
  const modificarZona = async (zonaId: number, habilitar: boolean): Promise<boolean> => {
    const indice = zonas.findIndex((f) => f.zonaId === zonaId);
    if (indice === -1) throw new Error('Zona no encontrada');
    
    const zonasActualizadas = [...zonas];
    zonasActualizadas[indice].deshabilitado = !habilitar;
    guardarZonasEnLocalStorage(zonasActualizadas);
    setZonas(zonasActualizadas);
    return true;
  };
  const agregarZona = async (data: Zona): Promise<boolean> => {
    if (!data) throw new Error("Datos requeridos");
    const z = zonas.find((y) => y.codigo === data.codigo && y.tipo === data.tipo);
    if (z) throw new Error("Código ya registrado");
    const nuevaZona: Zona = {
      ...data,
      codigo: data.codigo.trim(),
      zonaId: zonas.length + 1,
      deshabilitado: false,
    };
    const updatedZonas = [...zonas, nuevaZona];
    guardarZonasEnLocalStorage(updatedZonas);
    setZonas(updatedZonas);
    return true;
  };
  const deshabilitarZona = (zonaId: number): Promise<boolean> => modificarZona(zonaId, false);
  const habilitarZona = (zonaId: number): Promise<boolean> => modificarZona(zonaId, true);
  useEffect(() => {
    cargarZonasDesdeLocalStorage();
  }, []);
  return {
    zonas,
    getZonas,
    getZona,
    agregarZona,
    deshabilitarZona,
    getNuevoCodigo,
    getZonaPorTipo,
    habilitarZona,
  };
};
export default useZonaAccion;