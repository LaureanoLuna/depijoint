import useContratacionAccion from "@/assets/hooks/useContratacionAccion";
import { useEffect } from "react"

export default function ListContrataciones({ dniPaciente }: { dniPaciente: string }) {
    const { contratacion, searchContratacion } = useContratacionAccion()

    useEffect(() => {
        searchContratacion(dniPaciente);
    }, [dniPaciente]);

    return (
        <>{
            contratacion?.zonas.map((element,i) =>(
                <span key={i}>{element.codigoZona}</span>
            ))
        } </>
    )
}
