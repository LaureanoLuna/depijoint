import usePacienteAccion from "@/assets/hooks/usePacienteAccion";
import { Paciente } from "@/assets/interfaces/paciente";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PacienteContextProps {
    p: Paciente[];
    addPaciente: (paciente: Paciente) => Promise<boolean>;
    handleEstadoPaciente: (pacienteId: string, tipo: "habilita" | "deshabilita") => void;
    handleConDeshabilitado: any;
    conDesabilitado: boolean;
}

const PacienteContext = createContext<PacienteContextProps | undefined>(undefined);

const PacienteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { getPacientes, getPaciente, cargarPaciente, deshabilitarPaciente, habilitarPaciente } = usePacienteAccion()
    const [conDesabilitado, setConDesabilitado] = useState<boolean>(true);
    const [p, setP] = useState<Paciente[]>([]);

    const allPacientes = async (): Promise<void> => {
        const x = await getPacientes();
        if (!x) return;
        if (conDesabilitado) {
            const sinDeshabilitado = x.filter((p) => {
                return p.deshabilitado === false;
            });                        
            setP(sinDeshabilitado);
        } else {
            setP(x);
        }
    }
    const handleConDeshabilitado = () => {
        setConDesabilitado(!conDesabilitado);
    };

    const addPaciente = async (data: Paciente): Promise<boolean> => {
        const success = await cargarPaciente(data);
        if (!success) return false;
        await allPacientes();
        return true;
    }

    const handleEstadoPaciente = async (pacienteId: string, tipo: "habilita" | "deshabilita"): Promise<void> => {
        let bool = false;
        try {
            if (tipo === "deshabilita") {
                bool = await deshabilitarPaciente(pacienteId)
            } else {
                bool = await habilitarPaciente(pacienteId)
            }
            if (!bool) {
                throw new Error("No se pudo realizar")
            }
            await allPacientes();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        allPacientes();
    }, [conDesabilitado])

    return (
        <PacienteContext.Provider value={{
            p,
            addPaciente,
            conDesabilitado,
            handleConDeshabilitado,
            handleEstadoPaciente
        }} >
            {children}
        </PacienteContext.Provider>
    )
}

export const usePacienteContext = (): PacienteContextProps => {
    const context = useContext(PacienteContext);
    if (!context) {
        throw new Error("usePacienteContext no esta siendo usado");
    }
    return context;
}

export { PacienteProvider };