import useContratacionAccion from "@/assets/hooks/useContratacionAccion";
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"


export default function ListContrataciones({ dniPaciente }: { dniPaciente: string }) {
    const { contratacion, searchContratacion } = useContratacionAccion()

    useEffect(() => {
        searchContratacion(dniPaciente);
    }, [dniPaciente]);

    return (
        <>{
            contratacion?.zonas.map((element,i) =>(
                <Badge key={i} variant="outline">{element.codigoZona} </Badge>
            ))
        } </>
    )
}
