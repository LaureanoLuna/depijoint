
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface ToolTipComponenteProps {
  tituloBoton: string;
  texto: string;
  children: React.ReactNode; // Define children como parte de las props
}
export default function ToolTipComponente({
  tituloBoton,
  texto,
  children,
}: ToolTipComponenteProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Aquí puedes usar el tituloBoton si es necesario */}
          <Button variant={"outline"} aria-label={tituloBoton}>{children}</Button>
        </TooltipTrigger>
        <TooltipContent>
          {texto}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}