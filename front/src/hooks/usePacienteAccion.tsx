import { LIST_PACIENTE } from "@/assets/constant/LIST_PACIENTES";
import { Paciente } from "@/assets/interfaces/paciente";
import { PersonaSearch } from "@/assets/interfaces/persona";
import { useState } from "react";

const usePacienteAccion = () => {
  const [paciente, setPaciente] = useState<Paciente>();

  const buscaPaciente = (dni: PersonaSearch) : any => {
    const pac = LIST_PACIENTE.find((pac) => pac.dni === dni.dni);
    if (pac) {
      setPaciente(pac);
    }
    console.log(paciente);
    
  };

return { paciente, buscaPaciente };
};

export default usePacienteAccion;