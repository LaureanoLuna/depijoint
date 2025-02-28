import useNotificacionAccion from "@/assets/hooks/useNotificacionAccion";
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
  handleEstadoZona: (zonaId: number, tipo:'habilita' | 'deshabilita') => void;
  handleConDeshabilitado: any;
  conDesabilitado: boolean;
  updateZona: (zona:Zona) => void;
}
const ZonaContext = createContext<ZonaContextProps | undefined>(undefined);

const ZonaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { getZonas, agregarZona, deshabilitarZona, habilitarZona,actualizarZona } =
    useZonaAccion();
  const {getNotificacion} = useNotificacionAccion()
  const [conDesabilitado, setConDesabilitado] = useState<boolean>(true);
  const [z, setZ] = useState<Zona[]>([]);

  const allZonas = async (): Promise<void> => {
    const x = await getZonas();
    if (!x) return;
    if (conDesabilitado) {
      const sinDeshabilitado = x.filter((z) => {
        return z.deshabilitado === false;
      });
      setZ(sinDeshabilitado);
    } else {
      setZ(x);
    }
  };

  const handleConDeshabilitado = () => {
    setConDesabilitado(!conDesabilitado);
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

  const handleEstadoZona = async (
    zonaId: number,
    tipo: "habilita" | "deshabilita"
  ): Promise<void> => {
    let bool = false;
    try {
      if (tipo === "deshabilita") {
         bool = await deshabilitarZona(zonaId);
      } else {
         bool = await habilitarZona(zonaId);
      }

      if (!bool) {
        throw new Error("No se deshabilito");
      }
      console.log("Se cargo");
      await allZonas();
    } catch (error) {
      console.error(error);
    }
  };

  const updateZona = async (data:Zona): Promise<void> =>{
    const success = await actualizarZona(data);
    if(success){
      await allZonas();
    }
  }

  useEffect(() => {
    allZonas();
  }, [conDesabilitado]);

  return (
    <ZonaContext.Provider
      value={{
        z,
        addZona,
        handleEstadoZona,
        handleConDeshabilitado,
        conDesabilitado,
        updateZona
      }}
    >
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
