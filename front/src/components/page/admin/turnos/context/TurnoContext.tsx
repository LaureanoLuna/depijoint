import { Turno } from "@/assets/interfaces/turno";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
  } from "react";

  interface TurnoContextProps {
    t:Turno[];
  }

const TurnoContext = createContext<TurnoContextProps | undefined>(undefined);

const TurnoProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [t,setT] = useState<Turno[]>([])


    return (
        <TurnoContext.Provider value={{
            t
        }} >
            {children}
        </TurnoContext.Provider>
    )
};

export const useTurnoContext = ():TurnoContextProps => {
    const context = useContext(TurnoContext);
    if (!context) {
        throw new Error("useTurnoContext must be used within a TurnoProvider");
      }
      return context;
}

export {TurnoProvider};