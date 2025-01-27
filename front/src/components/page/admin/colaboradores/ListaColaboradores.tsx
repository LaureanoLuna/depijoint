import Boton from "@/assets/components/Boton";
import Cabecera from "@/assets/components/Cabecera";
import TablaComponent from "@/assets/components/TablaComponent";
import { LIST_COLABORADORES } from "@/assets/constant/LIST_COLABORADORES";
import { Colaborador } from "@/assets/interfaces/colaboradores";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

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
      <TablaComponent
        arrTitulos={["Nombre Completo", "Usuario", "Clave", "Acción"]}
      >
        {LIST_COLABORADORES?.map((colaborador: Colaborador) => (
          <TableRow
            className="text-md hover:bg-green-500"
            key={colaborador.colaboradorId}
          >
            {/* Columna para el nombre completo */}
            <TableCell className="grid grid-cols-2">
              <Input
                type="text"
                className="font-medium text-center mx-1"
                value={colaborador.nombre}
                readOnly={esEditable} // Cambiado a readOnly
              />
              <Input
                type="text"
                className="font-medium text-center mx-1"
                value={colaborador.apellido}
                readOnly={esEditable} // Cambiado a readOnly
              />
            </TableCell>
            {/* Columna para el usuario */}
            <TableCell>
              <Input
                type="text"
                className="font-medium text-center mx-1"
                value={colaborador.usuario}
                readOnly={esEditable} // Cambiado a readOnly
              />
            </TableCell>
            {/* Columna para la clave */}
            <TableCell>
              <Input
                type="password"
                className="font-medium text-center w-2/3 m-auto"
                disabled={esEditable} // Mantiene el comportamiento original
                value={colaborador.clave}
              />
            </TableCell>
            {/* Columna para acciones */}
            <TableCell>
              <Boton
                prop={{
                  is_tooltip: true,
                  text_tooltip: "Ver consentimiento",
                  icono: <Pencil1Icon />,
                  tamaño: "icon",
                  variante: "ghost",
                  estilo: "hover:border hover:border-green-900 uppercase",
                  onClick: toggleEditable, // Cambiado a toggleEditable
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TablaComponent>
    </>
  );
}