import useContratacionAccion from "@/assets/hooks/useContratacionAccion";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CardContent, CardTitle } from "@/components/ui/card";

export default function ListContrataciones({
  dniPaciente,
}: {
  dniPaciente: string;
}) {
  const { contratacion, searchContratacion } = useContratacionAccion();

  useEffect(() => {
    searchContratacion(dniPaciente);
  }, [dniPaciente]);

  return (
    <>
      <CardTitle className="capitalize mb-1 flex items-start justify-between">
        <span className="mb-2">tratamiento:</span> <span>#{contratacion?.contratacionId}</span> 
      </CardTitle>
      <CardContent className="p-0 grid grid-cols-4 gap-1">
        {contratacion?.zonas.map((element, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={"outline"} className="text-xs w-">
                  {" "}
                  {element.tipoZona.tipoZona +
                    "-" +
                    element.codigoZona +
                    "/" +
                    element.tamaño}
                </Badge>{" "}
              </TooltipTrigger>
              <TooltipContent>{element.nombre}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </CardContent>
    </>
  );
}
