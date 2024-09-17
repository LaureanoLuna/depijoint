
import { useState, useEffect } from 'react';
import { TurnoData } from '../interfaces/turno';

const LIST_PAS: TurnoData[] = [
    { id: "1", paciente: { name: "Laureano Luna", dni: "38232325" }, dia: "2024-08-26", hora: "09:30", duracion: "30", estado: true },
    { id: "2", paciente: { name: "Laureano Luna", dni: "38232325" }, dia: "2024-09-29", hora: "19:30", duracion: "30", estado: true },
    { id: "3", paciente: { name: "Laureano Luna", dni: "38232325" }, dia: "2024-08-24", hora: "08:30", duracion: "30", estado: true },
    { id: "4", paciente: { name: "Laureano Luna", dni: "38232325" }, dia: "2024-08-24", hora: "19:30", duracion: "30", estado: true },
    { id: "5", paciente: { name: "Laureano Luna", dni: "38232325" }, dia: "2024-08-26", hora: "19:30", duracion: "30", estado: true },
    { id: "6", paciente: { name: "Laureano Luna", dni: "38232325" }, dia: "2024-08-30", hora: "15:30", duracion: "30", estado: true },
];

/* Hook con el cual manejamos los turnos mediante la fecha */
function useDateFilter({ fecha = new Date() }: { fecha: Date }) {
    const [filteredTurnos, setFilteredTurnos] = useState<TurnoData[]>([]);

    /* Funcion con la cual filtramos los turnos mediante la fecha */
    const dateFilter = (turnos: TurnoData[], fecha: Date) => {
        const dia = refactoriDate(fecha)
        return turnos.filter((turno) => turno.dia === dia);
    };

    /* Funcion para la refactirizacion de la fecha ingresada por el usuario */
    const refactoriDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        setFilteredTurnos(dateFilter(LIST_PAS, fecha));
    }, [fecha]);

    return { filteredTurnos, refactoriDate };
}

export default useDateFilter;