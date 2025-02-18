import { FormLateral } from "@/assets/components/FormLateral";
import Formulario from "./Formulario";

export default function AddZona() {
  return (
    <>
      <FormLateral
        title="Agregar Zona"
        descripcion="Generaras una nueva zona / combo"
        tituloAbrir="Nuevo"
        formChild={<Formulario />}
      />
    </>
  );
}
