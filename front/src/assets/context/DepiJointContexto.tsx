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
    const { filteredTurnos,getTurnos } = useDateFilter({ fecha: dia });
    const { agregarTurno } = useTurnoAccion();


    const addTurno = async (data: any): Promise<boolean> => {
        if (await agregarTurno(data)) {
            getTurnos()
            return true
        } else {
            return false
        }

    }

    return (
        <DepiJointContexto.Provider value={{ state, setState, turnosFiltador: filteredTurnos, dia, setDia, addTurno }}>
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