import React, { createContext, useContext, useState, ReactNode } from "react";
import { Turno, TurnoLista } from "../interfaces/turno";
import useDateFilter from "../hooks/useDateFilter";

// Define el tipo para el estado que deseas compartir
interface DepiJointState {
    // Aquí puedes definir las propiedades que necesites
    exampleProperty?: string;

}

// Define el tipo para el contexto
interface DepiJointContextType {
    state: DepiJointState;
    turnosFiltador: TurnoLista[];
    setState: React.Dispatch<React.SetStateAction<DepiJointState>>;
    dia: Date;
    setDia: React.Dispatch<React.SetStateAction<Date>>;
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
    const { filteredTurnos } = useDateFilter({ fecha: dia });

    

    return (
        <DepiJointContexto.Provider value={{ state, setState, turnosFiltador: filteredTurnos, dia, setDia }}>
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