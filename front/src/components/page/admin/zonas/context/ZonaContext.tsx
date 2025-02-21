import useZonaAccion from "@/assets/hooks/useZonaAccion";
import { Zona } from "@/assets/interfaces/zona";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
interface ZonaContextProps {
  z: Zona[];
  addZona: (zona: Zona) => void;
  deleteZona: (zonaId: number) => void;
}
const ZonaContext = createContext<ZonaContextProps | undefined>(undefined);

const ZonaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { getZonas, agregarZona, deshabilitarZona } = useZonaAccion();
  const [z, setZ] = useState<Zona[]>([]);

  const allZonas = async (): Promise<void> => {
    const x = await getZonas();
    if (!x) return;
    setZ(x);
  };

  const addZona = async (data: Zona): Promise<boolean> => {
    const success = await agregarZona(data);
    if (!success) {
      //getNotificacion("Error al agregar", "destructive");
      return false;
    }
    //getNotificacion("Se cargo correctamente", "sussess");
    await allZonas();

    return true;
  };

  const deleteZona = async (zonaId: number): Promise<void> => {
    try {
      const success = await deshabilitarZona(zonaId);
      if (!success) {
        throw new Error("No se deshabilito")
      }
      console.log("Se cargo");
      await allZonas();
    } catch (error) {
      console.error(error);      
    }
  };

  useEffect(() => {
    allZonas();
  }, []);

  return (
    <ZonaContext.Provider value={{ z, addZona, deleteZona }}>
      {children}
    </ZonaContext.Provider>
  );
};
export const useZonaContext = (): ZonaContextProps => {
  const context = useContext(ZonaContext);
  if (!context) {
    throw new Error("useZonaContext must be used within a ZonaProvider");
  }
  return context;
};
export { ZonaProvider }; // Asegúrate de exportar el provider
