import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Turno } from "../interfaces/turno";
import useDateFilter from "../hooks/useDateFilter";
import useTurnoAccion from "../hooks/useTurnoAccion";
import usePacienteAccion from "../hooks/usePacienteAccion";
import { Paciente } from "../interfaces/paciente";


// Define el tipo para el estado que deseas compartir
interface DepiJointState {
  // Aquí puedes definir las propiedades que necesites
  exampleProperty?: string;
}

// Define el tipo para el contexto
interface DepiJointContextType {
  state: DepiJointState;
  turnosFiltador: Turno[];
  dia: Date;
  setState: React.Dispatch<React.SetStateAction<DepiJointState>>;
  setDia: React.Dispatch<React.SetStateAction<Date>>;
  addTurno: (data: any) => Promise<boolean>;
  turnoAsignado: (data: Turno) => Promise<boolean>;
  quitarTurno: (turnoId: any) => Promise<boolean>;
  addPaciente: (data: any) => Promise<boolean>;
  deletePaciente: (pacienteId: any) => Promise<boolean>;
  allPacientes: (conDesabilitado: boolean) => Promise<void>;
  pacientes: Paciente[];
}

// Crea el contexto con un valor predeterminado de tipo undefined
const DepiJointContexto = createContext<DepiJointContextType | undefined>(
  undefined
);

// Define el tipo para las propiedades del proveedor
interface DepiJointProviderProps {
  children: ReactNode;
}

const DepiJointProvider: React.FC<DepiJointProviderProps> = ({ children }) => {
  const [state, setState] = useState<DepiJointState>({}); // Define el estado que deseas compartir
  const [dia, setDia] = useState<Date>(new Date());
  const { filteredTurnos, getTurnos } = useDateFilter({ fecha: dia });
  const { agregarTurno, confirmarTurno, cancelarTurno } = useTurnoAccion();
  const { getPacientes, cargarPaciente, deshabilitarPaciente } =
    usePacienteAccion();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  useEffect(() => {
    allPacientes();
  }, []);


  /* ----------------------------------------------------------------------------------------------------- */
  //TURNOS
  const addTurno = async (data: any): Promise<boolean> => {
    const isAdded = await agregarTurno(data);
    if (isAdded) {
      await getTurnos();
      //await getNotificacion("Turno agregado correctamente", "sussess");
      return true;
    }
    //getNotificacion("Error al agregar el turno", "destructive");
    return false;
  };

  const turnoAsignado = async (data: Turno): Promise<boolean> => {
    const confirmacion = await confirmarTurno(data);
    if (confirmacion) {
      await getTurnos();
      //getNotificacion("Turno confirmado correctamente", "sussess");
      return true;
    }
    //getNotificacion("Error al confirmar el turno", "destructive");
    return false;
  };

  const quitarTurno = async (turnoId: any): Promise<boolean> => {
    const bool = await cancelarTurno(turnoId);
    if (bool) {
      await getTurnos();
      //getNotificacion("Turno eliminado correctamente", "sussess");
      return true;
    }
    //getNotificacion("Error al eliminar el turno", "destructive");
    return false;
  };

  /* ----------------------------------------------------------------------------------------------------------------------- */

  /* PACIENTES */
  const allPacientes = async (
    conDesabilitado: boolean = false
  ): Promise<void> => {
    const pacientes: Paciente[] = await getPacientes(conDesabilitado);
    setPacientes(pacientes);
  };

  const addPaciente = async (data: any): Promise<boolean> => {
    const isAdd = await cargarPaciente(data);
    if (!isAdd) {
      //getNotificacion("Error al agregar el paciente", "destructive");
      return false;
    }
    await allPacientes();
    //getNotificacion("Paciente agregado correctamente", "sussess");
    return true;
  };

  const deletePaciente = async (pacienteId: any): Promise<boolean> => {
    const bool = await deshabilitarPaciente(pacienteId);
    if (bool) {
      await allPacientes();
      //getNotificacion("Paciente eliminado correctamente", "sussess");
      return true;
    }
    //getNotificacion("Error al eliminar el paciente", "destructive");
    return false;
  };


  return (
    <DepiJointContexto.Provider
      value={{
        state,
        setState,
        turnosFiltador: filteredTurnos,
        dia,
        setDia,
        addTurno,
        turnoAsignado,
        quitarTurno,
        addPaciente,
        deletePaciente,
        allPacientes,
        pacientes,
        
      }}
    >
      {children}
    </DepiJointContexto.Provider>
  );
};

/* -------------------------------------------------------- */

// Hook para usar el contexto
const useDepiJoint = (): DepiJointContextType => {
  const context = useContext(DepiJointContexto);
  if (!context) {
    throw new Error(
      "useDepiJoint debe ser usado dentro de un DepiJointProvider"
    );
  }
  return context;
};

export { DepiJointProvider, useDepiJoint };
