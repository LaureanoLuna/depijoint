import { useState, useEffect } from 'react';
import { Tratamiento } from '../interfaces/tratamiento';
import { Zona } from '../interfaces/zona';
import useZonaAccion from './useZonaAccion';

/* interface TratamientoAccion {
    id: number;
    nombre: string;
    descripcion: string;
} */

const useTratamientoAccion = () => {
    const { getZonas } = useZonaAccion();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getTratamientos = (): Tratamiento[] => {
        const tratamientos = JSON.parse(localStorage.getItem("tratamientos") || "[]")
        return tratamientos;
    }

    const setTratamientos = async (tratamientos: Tratamiento[]) => {
        localStorage.setItem("tratamientos", JSON.stringify(tratamientos));
    }

    const getTratamiento = async (id: number): Promise<Tratamiento | undefined> => {
        const tratamiento = getTratamientos().find((t) => t.id === id);
        if (!tratamiento) return
        return tratamiento;
    }

    const getZonasT = async (zonas: number[]): Promise<Zona[]> => {
        // Espera a que se obtengan las zonas
        const zonasT = await getZonas();
        // Filtra las zonas cuyo ID está en el array 'zonas'
        const zonasFiltradas = zonasT.filter((z) => zonas.includes(z.zonaId));
        // Obtiene las zonas de tipo "C"
        const zonasCombo = zonasFiltradas.filter((z) => z.tipo === "C");
        // Obtiene los IDs de las zonas hijas
        const idsZonasHijas = zonasCombo.map((z) => JSON.parse(z.zonaPadreId || "[]")).flat();
        // Filtra las zonas que no tienen el mismo ID que sus zonas hijas
        const zonasResultantes = zonasFiltradas.filter((zona) => !idsZonasHijas.includes(zona.zonaId));
        //console.log(idsZonasHijas); // Para depuración
        return zonasResultantes; // Devuelve las zonas resultantes
    };

    const addTratamiento = async (pacienteDni: string, data: number[]): Promise<boolean> => {
        try {
            const tratamientos = getTratamientos();
            const indiceTratamientoPaciente = getTratamientos().findIndex((t) => t.pacienteDni === pacienteDni && t.estado === false);
            if (indiceTratamientoPaciente !== -1) {
                tratamientos[indiceTratamientoPaciente].zonas = await getZonasT(data);
            } else {
                const tratamiento: Tratamiento = {
                    id: getTratamientos().length + 1,
                    fechaContratacion: new Date().toString(),
                    estado: false,
                    pacienteDni: pacienteDni,
                    zonas: await getZonasT(data)
                }
                tratamientos.push(tratamiento)
            }
            setTratamientos(tratamientos);
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /* useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Simulate a fetch call
                const response = await new Promise<TratamientoAccion[]>((resolve) =>
                    setTimeout(() => resolve(initialData), 1000)
                );
                setData(response);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [initialData]); */

    return { loading, error, addTratamiento, getTratamiento, getTratamientos };
};

export default useTratamientoAccion;