import { useState, useEffect } from "react";
import { Zona } from "../interfaces/zona";

const useZonaAccion = () => {
  const [zonas, setZonas] = useState<Zona[]>([]);
  /*  const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null); */

  useEffect(() => {
    getZonas();
    //fetchZonas();
  }, []);

  const getZonas = async (): Promise<void> => {
    const x: Zona[] = localStorage.getItem("zonas")
      ? JSON.parse(localStorage.getItem("zonas") || "{}")
      : [];
    setZonas(x);
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

  const agregarZona = async (data: Zona): Promise<boolean> => {
    try {
      if (!data) throw new Error("Datos requeridos");

      const z = zonas.find(
        (y) => y.codigo === data.codigo && y.tipoId === data.tipoId
      );
      if (z) throw new Error("Codigo ya registrado");

      const nuevaZona: Zona = {
        ...data,
        codigo: (data.tipoId + data.codigo).trim(),
        zonaId: zonas.length + 1,
      };

      // Actualiza el estado de zonas
      await setZonas((prevZonas) => {
        const updatedZonas = [...prevZonas, nuevaZona];
        localStorage.setItem("zonas", JSON.stringify(updatedZonas));
        return updatedZonas;
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

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
    /* loading,
        error,
        fetchZonas,
        createZona,
        updateZona,
        deleteZona, */
  };
};

export default useZonaAccion;
