import Cabecera from "@/assets/components/Cabecera";
import TablaColaboradores from "./TablaColaboradores";

export default function ListaColaboradores() {

  return (
    <>
      {/* Cabecera del componente con título y filtro */}
      <Cabecera
        titulo="Colaboradores"
        descripcion=""
        contenidoMedio={""} // Corrige "filto" a "Filtro"
      />
      {/* Tabla con encabezados y filas de colaboradores */}
     <TablaColaboradores />
    </>
  );
}