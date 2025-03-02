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
import { Zona } from "@/assets/interfaces/zona";

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
        <span className="mb-2">tratamiento:</span> <span>#{contratacion?.id}</span> 
      </CardTitle>
      <CardContent className="p-0 grid grid-cols-4 gap-1">
        {contratacion?.zonas.map((element:Zona, i:number) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={"outline"} className="text-xs w-">
                  {" "}
                  {element.tipo +
                    "-" +
                    element.codigo +
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
