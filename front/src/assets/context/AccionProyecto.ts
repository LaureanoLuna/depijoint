import { createContext, useState, ReactNode } from "react";

// Define el tipo del contexto
type AccionProyectoContextType = {
  valor: string;
  setValor: (nuevoValor: string) => void;
};

// Crea el contexto con un valor predeterminado
const AccionProyectoContext = createContext<AccionProyectoContextType | undefined>(undefined);

// Crea el proveedor del contexto
const AccionProyectoProvider = ({ children }: { children: ReactNode }) => {
  const [valor, setValor] = useState("Valor inicial");

  return (
    <AccionProyectoContext.Provider value={{ valor, setValor }}>
      {children}
    </AccionProyectoContext.Provider>
  );
};

// Exporta el contexto y el proveedor
export { AccionProyectoContext, AccionProyectoProvider };