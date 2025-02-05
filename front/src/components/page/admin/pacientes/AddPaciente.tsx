import { FormLateral } from "@/assets/components/FormLateral";
import { useDepiJoint } from "@/assets/context/DepiJointContexto";
import Formulario from "./Formulario";


export default function AddPaciente() {
  return (
    <FormLateral
      title="Alta Paciente"
      descripcion="Formulario para agendar un nuevo paciente"
      tituloAbrir="Agendar Paciente"
      formChild={<Formulario />}
    />
  );

}
