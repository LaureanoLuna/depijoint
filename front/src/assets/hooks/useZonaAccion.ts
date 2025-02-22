import { useState, useEffect } from "react";
import { Zona } from "../interfaces/zona";
import { formatearCodigo } from "../function/funcionesZonas";

const useZonaAccion = () => {
  const [zonas, setZonas] = useState<Zona[]>([]);
  /*  const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null); */

  
  const getZonas = async (): Promise<Zona[] | undefined> => {
    const x: Zona[] = localStorage.getItem("zonas")
      ? JSON.parse(localStorage.getItem("zonas") || "[]")
      : [];
    setZonas(x);
    return x;
  };

  const getZona = async (id: number): Promise<Zona | undefined> => {
    try {
      const zona = zonas.find((z) => z.zonaId === id) || undefined;
      if (!zona) {
        throw new Error("No se encontro la zona");
      }
      return zona;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const getNuevoCodigo = (tipo: string): string => {
    console.log(tipo);
    
    const codigo = zonas.filter((z) => z.tipoId === tipo).reverse()[0];
    
    if (!codigo || !codigo.codigo || codigo.codigo.length < 2) {
      throw new Error("Código no encontrado o no válido.");
    }
    const x = Number(codigo.codigo.slice(2)) + 1;
    console.log(x);
    return formatearCodigo(x.toString());
}

  const agregarZona = async (data: Zona): Promise<boolean> => {
    try {
        if (!data) throw new Error("Datos requeridos");
        const z = zonas.find(
            (y) => y.codigo === data.codigo && y.tipoId === data.tipoId
        );
        if (z) throw new Error("Código ya registrado");
        const nuevaZona: Zona = {
            ...data,
            codigo: (data.codigo).trim(),
            zonaId: zonas.length + 1, // Considera cambiar esto a un ID único
        };
        const updatedZonas = [...zonas, nuevaZona];
        localStorage.setItem("zonas", JSON.stringify(updatedZonas));
        // Actualiza el estado de zonas
        setZonas(updatedZonas)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

  const deshabilitarZona = async (zonaId:number):Promise<boolean> => {
    console.log(zonaId);
    
    try {
      if(!zonaId) throw new Error("Dato Requerido");
      const indice = zonas.findIndex((f) => f.zonaId === zonaId);
      if(!indice) throw new Error('Zona no encontrada');
      const zonasActualizadas = [...zonas];
      zonasActualizadas[indice].deshabilitado = true;
      localStorage.setItem("zonas",JSON.stringify(zonasActualizadas));
      setZonas(zonasActualizadas)
      return true;
    } catch (err)    
    {
      return false;      
    }
  }

  useEffect(() => {
    getZonas();
    console.log("se renderiza el hook");    
    //fetchZonas();
  }, []);


  /*  const fetchZonas = async () => {
         setLoading(true);
         try {
             const response = await axios.get('/api/zonas');
             setZonas(response.data);
         } catch (err) {
             setError('Error fetching zonas');
         } finally {
             setLoading(false);
         }
     };
 
     const createZona = async (zona: Zona) => {
         setLoading(true);
         try {
             const response = await axios.post('/api/zonas', zona);
             setZonas([...zonas, response.data]);
         } catch (err) {
             setError('Error creating zona');
         } finally {
             setLoading(false);
         }
     };
 
     const updateZona = async (id: number, updatedZona: Zona) => {
         setLoading(true);
         try {
             const response = await axios.put(`/api/zonas/${id}`, updatedZona);
             setZonas(zonas.map(zona => (zona.id === id ? response.data : zona)));
         } catch (err) {
             setError('Error updating zona');
         } finally {
             setLoading(false);
         }
     };
 
     const deleteZona = async (id: number) => {
         setLoading(true);
         try {
             await axios.delete(`/api/zonas/${id}`);
             setZonas(zonas.filter(zona => zona.id !== id));
         } catch (err) {
             setError('Error deleting zona');
         } finally {
             setLoading(false);
         }
     };
 
     */
  return {
    zonas,
    getZonas,
    getZona,
    agregarZona,
    deshabilitarZona,
    getNuevoCodigo
    /* loading,
        error,
        fetchZonas,
        createZona,
        updateZona,
        deleteZona, */
  };
};

export default useZonaAccion;
