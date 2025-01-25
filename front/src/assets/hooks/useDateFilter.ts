import { useState, useEffect } from "react";
import { TurnoInterface } from "../interfaces/turno";
import { LIST_TURNOS } from "../constant/LIST_TURNOS";


/* Hook con el cual manejamos los turnos mediante la fecha */
function useDateFilter({ fecha = new Date() }: { fecha: Date }) {
    const [filteredTurnos, setFilteredTurnos] = useState<TurnoInterface[]>([]);

    /* Funcion con la cual filtramos los turnos mediante la fecha */
    const dateFilter = (turnos: TurnoInterface[], fecha: Date) => {
        const dia = refactoriDate(fecha);
        return turnos.filter((turno) => turno.dia === dia);
    };

    /* Funcion para la refactirizacion de la fecha ingresada por el usuario */
    const refactoriDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses son 0-indexados
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        setFilteredTurnos(dateFilter(LIST_TURNOS, fecha));
    }, [fecha]);

    return { filteredTurnos, refactoriDate };
}

export default useDateFilter;
