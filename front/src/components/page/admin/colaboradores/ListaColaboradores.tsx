import Boton from "@/assets/components/Boton";
import Cabecera from "@/assets/components/Cabecera";
import TablaComponent from "@/assets/components/TablaComponent";
import { LIST_COLABORADORES } from "@/assets/constant/LIST_COLABORADORES";
import { Colaborador } from "@/assets/interfaces/colaboradores";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import TablaColaboradores from "./TablaColaboradores";

export default function ListaColaboradores() {
  // Estado para determinar si los campos son editables
  const [esEditable, setEsEditable] = useState(true);

  // Función para alternar el estado de edición
  const toggleEditable = (): void => {
    setEsEditable(!esEditable);
  };

  return (
    <>
      {/* Cabecera del componente con título y filtro */}
      <Cabecera
        titulo="Colaboradores"
        descripcion=""
        contenidoMedio={"Filtro"} // Corrige "filto" a "Filtro"
      />
      {/* Tabla con encabezados y filas de colaboradores */}
     <TablaColaboradores />
    </>
  );
}