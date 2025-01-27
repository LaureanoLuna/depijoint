import Cabecera from "@/assets/components/Cabecera";
import AddZona from "./AddZona";

export default function ListaZonas() {
    return (
        <>
            <Cabecera titulo="ABM Zonas" descripcion="Todos los articulos" botonAccion={<AddZona />} />
        </>
    );
}
