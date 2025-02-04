import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Turno, TurnoAdd, TurnoLista } from "../interfaces/turno";
import useDateFilter from "../hooks/useDateFilter";
import useTurnoAccion from "../hooks/useTurnoAccion";

// Define el tipo para el estado que deseas compartir
interface DepiJointState {
    // Aquí puedes definir las propiedades que necesites
    exampleProperty?: string;

}

// Define el tipo para el contexto
interface DepiJointContextType {
    state: DepiJointState;
    turnosFiltador: TurnoLista[];
    dia: Date;
    setState: React.Dispatch<React.SetStateAction<DepiJointState>>;
    setDia: React.Dispatch<React.SetStateAction<Date>>;
    addTurno: any;
    asignarTurno: any;
    quitarTurno: any;
}

// Crea el contexto con un valor predeterminado de tipo undefined
const DepiJointContexto = createContext<DepiJointContextType | undefined>(undefined);

// Define el tipo para las propiedades del proveedor
interface DepiJointProviderProps {
    children: ReactNode;
}

const DepiJointProvider: React.FC<DepiJointProviderProps> = ({ children }) => {
    const [state, setState] = useState<DepiJointState>({}); // Define el estado que deseas compartir
    const [dia, setDia] = useState<Date>(new Date());
    const { filteredTurnos, getTurnos } = useDateFilter({ fecha: dia });
    const { agregarTurno, confirmarTurno, cancelarTurno } = useTurnoAccion();


    /**
  * Agrega un nuevo turno.
  * 
  * Esta función intenta agregar un nuevo turno utilizando la función `agregarTurno`.
  * Si la operación es exitosa, se actualizan los turnos y se devuelve `true`.
  * En caso contrario, se devuelve `false`.
  * 
  * @param data - Los datos del turno que se desea agregar.
  * @returns Una promesa que resuelve a `true` si el turno fue agregado exitosamente, o `false` en caso contrario.
  */
    const addTurno = async (data: any): Promise<boolean> => {
        // Intenta agregar el nuevo turno
        const isAdded = await agregarTurno(data);

        // Si el turno fue agregado exitosamente
        if (isAdded) {
            // Actualiza la lista de turnos
            await getTurnos();
            return true;
        }

        // Si no se pudo agregar el turno, retorna false
        return false;
    };

    const asignarTurno = async (data: TurnoLista): Promise<boolean> => {
        const confirmacion = await confirmarTurno(data);
        if (confirmacion) {
            await getTurnos();
            return true;
        }
        return false;
    }

    const quitarTurno = async (turnoId: any): Promise<boolean> => {
        console.log(turnoId);
        
        const bool = await cancelarTurno(turnoId);
        if (bool) {
            await getTurnos();
            return true;
        }
        return false;
    }

    return (
        <DepiJointContexto.Provider value={{ state, setState, turnosFiltador: filteredTurnos, dia, setDia, addTurno, asignarTurno, quitarTurno }}>
            {children}
        </DepiJointContexto.Provider>
    );
};

// Hook para usar el contexto
const useDepiJoint = (): DepiJointContextType => {
    const context = useContext(DepiJointContexto);
    if (!context) {
        throw new Error("useDepiJoint debe ser usado dentro de un DepiJointProvider");
    }
    return context;
};

export { DepiJointProvider, useDepiJoint };